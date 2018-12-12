<template>
  <form>
    <div class="title">
      <h2 class="ui-priority-primary" style="margin: 0 0 .5em 0">
        <a href="https://jqueryui.com">jQuery UI</a>
        <span class="ui-priority-secondary" style="font-size: 50%">Integration</span>
        <div class="ui-priority-secondary" style="float: right; font-size: 60%">
          Theme :
          <select
            class="ui-widget-content"
            style="padding: 0.2em; display: inline-block; width: auto"
            v-model="ui.theme"
            @change="changeTheme"
          >
            <option v-for="(value, key) in ui.themes" v-bind:key="key">{{ key }}</option>
          </select>
        </div>
      </h2>
    </div>
    <div class="template">
      <st-tree
        style="overflow: auto"
        :style="{
          borderWidth: ui.showBorder ? '1px' : '0',
          width: ui.width,
          height: ui.height
        }"
        class="ui-widget-content"
        :classes="classes"
        :nodes="nodes"
        @click-node="clickTreeNode($event)"
      ></st-tree>
    </div>
    <div class="options" style="border: none">
      <label>Options:</label>
      <ul style="list-style: none; padding: 0; margin: 0">
        <li>
          <label>
            <input type="checkbox" v-model="ui.showBorder"> Bordered Tree
          </label>
        </li>
        <li>
          &nbsp;width :
          <label>
            <input type="radio" value="5em" v-model="ui.width"> 5em
          </label>
          <label>
            <input type="radio" value="10em" v-model="ui.width"> 10em
          </label>
          <label>
            <input type="radio" value="20em" v-model="ui.width"> 20em
          </label>
          <label>
            <input type="radio" value="50%" v-model="ui.width"> 50%
          </label>
          <label>
            <input type="radio" value="auto" v-model="ui.width"> auto
          </label>
        </li>
        <li>
          height :
          <label>
            <input type="radio" value="5em" v-model="ui.height"> 5em
          </label>
          <label>
            <input type="radio" value="10em" v-model="ui.height"> 10em
          </label>
          <label>
            <input type="radio" value="20em" v-model="ui.height"> 20em
          </label>
          <label>
            <input type="radio" value="50%" v-model="ui.height"> 50%
          </label>
          <label>
            <input type="radio" value="auto" v-model="ui.height"> auto
          </label>
        </li>
      </ul>
    </div>
  </form>
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
      nodes: nodes,
      ui: {
        showBorder: true,
        width: "20em",
        height: "auto",

        theme: "dark-hive",
        themes: {
          base:
            "https://cdn.jsdelivr.net/npm/jquery-ui-built-themes@1.12.1/base/jquery-ui.min.css",
          "dark-hive":
            "https://cdn.jsdelivr.net/npm/jquery-ui-built-themes@1.12.1/dark-hive/jquery-ui.min.css"
        }
      },
      classes: {
        // wrapper: "ui-state-normal",
        hover: "ui-state-hover",
        active: "ui-state-active",
        toggle: "ui-icon",
        collapsed: "ui-icon-triangle-1-e",
        expanded: "ui-icon-triangle-1-se",
        // icon: "ui-icon",
        node: "node-test",
        label: "label-test"
      }
    };
  },
  components: { stTree },
  mounted() {
    // get all themes
    let url =
      "https://data.jsdelivr.com/v1/package/npm/jquery-ui-built-themes@1.12.1";
    fetch(url)
      .then(response => response.json())
      .then(result => {
        console.log("find %s themes from %s", result.files.length, url);
        result.files
          .filter(theme => theme.type === "directory")
          .forEach(theme => {
            if (!this.ui.themes.hasOwnProperty(theme.name))
              this.$set(
                this.ui.themes,
                theme.name,
                `https://cdn.jsdelivr.net/npm/jquery-ui-built-themes@1.12.1/${
                  theme.name
                }/jquery-ui.min.css`
              );
          });
      });
  },
  methods: {
    changeTheme() {
      document.getElementById("theme").href = this.ui.themes[this.ui.theme];
    },
    clickTreeNode(node) {
      console.log("click-node : " + (node.label || node));
    }
  }
};
</script>