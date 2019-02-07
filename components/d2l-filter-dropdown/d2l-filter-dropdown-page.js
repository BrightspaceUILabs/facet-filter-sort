import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import '@polymer/iron-input/iron-input.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-icons/tier2-icons.js';
import './d2l-filter-dropdown-localize-behavior.js';

/**
 * @customElement
 * @polymer
 */

class D2LFilterDropdownPage extends mixinBehaviors([D2L.PolymerBehaviors.FilterDropdown.LocalizeBehavior], PolymerElement) {
	static get template() {
		return html`
			<style>
				:host {
					--d2l-filter-dropdown-page-search-height: 45px;
				}
				:host iron-input {
					display: block;
				}
				.d2l-filter-dropdown-option:hover {
					background-color: var(--d2l-color-celestine-plus-2);
					border-top-color: var(--d2l-color-celestine-plus-1);
					border-bottom-color: var(--d2l-color-celestine-plus-1);
					color: var(--d2l-color-celestine);
				}
				.d2l-filter-dropdown-option {
					cursor: pointer;
					border: 1px solid transparent;
					color: var(--d2l-color-ferrite);
					line-height: 1.2rem;
					font-size: 0.8rem;
					padding: 0.5rem 1rem;
				}
				.d2l-filter-dropdown-option:not([hidden]) ~ .d2l-filter-dropdown-option:not([hidden]) {
					border-top-color: var(--d2l-color-gypsum);
				}
				.d2l-filter-dropdown-option:not([hidden]) ~ .d2l-filter-dropdown-option:not([hidden]):hover {
					border-top-color: var(--d2l-color-celestine-plus-1);
					border-bottom-color: var(--d2l-color-celestine-plus-1);
				}
				.d2l-filter-dropdown-option d2l-icon {
					--d2l-icon-height: 1rem;
					--d2l-icon-width: 1rem;
					visibility: visible;
					margin-right: 0.5rem;
				}
				.d2l-filter-dropdown-page-search {
					position: relative;
					margin: 10px 20px;
				}
				.d2l-filter-dropdown-page-search-input {
					color: var(--d2l-color-ferrite);
					font-family: inherit;
					font-size: calc(var(--d2l-filter-dropdown-page-search-height) / 3) !important;
					width: 100%;
					height: var(--d2l-filter-dropdown-page-search-height);
					border: 1px solid var(--d2l-color-titanius);
					border-radius: .3rem;
					box-shadow: inset 0 2px 0 0 rgba(185,194,208,.2);
					box-sizing: border-box;
					transition: background-color 0.5s ease, border-color 0.5s ease;
					-webkit-transition: background-color 0.5s ease, border-color 0.5s ease;
					padding-left: calc(var(--d2l-filter-dropdown-page-search-height) / 6);
					padding-right: var(--d2l-filter-dropdown-page-search-height);
				}
				.d2l-filter-dropdown-page-search-input:focus,
				.d2l-filter-dropdown-page-search-input:hover {
					border-color: var(--d2l-color-celestine);
					border-width: 2px;
					outline: 0;
					/* Subtract 1px for increased border width */
					padding-left: calc(var(--d2l-filter-dropdown-page-search-height) / 6 - 1px);
					padding-right: calc(var(--d2l-filter-dropdown-page-search-height) - 1px);
				}
				.d2l-filter-dropdown-page-search-input::-ms-clear {
					display: none;
				}
				.d2l-filter-dropdown-clear-button {
					position: absolute;
					top: 0px;
					right: 0px;
					margin: calc(var(--d2l-filter-dropdown-page-search-height) / 6);
					background: none;
					border: 1px solid transparent;
					cursor: pointer;
					height: calc(2 * var(--d2l-filter-dropdown-page-search-height) / 3);
					width: calc(2 * var(--d2l-filter-dropdown-page-search-height) / 3);
				}
				.d2l-filter-dropdown-search-clear:hover,
				.d2l-filter-dropdown-search-clear:focus {
					border-color: var(--d2l-color-pressicus);
					border-radius: 0.3rem;
				}
				.d2l-filter-dropdown-search-clear d2l-icon {
					--d2l-icon-height: calc(var(--d2l-filter-dropdown-page-search-height) / 3);
					--d2l-icon-width: calc(var(--d2l-filter-dropdown-page-search-height) / 3);
					color: var(--d2l-color-ferrite);
				}
			</style>
			<div class="d2l-filter-dropdown-page-search" hidden$="[[disableSearch]]">
				<iron-input bind-value="{{_searchInput}}" class="d2l-filter-dropdown-search-box">
					<input class="d2l-filter-dropdown-page-search-input" value="{{_searchInput}}" placeholder="[[localize('searchBy', 'category', parentTitle)]]" on-keydown="_onSearchChanged">
				</iron-input>
				<button type="button" on-click="_clearSearchInput" aria-label$="[[searchButtonLabel]]" class="d2l-filter-dropdown-clear-button" hidden$="[[!_showClearSearch]]">
					<d2l-icon icon="d2l-tier1:close-default"></d2l-icon>
				</button>
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
			},
			_showClearSearch: {
				type: Boolean,
				computed: '_getShowClearSearch(_searchInput)'
			}
		};
	}

	constructor() { super(); }

	ready() {
		super.ready();
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
		}
	}

	_getShowClearSearch(input) {
		return input !== '';
	}

	_clearSearchInput() {
		this._searchInput = '';
	}
}

window.customElements.define(D2LFilterDropdownPage.is, D2LFilterDropdownPage);
