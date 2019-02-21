import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-dropdown/d2l-dropdown.js';
import 'd2l-dropdown/d2l-dropdown-content.js';
import 'd2l-button/d2l-button-subtle.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-tabs/d2l-tabs.js';
import './d2l-filter-dropdown-page.js';
import './d2l-filter-dropdown-styles.js';
import './d2l-filter-dropdown-localize-behavior.js';

/**
 * @customElement
 * @polymer
 */

class D2LFilterDropdown extends mixinBehaviors([D2L.PolymerBehaviors.FilterDropdown.LocalizeBehavior], PolymerElement) {
	static get template() {
		return html`
			<style include="d2l-filter-dropdown-styles"></style>
			<d2l-dropdown class="d2l-filter-dropdown-container">
				<button
					class="d2l-dropdown-opener"
					aria-labelledby="filterText">
					<span id="filterText">[[_numFiltersText(_numFilters)]]</span>
					<d2l-icon icon="d2l-tier1:chevron-down"></d2l-icon>
				</button>
				<d2l-dropdown-content
					min-width="[[_minWidth]]"
					max-width="[[_maxWidth]]"
					render-content
					no-pointer>
					<div class="d2l-filter-dropdown-content-header">
						<span>[[localize('filterBy')]]</span>
						<d2l-button-subtle text="[[localize('clear')]]" hidden$="[[!_numFilters]]" on-click="_clearFilters"></d2l-button-subtle>
					</div>
					<d2l-tabs>
					  <dom-repeat items="[[_filters]]" as="f">
						<template>
					    	<d2l-tab-panel text="[[f.title]] ([[f.numSelected]])"><d2l-filter-dropdown-page parent-key="[[f.key]]" parent-title="[[f.title]]" options="{{f.options}}" disable-search="[[disableSearch]]"></d2l-tab-panel>
						</template>
					  </dom-repeat>
					</d2l-tabs>
				</d2l-dropdown-content>
			</d2l-dropdown>
		`;
	}
	static get is() { return 'd2l-filter-dropdown';	}
	static get properties() {
		return {
			disableSearch: {
				type: Boolean,
				value: false
			},
			_filters: {
				type: Array,
				value: [
					// {
					// 	key: '',
					// 	title: '',
					// 	active: false,
					// 	numSelected: 0,
					// 	options: [{
					// 		key: '',
					// 		title: '',
					// 		selected: false,
					// 		display: true
					// 	}]
					// }
				]
			},
			_minWidth: {
				type: Number,
				value: 25
			},
			_maxWidth: {
				type: Number,
				value: 400
			},
			_defaultSelectedTab: {
				type: String,
				computed: '_getDefaultSelectedTab(_filters.*)'
			},
			_selectedTab: {
				type: String,
				computed: '_getSelectedTab(_filters.*)'
			},
			_filterDropdownClosed: {
				type: String,
				value: 'd2l-filter-dropdown-closed'
			},
			_numFilters: {
				type: Number,
				computed: '_getTotalSelected(_filters.*)'
			}
		};
	}
	constructor() { super(); }

	ready() {
		super.ready();
		this.addEventListener('d2l-filter-dropdown-option-changed', this._optionChanged);
		this.addEventListener('d2l-dropdown-close', this._dropdownClosed);
	}

	selectFilterCategory(key) {
		var index = this._filters.findIndex(v => v.active);
		if (index >= 0) {
			if (this._filters[index].key === key) {
				return;
			}
			this._setProp('active', false, index);
		}
		index = this._getFilterIndexFromKey(key);
		if (index >= 0) {
			this._setProp('active', true, index);
		}
	}

	addFilterCategory(key, title, active) {
		if (!this._filters.find(v => v.key === key)) {
			this._filters = this._filters.concat({
				key: key,
				title: title,
				active: false,
				numSelected: 0,
				options: []
			});

			if (active || this._filters.length === 1) {
				this.selectFilterCategory(this._filters.slice(-1)[0].key);
			}
		}
	}

	removeFilterCategory(key) {
		this._filters = this._filters.filter(v => v.key !== key);
	}

	addFilterOption(categoryKey, key, title, selected) {
		var index = this._getFilterIndexFromKey(categoryKey);
		if (index >= 0 && !this._filters[index].options.find(v => v.key === key)) {
			this._setProp(
				'options',
				this._filters[index].options.concat({
					key: key,
					title: title,
					selected: selected || false,
					display: true
				}),
				index);
			if (selected) {
				this._setNumSelected(index);
			}
		}
	}

	removeFilterOption(categoryKey, key) {
		var index = this._getFilterIndexFromKey(categoryKey);
		if (index >= 0) {
			this._setProp('options', this._filters[index].options.filter(v => v.key !== key), index);
		}
	}

	_selectTab(e) {
		this.selectFilterCategory(e.model.item.key);
	}

	_clearFilters() {
		for (var i = 0; i < this._filters.length; i++) {
			for (var j = 0; j < this._filters[i].options.length; j++) {
				this._setProp('selected', false, i, j);
			}
			this._setNumSelected(i);
		}
	}

	_getDefaultSelectedTab() {
		if (this._filters && this._filters.length) {
			return this._filters[0].key;
		}
		return '';
	}

	_getSelectedTab() {
		if (this._filters && this._filters.length) {
			var f = this._filters.find(v => v.active);
			if (f) {
				return f.key;
			}
		}
		return this._getDefaultSelectedTab();
	}

	_getTotalSelected() {
		var result = 0;
		for (var i = 0; i < this._filters.length; i++) {
			result += this._filters[i].numSelected;
		}
		return result;
	}

	_setNumSelected(index) {
		this._setProp('numSelected', this._filters[index].options.filter(v => v.selected).length, index);
	}

	_setProp(prop, value, categoryIndex, optionsIndex) {
		var property = `_filters.${categoryIndex}.`;
		if (optionsIndex >= 0) {
			property += `options.${optionsIndex}.${prop}`;
		} else {
			property += prop;
		}
		this.set(property, value);
	}

	_optionChanged(e) {
		var index = this._getFilterIndexFromKey(e.detail.category);
		if (index >= 0) {
			this._setNumSelected(index);
		}
	}

	_dropdownClosed(e) {
		if (e.target.localname === this.is) {
			this._dispatchFilterDropdownClosed();
		}
	}

	_dispatchFilterDropdownClosed() {
		this.dispatchEvent(
			new CustomEvent(
				this._filterDropdownClosed,
				{
					detail: {
						activeFilters: this._getActiveFilters()
					},
					composed: true
				}
			)
		);
	}

	_getActiveFilters() {
		var result = [];
		for (var i = 0; i < this._filters.length; i++) {
			for (var j = 0; j < this._filters[i].options.length; j++) {
				if (this._filters[i].options[j].selected) {
					result.push({categoryKey: this._filters[i].key, optionKey: this._filters[i].options[j].key});
				}
			}
		}
		return result;
	}

	_getFilterIndexFromKey(key) {
		return this._filters.findIndex(v => v.key === key);
	}

	_numFiltersText() {
		if (this._numFilters === 0) {
			return this.localize('filter');
		}
		if (this._numFilters === 1) {
			return this.localize('filterSingle');
		}
		return this.localize('filterMultiple', 'numOptions', this._numFilters);
	}
}

window.customElements.define(D2LFilterDropdown.is, D2LFilterDropdown);
