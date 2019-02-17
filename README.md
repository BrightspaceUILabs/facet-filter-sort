# d2l-facet-filter-sort
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/BrightspaceUI/facet-filter-sort)
[![Bower version][bower-image]][bower-url]
[![Build status][ci-image]][ci-url]

Collection of (search) facet, filter, and sort components

## Installation

`d2l-facet-filter-sort` can be installed from [Bower][bower-url]:
```shell
bower install d2l-facet-filter-sort
```

## Usage

Include the [webcomponents.js](http://webcomponents.org/polyfills/) polyfill loader (for browsers who don't natively support web components), then import `d2l-facet-filter-sort.html`:

```html
<head>
	<script src="bower_components/webcomponentsjs/webcomponents-loader.js"></script>
	<link rel="import" href="bower_components/d2l-facet-filter-sort/d2l-facet-filter-sort.html">
</head>
```

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-loader.js"></script>
    <link rel="import" href="../d2l-typography/d2l-typography.html">
    <link rel="import" href="d2l-facet-filter-sort.html">
    <custom-style include="d2l-typography">
      <style is="custom-style" include="d2l-typography"></style>
    </custom-style>
    <style>
      html {
        font-size: 20px;
        font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
      }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<d2l-facet-filter-sort>My element</d2l-facet-filter-sort>
```

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

If you don't have it already, install the [Polymer CLI](https://www.polymer-project.org/3.0/docs/tools/polymer-cli) globally:

```shell
npm install -g polymer-cli
```

To start a [local web server](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#serve) that hosts the demo page and tests:

```shell
polymer serve
```

To lint ([eslint](http://eslint.org/) and [Polymer lint](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#lint)):

```shell
npm run lint
```

To run unit tests locally using [Polymer test](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#tests):

```shell
npm run test:polymer:local
```

To lint AND run local unit tests:

```shell
npm test
```

[bower-url]: http://bower.io/search/?q=d2l-facet-filter-sort
[bower-image]: https://badge.fury.io/bo/d2l-facet-filter-sort.svg
[ci-url]: https://travis-ci.org/BrightspaceUI/facet-filter-sort
[ci-image]: https://travis-ci.org/BrightspaceUI/facet-filter-sort.svg?branch=master

## Versioning

Commits and PR merges to master will automatically do a minor version bump which will:
* Update the version in `package.json`
* Add a tag matching the new version
* Create a github release matching the new version

By using either **[increment major]** or **[increment patch]** notation inside your merge message, you can overwrite the default version upgrade of minor to the position of your choice.
