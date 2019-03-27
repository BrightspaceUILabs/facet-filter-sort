import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import 'd2l-inputs/d2l-input-search.js';
import 'd2l-menu/d2l-menu.js';
import 'd2l-menu/d2l-menu-item-checkbox.js';
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
				<d2l-input-search placeholder="[[localize('searchBy', 'category', parentTitle)]]"></d2l-input-search>
			</div>
			<d2l-menu label="[[parentTitle]]">
				<dom-repeat items="[[options]]" as="o">
					<template>
					<d2l-menu-item-checkbox text="[[o.title]]" value="[[o.key]]" selected=[[o.selected]]></d2l-menu-item-checkbox>
					</template>
				</dom-repeat>
			</d2l-menu>
		`;
	}
	static get is() { return 'd2l-filter-dropdown-page'; }
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
					// 	selected: false
					// }
				]
			},
			disableSearch: {
				type: Boolean,
				value: false
			},
			_optionChanged: {
				type: String,
				value: 'd2l-filter-dropdown-option-changed'
			}
		};
	}

	constructor() { super(); }

	ready() {
		super.ready();
		this._handleSearchChange = this._handleSearchChange.bind(this);
		this._handleMenuItemChange = this._handleMenuItemChange.bind(this);
	}

	attached() {
		afterNextRender(this, function() {
			var menu = this._getMenu();
			var search = this._getSearchInput();

			search.addEventListener('d2l-input-search-searched', this._handleSearchChange);
			menu.addEventListener('d2l-menu-item-change', this._handleMenuItemChange);
		}.bind(this));
	}

	detached() {
		var menu = this._getMenu();
		var search = this._getSearchInput();

		search.removeEventListener('d2l-input-search-searched', this._handleSearchChange);
		menu.removeEventListener('d2l-menu-item-change', this._handleMenuItemChange);
	}

	_getSearchInput() {
		return this.shadowRoot.querySelector('d2l-input-search');
	}

	_getMenu() {
		return this.shadowRoot.querySelector('d2l-menu');
	}

	_handleSearchChange(e) {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-filter-dropdown-page-searched',
				{
					detail: {
						value: e.detail.value,
						categoryKey: this.parentKey
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_handleMenuItemChange(e) {
		var index = -1;
		for (var i = 0 ; i < this.options.length; i++) {
			if (this.options[i].key === e.detail.value) {
				index = i;
			}
		}
		this._setOptionProp('selected', e.detail.selected, index);
		this._dispatchOptionChanged(this.options[index].key, e.detail.selected);
	}

	_getNumSelected() {
		return this.options.filter(v => v.selected).length;
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
						categoryKey: this.parentKey,
						optionKey: key,
						newValue: newValue,
						numSelected: this._getNumSelected()
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}
}

window.customElements.define(D2LFilterDropdownPage.is, D2LFilterDropdownPage);
