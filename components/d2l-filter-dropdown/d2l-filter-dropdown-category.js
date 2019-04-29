import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import 'd2l-tabs/d2l-tab-panel-behavior.js';
import 'd2l-inputs/d2l-input-search.js';
import 'd2l-menu/d2l-menu.js';
import 'd2l-colors/d2l-colors.js';
import './d2l-filter-dropdown-localize-behavior.js';

/**
 * @customElement
 * @polymer
 */

class D2LFilterDropdownCategory extends mixinBehaviors([D2L.PolymerBehaviors.Tabs.TabPanelBehavior, D2L.PolymerBehaviors.FilterDropdown.LocalizeBehavior], PolymerElement) {
	static get template() {
		return html`
			<style include="d2l-tab-panel-styles">
				:host {
					margin: -1px -1rem 0 -1rem;
					border-top: 1px solid var(--d2l-color-gypsum);
					padding: 1.2rem 1rem 0 1rem;
				}

				.d2l-filter-dropdown-page-search {
					margin-bottom: 0.5rem;
				}

				d2l-menu {
					margin: 0 -1rem;
					width: auto;
				}
			</style>
			<div class="d2l-filter-dropdown-page-search" hidden$="[[disableSearch]]">
				<d2l-input-search placeholder="[[localize('searchBy', 'category', categoryText)]]" value="[[searchValue]]"></d2l-input-search>
			</div>
			<d2l-menu label="[[text]]">
				<slot></slot>
			</d2l-menu>
		`;
	}
	static get is() { return 'd2l-filter-dropdown-category'; }
	static get properties() {
		return {
			key: {
				type: String,
				value: ''
			},
			categoryText: {
				type: String,
				value: ''
			},
			disableSearch: {
				type: Boolean,
				value: false
			},
			searchValue: {
				type: String
			},
			selectedOptionCount: {
				type: Number,
				value: 0
			}
		};
	}
	static get observers() {
		return [
			'_updateTabText(categoryText, selectedOptionCount)'
		];
	}

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
		e.stopPropagation();
		this.dispatchEvent(
			new CustomEvent(
				'd2l-filter-dropdown-category-searched',
				{
					detail: {
						categoryKey: this.key,
						value: e.detail.value
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_handleMenuItemChange(e) {
		e.stopPropagation();
		this.dispatchEvent(
			new CustomEvent(
				'd2l-filter-dropdown-menu-item-change',
				{
					detail: {
						categoryKey: this.key,
						menuItemKey: e.detail.value,
						selected: e.detail.selected
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_dispatchSelected() {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-filter-dropdown-category-selected',
				{
					detail: {
						categoryKey: this.key
					},
					bubbles: true,
					composed: true
				}
			)
		);
	}

	_updateTabText(categoryText, selectedOptionCount) {
		if (selectedOptionCount === 0) {
			this.text = categoryText;
		} else {
			this.text = this.localize('categoryTitleMultiple', 'title', categoryText, 'numSelected', selectedOptionCount);
		}
	}
}

window.customElements.define(D2LFilterDropdownCategory.is, D2LFilterDropdownCategory);
