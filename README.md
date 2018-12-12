# simter-vue-tree

A vue tree component. [Demo](https://simter.github.io/simter-vue-tree/demo).

## 1. Requirement

| Name   | Version |
|--------|---------|
| Vue    | 2.5+    |
| Parcel | 1.10+   |

## 2. Develop

```
yarn install
yarn start
```

> Then visit <http://localhost:1234>.

## 3. Build

```
yarn run build
```

> Use [rollup] build component to `dist` directory.
> Use [parcel] build demo to `docs/demo` directory.

## 4. Options

### 4.1. Props

| Name        | Require | ValueType | Description
|-------------|---------|-----------|-------------
| nodes       | true    | \[{}\]<br>\[String\]<br>Function | Define tree nodes.<br>- Array : The child nodes, `String` array item means setting the `label` property<br>- Function : return a array or Promise resolve with the child nodes, the first param is the parent node object
| ├ label     | true    | String<br>Function | The node's visible text. It's the string value or the function return value. The function's first param is the node object
| ├ icon      | false   | String    | The node's icon class
| ├ ...custom | false   | Custom    | The custom properties for this node
| ├ nodes     | false   | \[{}\]<br>Function | The nested nodes
| parentNode  | false   | Node      | The parent node that this tree belong to
| classes     | false   | {}        | Define inner dom elements global classes
| ├ hover     | false   | String    | The class to add when hover on the node
| ├ active    | false   | String    | The class to add when the node is active
| ├ tree      | false   | String    | The extra tree class to add
| ├ node      | false   | String    | The extra node class to add
| ├ wrapper   | false   | String    | The extra node wrapper class to add
| ├ toggle    | false   | String    | The extra toggle class to add
| ├ icon      | false   | String    | The extra icon class to add
| ├ label     | false   | String    | The extra label class to add
| ├ collapsed | false   | String    | The folder's collapsed class
| ├ expanded  | false   | String    | The folder's expanded class

### 4.2. Events

| Name        | Params  | Description
|-------------|---------|-------------
| click-node  | node    | emit when use click the node

## 5. Usage

Js:

```js
import stTree from 'simter-vue-tree'

function buildMonths(node) {
  const months = []
  for(let m = 1; m <= 12; m++) months.push(`${node.year}Y${m}M`)
  return Promise.resolve(months) // or 'return months'
}

new Vue({
  el: "#sample",
  data: {
    nodes: [
      { label: "2018Y", year: 2018, nodes: ["12M", "11M", ..., "1M"] },
      { label: "2017Y", year: 2017, nodes: buildMonths },
      { label: "2016Y", year: 2016, nodes: buildMonths },
      ...
    ]
  },
  components: { stTree }
})
```

Html:

```html
<st-tree id="#sample" :nodes="nodes"></st-tree>
```

## 6. Html Structure

```
<ul class="st-tree">
  <!-- folder node -->
  <li class="st-node">
    <div class="st-wrapper">
      <span class="st-toggle"></span>
      <span class="st-icon"></span>
      <span class="st-label">Node 1</span>
    </div>
    <ul class="st-tree">
      <!-- leaf node -->
      <li class="st-node">
        <div class="st-wrapper">
          <span class="st-toggle"></span>
          <span class="st-icon"></span>
          <span class="st-label">Node 1-1</span>
        </div>
      </li>
      ...
    </ul>
  </li>
  <!-- leaf node -->
  <li class="st-node">
    <div class="st-wrapper">
      <span class="st-toggle"></span>
      <span class="st-icon"></span>
      <span class="st-label">Node 2</span>
    </div>
  </li>
  ...
</ul>
```


[rollup]: https://rollupjs.org
[parcel]: https://parceljs.org
[yarn]: https://yarnpkg.com
[Vue]: https://vuejs.org