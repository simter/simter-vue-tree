<template>
  <ul class="st-tree" :class="classes.tree">
    <li
      class="st-node"
      :class="classes.node"
      v-for="(node, index) of localNodes"
      :key="node.origin.id || index"
    >
      <div
        class="st-wrapper"
        :class="getWrapperClass(node) "
        @mouseover.stop="toggleHover(node, true)"
        @mouseout.stop="toggleHover(node, false)"
        @click.stop="clickNode(node)"
      >
        <span
          :style="{marginLeft: (level * indent) + 'em', visibility: node.isFolder ? 'visible' : 'hidden'}"
          class="st-toggle"
          :class="getToggleClass(node)"
          @click.stop="toggleCollapsed(node)"
        >{{node.isFolder ? (node.collapsed ? '>' : '∨') : ''}}</span>
        <span class="st-icon" :class="[classes.icon, node.icon]"></span>
        <span class="st-label" :class="classes.label">{{getLabel(node.origin)}}</span>
      </div>
      <!-- if has children -->
      <st-tree
        v-if="node.isFolder && !node.collapsed && node.origin.nodes.length"
        :classes="classes"
        :nodes="node.origin.nodes"
        :indent="indent"
        :level="level + 1"
        :parent-node="node.origin"
      ></st-tree>
    </li>
  </ul>
</template>

<script>
export default {
  name: "st-tree",
  props: {
    parentNode: { type: [Object, String], required: false },
    nodes: {
      type: [Array, Function],
      required: true,
      default() {
        return [];
      }
    },
    /** Add custom class to dom element */
    classes: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    /** The nested nodes ident unit */
    indent: { type: Number, required: false, default: 2 },
    level: { type: Number, required: false, default: 0 },
    collapsedProp: { type: String, required: false, default: "collapsed" },
    activeProp: { type: String, required: false, default: "active" }
  },
  data() {
    return { localNodes: [], activeNode: null };
  },
  created() {
    this.initLocalNodes();
  },
  computed: {
    rootTree() {
      function getRootTree(treeVm) {
        if (treeVm.parentNode) return getRootTree(treeVm.$parent);
        else return treeVm;
      }
      return getRootTree(this);
    }
  },
  methods: {
    initLocalNodes() {
      if (typeof this.nodes === "function") {
        const r = this.nodes.call(this, this.parentNode);
        if (r instanceof Promise)
          r.then(nodes => {
            this.localNodes = this.createLocalNodes(nodes);
          });
        else if (Array.isArray(r)) {
          this.localNodes = this.createLocalNodes(r);
        } else throw new Error("Function return value is not array or promise");
      } else {
        this.localNodes = this.createLocalNodes(this.nodes);
      }
    },
    createLocalNodes(nodes) {
      return nodes.map(node => {
        return {
          origin: node,
          isFolder: node.hasOwnProperty("nodes"),
          collapsed: node[this.collapsedProp] !== false,
          active: node[this.activeProp] === true
        };
      });
    },
    getLabel(node) {
      if (typeof node === "string") return node;
      else if (typeof node.label === "function")
        return node.label.call(this, node);
      else return node.label;
    },
    getToggleClass(node) {
      if (node.collapsed) return [this.classes.toggle, this.classes.collapsed];
      else return [this.classes.toggle, this.classes.expanded];
    },
    getWrapperClass(node) {
      const c = [];
      if (this.classes.wrapper) c.push(this.classes.wrapper);
      if (node.hover) {
        c.push("st-hover");
        if (this.classes.hover) c.push(this.classes.hover);
      }
      if (node.active) {
        c.push("st-active");
        if (this.classes.active) c.push(this.classes.active);
      }
      return c;
    },
    toggleCollapsed(node) {
      this.$set(node, "collapsed", !node.collapsed);
    },
    toggleHover(node, hover) {
      this.$set(node, "hover", hover);
    },
    clickNode(node) {
      // inactivate previous node
      if (this.rootTree.activeNode) this.rootTree.activeNode.active = false;

      // activate this node and cache it
      node.active = true;
      this.rootTree.activeNode = node;

      // emit event
      this.rootTree.$emit("click-node", node.origin);
    }
  }
};
</script>
<style>
.st-tree {
  cursor: default;
  list-style: none;
  padding: 0;
}
.st-tree .st-wrapper {
  line-height: 1.5em;
  padding: 0.125em 0.25em;
}
.st-tree .st-label {
  cursor: pointer;
}
</style>
