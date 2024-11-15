# facet-filter-sort

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui-labs/facet-filter-sort.svg)](https://www.npmjs.org/package/@brightspace-ui-labs/facet-filter-sort)

> Note: this is a ["labs" component](https://github.com/BrightspaceUI/guide/wiki/Component-Tiers). While functional, these tasks are prerequisites to promotion to BrightspaceUI "official" status:
>
> - [ ] [Design organization buy-in](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#working-with-design)
> - [ ] [design.d2l entry](http://design.d2l/)
> - [ ] [Architectural sign-off](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#web-component-architecture)
> - [x] [Continuous integration](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-continuously-with-travis-ci)
> - [x] [Cross-browser testing](https://github.com/BrightspaceUI/guide/wiki/Testing#cross-browser-testing-with-sauce-labs)
> - [x] [Unit tests](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-with-polymer-test) (if applicable)
> - [ ] [Accessibility tests](https://github.com/BrightspaceUI/guide/wiki/Testing#automated-accessibility-testing-with-axe)
> - [ ] [Visual diff tests](https://github.com/BrightspaceUI/visual-diff)
> - [ ] [Localization](https://github.com/BrightspaceUI/guide/wiki/Localization) with Serge (if applicable)
> - [x] Demo page
> - [ ] README documentation

Collection of old filter and sort components. Use the `d2l-filter` in [BrightspaceUI/core](https://github.com/BrightspaceUI/core/tree/main/components/filter). A sort dropdown component will be coming to `core` eventually.

## Installation

```shell
npm install @brightspace-ui-labs/facet-filter-sort
```

## Components

- [d2l-labs-sort-by-dropdown](#d2l-labs-sort-by-dropdown)

### d2l-labs-sort-by-dropdown

<img src="/images/d2l-labs-sort-by-dropdown.png?raw=true" width="450">

#### Usage

To Do

## Deprecated Components

- [d2l-labs-filter-dropdown](#d2l-labs-filter-dropdown)
- [d2l-labs-applied-filters](#d2l-labs-applied-filters)

### d2l-labs-filter-dropdown

**DEPRECATED: Use [`d2l-filter`](https://github.com/BrightspaceUI/core/tree/main/components/filter) in `BrightspaceUI/core`.**

<img src="/images/d2l-labs-filter-dropdown.png?raw=true" width="450">

#### Usage

Import the three filter components:

```html
<script type="module">
	import '@brightspace-ui-labs/facet-filter-sort/components/filter-dropdown/filter-dropdown.js';
	import '@brightspace-ui-labs/facet-filter-sort/components/filter-dropdown/filter-dropdown-category.js';
	import '@brightspace-ui-labs/facet-filter-sort/components/filter-dropdown/filter-dropdown-option.js';
</script>
```

Then, add the `d2l-labs-filter-dropdown` as the top level filter component.  For each filter category, add a `d2l-labs-filter-dropdown-category` component, which is a custom `d2l-tab-panel` that includes a `d2l-menu`.  Then, for each filter option in that category, you should use the `d2l-labs-filter-dropdown-option` component (which is a custom `d2l-menu-item` component).  For example:

```html
<d2l-labs-filter-dropdown total-selected-option-count="3">
	<d2l-labs-filter-dropdown-category key="1" category-text="Category 1" selected-option-count="2">
		<d2l-labs-filter-dropdown-option selected text="Option 1 - 1" value="1"></d2l-labs-filter-dropdown-option>
		<d2l-labs-filter-dropdown-option text="Option 1 - 2" value="2"></d2l-labs-filter-dropdown-option>
		<d2l-labs-filter-dropdown-option selected text="Option 1 - 3" value="3"></d2l-labs-filter-dropdown-option>
	</d2l-labs-filter-dropdown-category>
	<d2l-labs-filter-dropdown-category key="2" category-text="Category 2" selected-option-count="1">
		<d2l-labs-filter-dropdown-option selected text="Option 2 - 1" value="1"></d2l-labs-filter-dropdown-option>
		<d2l-labs-filter-dropdown-option text="Option 2 - 2" value="2"></d2l-labs-filter-dropdown-option>
	</d2l-labs-filter-dropdown-category>
	<d2l-labs-filter-dropdown-category key="3" category-text="Category 3" disable-search>
		<d2l-labs-filter-dropdown-option text="Option 3 - 1" value="1"></d2l-labs-filter-dropdown-option>
		<d2l-labs-filter-dropdown-option text="Option 3 - 2" value="2"></d2l-labs-filter-dropdown-option>
		<d2l-labs-filter-dropdown-option text="Option 3 - 3" value="3"></d2l-labs-filter-dropdown-option>
	</d2l-labs-filter-dropdown-category>
</d2l-labs-filter-dropdown>
```

The default lang terms can be overridden by setting the appropriate attributes.

```html
<d2l-labs-filter-dropdown total-selected-option-count="3" header-text="Send To" opener-text="Send" opener-text-single="Sending To One" opener-text-multiple="Sending To Many">
	<d2l-labs-filter-dropdown-category key="1" category-text="Category 1" selected-option-count="1">
		<d2l-labs-filter-dropdown-option selected text="Option 1 - 1" value="1"></d2l-labs-filter-dropdown-option>
		<d2l-labs-filter-dropdown-option text="Option 1 - 2" value="2"></d2l-labs-filter-dropdown-option>
	</d2l-labs-filter-dropdown-category>
</d2l-labs-filter-dropdown>
```

#### Attributes

`d2l-labs-filter-dropdown`:

- `max-width` (optional): Sets the max-width of the filter dropdown.
- `min-width` (optional): Sets the min-width of the filter dropdown.
- `total-selected-option-count`: The total number of selected filter options across all categories.  When options are selected and de-selected, the consumer is responsible for updating this number after updating its own data store.
- `header-text` (optional): Sets the text for the filter content header.
- `opener-text` (optional): Sets the text for the opener when there are no selections.
- `opener-text-single` (optional): Sets the text for the opener when there is a single selection.
- `opener-text-multiple` (optional): Sets the text for the opener when there are multiple selections.
- `disable-opener-text-variation` (optional): Disables displaying different text for different number of selections, instead always displaying the term for no selections.

Note that for the header and opener text overrides, if the terms are to reflect the number of selections (e.g. `Sending To 3 Selections`), the consumer is responsible for updating those terms when the number of selections change.

`d2l-labs-filter-dropdown-category`:

- `category-text`: Name of the filter category, will be shown on the tab.
- `disable-search` (optional): Hides the search bar inside a filter tab.
- `key`: Unique id to represent a filter category, sent back in category events.
- `search-value` (optional): Sets the value in the search input, useful if setting up the filter in a default state.
- `selected-option-count`: The number of selected filter options for that filter category.  When options are selected and de-selected, the consumer is responsible for updating this number after updating its own data store.

`d2l-labs-filter-dropdown-option`:

- `text`: Text of the filter option.
- `value`: Value returned in the change event.
- `selected` (optional): If added, this item will be selected by default.

#### Events

`d2l-labs-filter-dropdown`:

- `d2l-labs-filter-dropdown-close`: Fired when the filter dropdown is closed.
- `d2l-labs-filter-dropdown-cleared`: Fired when the clear button or the clear filters button is pressed to clear all filters.

`d2l-labs-filter-dropdown-category`:

- `d2l-labs-filter-dropdown-category-selected`: Fired when a filter tab is selected.
- `d2l-labs-filter-dropdown-category-searched`: Fired when a filter category is searched.
- `d2l-labs-filter-dropdown-option-change`: Fired when a filter option is selected.

### d2l-labs-applied-filters

A tag-list allowing the user to see (and remove) the currently applied filters.  Works with the `d2l-labs-filter-dropdown` above.

NOTE: This component uses the `slotchange` event and so will not work if you require IE support

<img src="/images/d2l-labs-applied-filters.png?raw=true" width="450">

#### Attributes

- `for`: The id of the `d2l-labs-filter-dropdown` you want to track.
- `label-text` (optional): The text displayed in this component's label. Defaults to "Applied Filters:".

#### Usage

Set the `for` param to be the id of the `d2l-labs-filter-dropdown` that you want to track.
This also works if the `d2l-labs-filter-dropdown` is a child in the shadow-dom of the element referenced by the id.

```html
<d2l-labs-applied-filters for="filter"></d2l-labs-applied-filters>
<d2l-labs-filter-dropdown id="filter"> ... </d2l-labs-filter-dropdown>
```

## Developing

After cloning the repo, run `npm install` to install dependencies.

### Running the demos

To start a [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/) that hosts the demo page and tests:

```shell
npm start
```

### Linting

```shell
# eslint, lit-analyzer, polymer lint and style linting
npm run lint

# eslint only
npm run lint:eslint
```

### Testing

```shell
# lint & run headless unit tests
npm test

# unit tests only
npm run test:headless

# debug or run a subset of local unit tests
npm run test:headless:watch
```

### Versioning and Releasing

This repo is configured to use `semantic-release`. Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `main`.

To learn how to create major releases and release from maintenance branches, refer to the [semantic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/semantic-release) documentation.
