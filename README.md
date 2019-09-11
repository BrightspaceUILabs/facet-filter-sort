# d2l-facet-filter-sort
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/BrightspaceUI/facet-filter-sort)
[![Bower version][bower-image]][bower-url]
[![Build status][ci-image]][ci-url]

Collection of (search) facet, filter, and sort components

## Components

- [d2l-filter-dropdown](#d2l-filter-dropdown)
- [d2l-search-facets](#d2l-search-facets)
- [d2l-search-results-count](#d2l-search-results-count)
- [d2l-sort-by-dropdown](#d2l-sort-by-dropdown)

### d2l-filter-dropdown

<img src="/images/d2l-filter-dropdown.png?raw=true" width="450">

#### Usage

Include the webcomponents.js polyfill loader (for browsers who don't natively support web components), then import the following:

- `d2l-filter-dropdown`
- `d2l-filter-dropdown-category`
- `d2l-menu-item-checkbox`

```html
<script src="../../@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
<script type="module" src="../../d2l-facet-filter-sort/components/d2l-filter-dropdown/d2l-filter-dropdown.js"></script>
<script type="module" src="../../d2l-facet-filter-sort/components/d2l-filter-dropdown/d2l-filter-dropdown-category.js"></script>
<script type="module" src="../../d2l-menu/d2l-menu-item-checkbox.js"></script>
```

Then, add the `d2l-filter-dropdown` as the top level filter component.  For each filter category, add a `d2l-filter-dropdown-category` component, which is a custom `d2l-tab-panel` that includes a `d2l-menu`.  Then, for each filter option in that category, you should use the `d2l-menu-item-checkbox` component.  For example:

```html
<d2l-filter-dropdown total-selected-option-count="3">
	<d2l-filter-dropdown-category key="1" category-text="Category 1" selected-option-count="2">
		<d2l-menu-item-checkbox selected text="Option 1 - 1" value="1"></d2l-menu-item-checkbox>
		<d2l-menu-item-checkbox text="Option 1 - 2" value="2"></d2l-menu-item-checkbox>
		<d2l-menu-item-checkbox selected text="Option 1 - 3" value="3"></d2l-menu-item-checkbox>
	</d2l-filter-dropdown-category>
	<d2l-filter-dropdown-category key="2" category-text="Category 2" selected-option-count="1">
		<d2l-menu-item-checkbox selected text="Option 2 - 1" value="1"></d2l-menu-item-checkbox>
		<d2l-menu-item-checkbox text="Option 2 - 2" value="2"></d2l-menu-item-checkbox>
	</d2l-filter-dropdown-category>
	<d2l-filter-dropdown-category key="3" category-text="Category 3" disable-search>
		<d2l-menu-item-checkbox text="Option 3 - 1" value="1"></d2l-menu-item-checkbox>
		<d2l-menu-item-checkbox text="Option 3 - 2" value="2"></d2l-menu-item-checkbox>
		<d2l-menu-item-checkbox text="Option 3 - 3" value="3"></d2l-menu-item-checkbox>
	</d2l-filter-dropdown-category>
</d2l-filter-dropdown>
```

The default lang terms can be overidden by setting the appropriate attributes.

```html
<d2l-filter-dropdown total-selected-option-count="3" header-text="Send To" opener-text="Send" opener-text-single="Sending To One" opener-text-multiple="Sending To Many">
	<d2l-filter-dropdown-category key="1" category-text="Category 1" selected-option-count="1">
		<d2l-menu-item-checkbox selected text="Option 1 - 1" value="1"></d2l-menu-item-checkbox>
		<d2l-menu-item-checkbox text="Option 1 - 2" value="2"></d2l-menu-item-checkbox>
	</d2l-filter-dropdown-category>
</d2l-filter-dropdown>
```

#### Attributes

`d2l-filter-dropdown`:

- `max-width` (optional): Sets the max-width of the filter dropdown.
- `min-width` (optional): Sets the min-width of the filter dropdown.
- `total-selected-option-count`: The total number of selected filter options across all categories.  When options are selected and de-selected, the consumer is responsible for updating this number after updating its own data store.
- `header-text` (optional): Sets the text for the filter content header.
- `opener-text` (optional): Sets the text for the opener when there are no selections.
- `opener-text-single` (optional): Sets the text for the opener when there is a single selection.
- `opener-text-multiple` (optional): Sets the text for the opener when there are multiple selections.
- `disable-opener-text-variation` (optional): Disables displaying different text for different number of selections, instead always displaying the term for no selections.

Note that for the header and opener text overrides, if the terms are to reflect the number of selections (e.g. `Sending To 3 Selections`), the consumer is responsible for updating those terms when the number of selections change.

`d2l-filter-dropdown-category`:

- `category-text`: Name of the filter category, will be shown on the tab.
- `disable-search` (optional): Hides the search bar inside a filter tab.
- `key`: Unique id to represent a filter category, sent back in category events.
- `search-value` (optional): Sets the value in the search input, useful if setting up the filter in a default state.
- `selected-option-count`: The number of selected filter options for that filter category.  When options are selected and de-selected, the consumer is responsible for updating this number after updating its own data store.

#### Events

`d2l-filter-dropdown`:

- `d2l-filter-dropdown-close`: Fired when the filter dropdown is closed.
- `d2l-filter-dropdown-cleared`: Fired when the clear button is pressed to clear all filters.

`d2l-filter-dropdown-category`:

- `d2l-filter-dropdown-category-selected`: Fired when a filter tab is selected.
- `d2l-filter-dropdown-category-searched`: Fired when a filter category is searched.
- `d2l-filter-dropdown-menu-item-change`: Fired when a filter option is selected.

### d2l-search-facets

<img src="/images/d2l-search-facets.png?raw=true" width="450">

#### Usage

To Do

### d2l-search-results-count

<img src="/images/d2l-search-results-count.png?raw=true" width="450">

#### Usage

To Do

### d2l-sort-by-dropdown

<img src="/images/d2l-sort-by-dropdown.png?raw=true" width="450">

#### Usage

To Do

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
[ci-url]: https://travis-ci.com/BrightspaceUI/facet-filter-sort
[ci-image]: https://travis-ci.com/BrightspaceUI/facet-filter-sort.svg?branch=master

## Versioning & Releasing

All version changes should obey [semantic versioning](https://semver.org/) rules.

Include either `[increment major]`, `[increment minor]` or `[increment patch]` in your merge commit message to automatically increment the `package.json` version and create a tag during the next build.
