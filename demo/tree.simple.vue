<template>
  <div class="trees">
    <div>
      Theme :
      <label>
        <input type="radio" value="dark" v-model="theme"> Dark
      </label>
      <label>
        <input type="radio" value="light" v-model="theme"> Light
      </label>
    </div>
    <h3>Example 1 : Auto height</h3>
    <div>nodes = [x, ...]</div>
    <st-tree :nodes="tree1Nodes" :classes="classes" @click-node="clickTree1Node($event)"></st-tree>
    <div>{{tree1PickedNode ? 'click-node: ' + tree1PickedNode : ''}}</div>

    <h3>Example 2 : Scroll height</h3>
    <div>nodes = function(){ return [x, ...] }</div>
    <st-tree
      style="height: 8em; overflow: auto"
      :nodes="tree2Nodes"
      @click-node="clickTree2Node($event)"
    ></st-tree>
    <div>{{tree2PickedNode ? 'click-node: ' + tree2PickedNode : ''}}</div>
  </div>
</template>

<script>
import stTree from "../src/tree.vue";
import { nodes } from "./data";

// add a special node
const yearNode = {
  label: `${new Date().getFullYear()} year`,
  // custom property
  year: new Date().getFullYear(),
  // use function to supply nodes
  nodes: function(parent) {
    // full label (with parant label)
    return [12, 11, 10, 9].map(month => `${parent.year}-${month}`);
  }
};
nodes.push(yearNode);

export default {
  data() {
    return {
      theme: "dark",
      tree1PickedNode: null,
      tree2PickedNode: null,
      tree1Nodes: nodes,
      tree2Nodes: function() {
        return Promise.resolve(nodes);
      },
      classes: {
        tree: "tree-test",
        node: "node-test",
        wrapper: "wrapper-test",
        toggle: "toggle-test",
        icon: "icon-test",
        label: "label-test",
        hover: "hover-test",
        collapsed: "collapsed-test",
        expanded: "expanded-test",
        picked: "picked-test"
      }
    };
  },
  components: { stTree },
  methods: {
    clickTree1Node(node) {
      this.tree1PickedNode = node.label || node;
    },
    clickTree2Node(node) {
      this.tree2PickedNode = node.label || node;
    }
  },
  watch: {
    theme(value) {
      document.body.className = value;
    }
  }
};
</script>