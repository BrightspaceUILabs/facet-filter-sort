import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-icons/tier2-icons.js';
import 'd2l-inputs/d2l-input-search.js';
import './d2l-filter-dropdown-page-styles.js';
import './d2l-filter-dropdown-localize-behavior.js';

/**
 * @customElement
 * @polymer
 */

class D2LFilterDropdownPage extends mixinBehaviors([D2L.PolymerBehaviors.FilterDropdown.LocalizeBehavior], PolymerElement) {
	static get template() {
		return html`
			<style include="d2l-filter-dropdown-page-styles"></style>
			<div class="d2l-filter-dropdown-page-search" hidden$="[[disableSearch]]">
				<d2l-input-search value="{{_searchInput}}" placeholder="[[localize('searchBy', 'category', parentTitle)]]"></d2l-input-search>
			</div>
			<dom-repeat items="{{options}}" as="o">
				<template>
					<div on-click="_optionSelected" class="d2l-filter-dropdown-option" hidden$="[[!o.display]]">
						<d2l-icon class="icon-checked" icon="d2l-tier2:check-box" aria-hidden="true" hidden$="[[!o.selected]]"></d2l-icon>
						<d2l-icon class="icon-unchecked" icon="d2l-tier2:check-box-unchecked" aria-hidden="true" hidden="[[o.selected]]"></d2l-icon>
						<span>[[o.title]]</span>
					</div>
				</template>
			</dom-repeat>
		`;
	}
	static get is() { return 'd2l-filter-dropdown-page';	}
	static get properties() {
		return {
			parentKey: {
				type: String,
				value: ''
			},
			parentTitle: {
				type: String,
				value: ''
			},
			options: {
				type: Array,
				value: [
					// {
					// 	key: '',
					// 	title: '',
					// 	selected: false,
					// 	display: true
					// }
				]
			},
			numSelected: {
				type: Number,
				value: 0
			},
			disableSearch: {
				type: Boolean,
				value: false
			},
			_optionChanged: {
				type: String,
				value: 'd2l-filter-dropdown-option-changed'
			},
			_searchInput: {
				type: String,
				observer: '_onSearchChanged'
			}
		};
	}

	constructor() { super(); }

	ready() {
		super.ready();
		var input = this.shadowRoot.querySelector('d2l-input-search');
		if (input) {
			input.shadowRoot.querySelector('.d2l-input-search-search').hidden = true;
			input.shadowRoot.querySelector('.d2l-input-search-clear').hidden = true;
		}
	}

	selectOptionByIndex(index) {
		var change = !this.options[index].selected;
		this._setOptionProp('selected', change, index);
		this._numSelected = this._getNumSelected();
		this._dispatchOptionChanged(this.options[index].key, change);
	}

	_getNumSelected() {
		return this.options.filter(v => v.selected).length;
	}

	_optionSelected(e) {
		this.selectOptionByIndex(e.model.index);
	}

	_setOptionProp(prop, value, index) {
		this.set(`options.${index}.${prop}`, value);
	}

	_dispatchOptionChanged(key, newValue) {
		this.dispatchEvent(
			new CustomEvent(
				this._optionChanged,
				{
					detail: {
						category: this.parentKey,
						option: key,
						newValue: newValue
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_onSearchChanged(e) {
		var clear = e === '';
		if (clear || e.length) {
			var regex = new RegExp(e, 'i');
			for (var i = 0; i < this.options.length; i++) {
				this._setOptionProp('display', clear || regex.test(this.options[i].title), i);
			}
			var input = this.shadowRoot.querySelector('d2l-input-search');
			if (input) {
				input.shadowRoot.querySelector('.d2l-input-search-clear').hidden = clear;
			}
		}
	}
}

window.customElements.define(D2LFilterDropdownPage.is, D2LFilterDropdownPage);
