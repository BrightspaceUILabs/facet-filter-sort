import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-dropdown/d2l-dropdown.js';
import 'd2l-dropdown/d2l-dropdown-content.js';
import 'd2l-dropdown/d2l-dropdown-button-subtle.js';
import 'd2l-button/d2l-button-subtle.js';
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
			<d2l-dropdown>
				<d2l-dropdown-button-subtle text="[[_numFiltersText(_numFiltersSelectedTotal)]]">
					<d2l-dropdown-content
						min-width="[[minWidth]]"
						max-width="[[maxWidth]]"
						render-content>
						<div class="d2l-filter-dropdown-content-header">
							<span>[[localize('filterBy')]]</span>
							<d2l-button-subtle text="[[localize('clear')]]" hidden$="[[!_numFilters]]" on-click="_clearFilters"></d2l-button-subtle>
						</div>
						<d2l-tabs>
						  <dom-repeat items="[[_filters]]" as="f">
							<template>
						    	<d2l-tab-panel text="[[f.title]] ([[f.numSelected]])" no-padding><d2l-filter-dropdown-page parent-key="[[f.key]]" parent-title="[[f.title]]" options="{{f.options}}" disable-search="[[disableSearch]]"></d2l-tab-panel>
							</template>
						  </dom-repeat>
						</d2l-tabs>
					</d2l-dropdown-content>
				</d2l-dropdown-button-subtle>
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
			minWidth: {
				type: Number,
				value: 25
			},
			maxWidth: {
				type: Number,
				value: 400
			},
			_filters: {
				type: Array,
				value: [
					// {
					// 	key: '',
					// 	title: '',
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
			_filterDropdownClosed: {
				type: String,
				value: 'd2l-filter-dropdown-closed'
			},
			_numFiltersSelectedTotal: {
				type: Number,
				computed: '_getTotalNumFiltersSelected(_filters.*)'
			}
		};
	}
	constructor() { super(); }

	ready() {
		super.ready();
	}

	attached()  {
		this.addEventListener('d2l-filter-dropdown-option-changed', this._optionChanged);
		this.addEventListener('d2l-dropdown-close', this._dropdownClosed);
	}

	detached() {
		this.removeEventListener('d2l-filter-dropdown-option-changed', this._optionChanged);
		this.removeEventListener('d2l-dropdown-close', this._dropdownClosed);
	}

	addFilterCategory(key, title) {
		if (!this._filters.find(v => v.key === key)) {
			this._filters = this._filters.concat({
				key: key,
				title: title,
				numSelected: 0,
				options: []
			});
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
				this._setNumSelected(index, this._filters[index].numSelected + 1);
			}
		}
	}

	removeFilterOption(categoryKey, key) {
		var index = this._getFilterIndexFromKey(categoryKey);
		if (index >= 0) {
			this._setProp('options', this._filters[index].options.filter(v => v.key !== key), index);
		}
	}

	_getFilterIndexFromKey(key) {
		return this._filters.findIndex(v => v.key === key);
	}

	_getOptionIndexFromKey(categoryIndex, key) {
		return this._filters[categoryIndex].options.findIndex(v => v.key === key);
	}

	_clearFilters() {
		for (var i = 0; i < this._filters.length; i++) {
			for (var j = 0; j < this._filters[i].options.length; j++) {
				this._setOptionSelected(i, j, false);
			}
			this._setNumSelected(i, 0);
		}
	}

	_optionChanged(e) {
		var categoryIndex = this._getFilterIndexFromKey(e.detail.categoryKey);
		var optionIndex = this._getOptionIndexFromKey(categoryIndex, e.detail.optionKey);
		if (categoryIndex >= 0 && optionIndex >= 0) {
			this._setOptionSelected(categoryIndex, optionIndex, e.detail.newValue);
			this._setNumSelected(categoryIndex, e.detail.numSelected);
		}
	}

	_setOptionSelected(categoryIndex, optionIndex, isSelected) {
		this._setProp('selected', isSelected, categoryIndex, optionIndex);
	}

	_setNumSelected(index, numSelected) {
		this._setProp('numSelected', numSelected, index);
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

	_dropdownClosed(e) {
		if (e.target === this) {
			e.stopPropagation();
			this._dispatchFilterDropdownClosed();
		}
	}

	_dispatchFilterDropdownClosed() {
		this.dispatchEvent(
			new CustomEvent(
				this._filterDropdownClosed,
				{
					detail: {
						selectedFilters: this._getSelectedFilters()
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_getSelectedFilters() {
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

	_getTotalNumFiltersSelected() {
		var result = 0;
		for (var i = 0; i < this._filters.length; i++) {
			result += this._filters[i].numSelected;
		}
		return result;
	}

	_numFiltersText() {
		if (this._numFiltersSelectedTotal === 0) {
			return this.localize('filter');
		}
		if (this._numFiltersSelectedTotal === 1) {
			return this.localize('filterSingle');
		}
		return this.localize('filterMultiple', 'numOptions', this._numFiltersSelectedTotal);
	}
}

window.customElements.define(D2LFilterDropdown.is, D2LFilterDropdown);