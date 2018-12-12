/*!
* simter-vue-tree v0.1.0
* https://github.com/simter/simter-vue-tree.git 
* @author RJ.Hwang <rongjihuang@gmail.com>
* @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['simter-vue-tree'] = {})));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
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
      indent: { type: Number, required: false, default: 1 },
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

  /* script */
              const __vue_script__ = script;
              
  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ul",
      { staticClass: "st-tree", class: _vm.classes.tree },
      _vm._l(_vm.localNodes, function(node, index) {
        return _c(
          "li",
          {
            key: node.origin.id || index,
            staticClass: "st-node",
            class: _vm.classes.node
          },
          [
            _c(
              "div",
              {
                staticClass: "st-wrapper",
                class: _vm.getWrapperClass(node),
                on: {
                  mouseover: function($event) {
                    $event.stopPropagation();
                    _vm.toggleHover(node, true);
                  },
                  mouseout: function($event) {
                    $event.stopPropagation();
                    _vm.toggleHover(node, false);
                  },
                  click: function($event) {
                    $event.stopPropagation();
                    _vm.clickNode(node);
                  }
                }
              },
              [
                _c(
                  "span",
                  {
                    staticClass: "st-toggle",
                    class: _vm.getToggleClass(node),
                    style: {
                      marginLeft: _vm.level * _vm.indent + "em",
                      visibility: node.isFolder ? "visible" : "hidden"
                    },
                    on: {
                      click: function($event) {
                        $event.stopPropagation();
                        _vm.toggleCollapsed(node);
                      }
                    }
                  },
                  [
                    _vm._v(
                      _vm._s(node.isFolder ? (node.collapsed ? ">" : "∨") : "")
                    )
                  ]
                ),
                _vm._v(" "),
                _c("span", {
                  staticClass: "st-icon",
                  class: [_vm.classes.icon, node.icon]
                }),
                _vm._v(" "),
                _c(
                  "span",
                  { staticClass: "st-label", class: _vm.classes.label },
                  [_vm._v(_vm._s(_vm.getLabel(node.origin)))]
                )
              ]
            ),
            _vm._v(" "),
            node.isFolder && !node.collapsed && node.origin.nodes.length
              ? _c("st-tree", {
                  attrs: {
                    classes: _vm.classes,
                    nodes: node.origin.nodes,
                    indent: _vm.indent,
                    level: _vm.level + 1,
                    "parent-node": node.origin
                  }
                })
              : _vm._e()
          ],
          1
        )
      })
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-4b76f5a9_0", { source: "\n.st-tree {\r\n  cursor: default;\r\n  list-style: none;\r\n  padding: 0;\n}\n.st-tree .st-wrapper {\r\n  line-height: 1.5em;\r\n  padding: 0.125em 0.25em;\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\n}\n.st-tree .st-toggle {\r\n  width: 16px;\n}\n.st-tree .st-label {\r\n  cursor: pointer;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\n}\r\n", map: {"version":3,"sources":["D:\\work\\github-simter\\simter-vue\\simter-vue-tree/D:\\work\\github-simter\\simter-vue\\simter-vue-tree\\src\\tree.vue"],"names":[],"mappings":";AAmJA;EACA,gBAAA;EACA,iBAAA;EACA,WAAA;CACA;AACA;EACA,mBAAA;EACA,wBAAA;EACA,cAAA;EACA,oBAAA;EACA,oBAAA;CACA;AACA;EACA,YAAA;CACA;AACA;EACA,gBAAA;EACA,oBAAA;EACA,iBAAA;EACA,wBAAA;CACA","file":"tree.vue","sourcesContent":["<template>\r\n  <ul class=\"st-tree\" :class=\"classes.tree\">\r\n    <li\r\n      class=\"st-node\"\r\n      :class=\"classes.node\"\r\n      v-for=\"(node, index) of localNodes\"\r\n      :key=\"node.origin.id || index\"\r\n    >\r\n      <div\r\n        class=\"st-wrapper\"\r\n        :class=\"getWrapperClass(node) \"\r\n        @mouseover.stop=\"toggleHover(node, true)\"\r\n        @mouseout.stop=\"toggleHover(node, false)\"\r\n        @click.stop=\"clickNode(node)\"\r\n      >\r\n        <span\r\n          :style=\"{marginLeft: (level * indent) + 'em', visibility: node.isFolder ? 'visible' : 'hidden'}\"\r\n          class=\"st-toggle\"\r\n          :class=\"getToggleClass(node)\"\r\n          @click.stop=\"toggleCollapsed(node)\"\r\n        >{{node.isFolder ? (node.collapsed ? '>' : '∨') : ''}}</span>\r\n        <span class=\"st-icon\" :class=\"[classes.icon, node.icon]\"></span>\r\n        <span class=\"st-label\" :class=\"classes.label\">{{getLabel(node.origin)}}</span>\r\n      </div>\r\n      <!-- if has children -->\r\n      <st-tree\r\n        v-if=\"node.isFolder && !node.collapsed && node.origin.nodes.length\"\r\n        :classes=\"classes\"\r\n        :nodes=\"node.origin.nodes\"\r\n        :indent=\"indent\"\r\n        :level=\"level + 1\"\r\n        :parent-node=\"node.origin\"\r\n      ></st-tree>\r\n    </li>\r\n  </ul>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  name: \"st-tree\",\r\n  props: {\r\n    parentNode: { type: [Object, String], required: false },\r\n    nodes: {\r\n      type: [Array, Function],\r\n      required: true,\r\n      default() {\r\n        return [];\r\n      }\r\n    },\r\n    /** Add custom class to dom element */\r\n    classes: {\r\n      type: Object,\r\n      required: false,\r\n      default() {\r\n        return {};\r\n      }\r\n    },\r\n    /** The nested nodes ident unit */\r\n    indent: { type: Number, required: false, default: 1 },\r\n    level: { type: Number, required: false, default: 0 },\r\n    collapsedProp: { type: String, required: false, default: \"collapsed\" },\r\n    activeProp: { type: String, required: false, default: \"active\" }\r\n  },\r\n  data() {\r\n    return { localNodes: [], activeNode: null };\r\n  },\r\n  created() {\r\n    this.initLocalNodes();\r\n  },\r\n  computed: {\r\n    rootTree() {\r\n      function getRootTree(treeVm) {\r\n        if (treeVm.parentNode) return getRootTree(treeVm.$parent);\r\n        else return treeVm;\r\n      }\r\n      return getRootTree(this);\r\n    }\r\n  },\r\n  methods: {\r\n    initLocalNodes() {\r\n      if (typeof this.nodes === \"function\") {\r\n        const r = this.nodes.call(this, this.parentNode);\r\n        if (r instanceof Promise)\r\n          r.then(nodes => {\r\n            this.localNodes = this.createLocalNodes(nodes);\r\n          });\r\n        else if (Array.isArray(r)) {\r\n          this.localNodes = this.createLocalNodes(r);\r\n        } else throw new Error(\"Function return value is not array or promise\");\r\n      } else {\r\n        this.localNodes = this.createLocalNodes(this.nodes);\r\n      }\r\n    },\r\n    createLocalNodes(nodes) {\r\n      return nodes.map(node => {\r\n        return {\r\n          origin: node,\r\n          isFolder: node.hasOwnProperty(\"nodes\"),\r\n          collapsed: node[this.collapsedProp] !== false,\r\n          active: node[this.activeProp] === true\r\n        };\r\n      });\r\n    },\r\n    getLabel(node) {\r\n      if (typeof node === \"string\") return node;\r\n      else if (typeof node.label === \"function\")\r\n        return node.label.call(this, node);\r\n      else return node.label;\r\n    },\r\n    getToggleClass(node) {\r\n      if (node.collapsed) return [this.classes.toggle, this.classes.collapsed];\r\n      else return [this.classes.toggle, this.classes.expanded];\r\n    },\r\n    getWrapperClass(node) {\r\n      const c = [];\r\n      if (this.classes.wrapper) c.push(this.classes.wrapper);\r\n      if (node.hover) {\r\n        c.push(\"st-hover\");\r\n        if (this.classes.hover) c.push(this.classes.hover);\r\n      }\r\n      if (node.active) {\r\n        c.push(\"st-active\");\r\n        if (this.classes.active) c.push(this.classes.active);\r\n      }\r\n      return c;\r\n    },\r\n    toggleCollapsed(node) {\r\n      this.$set(node, \"collapsed\", !node.collapsed);\r\n    },\r\n    toggleHover(node, hover) {\r\n      this.$set(node, \"hover\", hover);\r\n    },\r\n    clickNode(node) {\r\n      // inactivate previous node\r\n      if (this.rootTree.activeNode) this.rootTree.activeNode.active = false;\r\n\r\n      // activate this node and cache it\r\n      node.active = true;\r\n      this.rootTree.activeNode = node;\r\n\r\n      // emit event\r\n      this.rootTree.$emit(\"click-node\", node.origin);\r\n    }\r\n  }\r\n};\r\n</script>\r\n<style>\r\n.st-tree {\r\n  cursor: default;\r\n  list-style: none;\r\n  padding: 0;\r\n}\r\n.st-tree .st-wrapper {\r\n  line-height: 1.5em;\r\n  padding: 0.125em 0.25em;\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-items: center;\r\n}\r\n.st-tree .st-toggle {\r\n  width: 16px;\r\n}\r\n.st-tree .st-label {\r\n  cursor: pointer;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n</style>\r\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* component normalizer */
    function __vue_normalize__(
      template, style, script$$1,
      scope, functional, moduleIdentifier,
      createInjector, createInjectorSSR
    ) {
      const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

      // For security concerns, we use only base name in production mode.
      component.__file = "D:\\work\\github-simter\\simter-vue\\simter-vue-tree\\src\\tree.vue";

      if (!component.render) {
        component.render = template.render;
        component.staticRenderFns = template.staticRenderFns;
        component._compiled = true;

        if (functional) component.functional = true;
      }

      component._scopeId = scope;

      {
        let hook;
        if (style) {
          hook = function(context) {
            style.call(this, createInjector(context));
          };
        }

        if (hook !== undefined) {
          if (component.functional) {
            // register for functional component in vue file
            const originalRender = component.render;
            component.render = function renderWithStyleInjection(h, context) {
              hook.call(context);
              return originalRender(h, context)
            };
          } else {
            // inject component registration as beforeCreate hook
            const existing = component.beforeCreate;
            component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
        }
      }

      return component
    }
    /* style inject */
    function __vue_create_injector__() {
      const head = document.head || document.getElementsByTagName('head')[0];
      const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
      const isOldIE =
        typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

      return function addStyle(id, css) {
        if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

        const group = isOldIE ? css.media || 'default' : id;
        const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

        if (!style.ids.includes(id)) {
          let code = css.source;
          let index = style.ids.length;

          style.ids.push(id);

          if (isOldIE) {
            style.element = style.element || document.querySelector('style[data-group=' + group + ']');
          }

          if (!style.element) {
            const el = style.element = document.createElement('style');
            el.type = 'text/css';

            if (css.media) el.setAttribute('media', css.media);
            if (isOldIE) {
              el.setAttribute('data-group', group);
              el.setAttribute('data-next-index', '0');
            }

            head.appendChild(el);
          }

          if (isOldIE) {
            index = parseInt(style.element.getAttribute('data-next-index'));
            style.element.setAttribute('data-next-index', index + 1);
          }

          if (style.element.styleSheet) {
            style.parts.push(code);
            style.element.styleSheet.cssText = style.parts
              .filter(Boolean)
              .join('\n');
          } else {
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index]) style.element.removeChild(nodes[index]);
            if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
            else style.element.appendChild(textNode);
          }
        }
      }
    }
    /* style inject SSR */
    

    
    var tree = __vue_normalize__(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      __vue_create_injector__,
      undefined
    );

  exports.default = tree;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
