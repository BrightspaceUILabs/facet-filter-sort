import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '../../components/d2l-filter-dropdown/d2l-filter-dropdown.js';
import '../../components/d2l-filter-dropdown/d2l-filter-dropdown-category.js';
import '../../components/d2l-filter-dropdown/d2l-filter-dropdown-option.js';

/**
 * @customElement
 * @polymer
 */

class D2LDemoFilter extends PolymerElement {
	static get is() { return 'd2l-demo-filter'; }
	static get properties() {
		return {
			_filters: {
				type: Array,
				value: [
					{
						key: 'season',
						title: 'Season',
						numSelected: 2,
						options: [{
							key: 'spring',
							title: 'Spring',
							selected: true,
							display: true
						},
						{
							key: 'summer',
							title: 'Summer',
							selected: false,
							display: true
						},
						{
							key: 'fall',
							title: 'Fall',
							selected: true,
							display: true
						},
						{
							key: 'winter',
							title: 'Winter',
							selected: false,
							display: true
						}]
					},
					{
						key: 'department',
						title: 'Department',
						numSelected: 1,
						options: [{
							key: 'art',
							title: 'Art',
							selected: false,
							display: true
						},
						{
							key: 'math',
							title: 'Math',
							selected: true,
							display: true
						},
						{
							key: 'english',
							title: 'English',
							selected: false,
							display: true
						},
						{
							key: 'french',
							title: 'French',
							selected: false,
							display: true
						},
						{
							key: 'science',
							title: 'Science',
							selected: false,
							display: true
						}]
					},
					{
						key: 'instructor',
						title: 'Instructor',
						numSelected: 0,
						options: [{
							key: 'kelly',
							title: 'Ms. Kelly',
							selected: false,
							display: true
						},
						{
							key: 'smith',
							title: 'Mr. Smith',
							selected: false,
							display: true
						},
						{
							key: 'jones',
							title: 'Mrs. Jones',
							selected: false,
							display: true
						}]
					}
				]
			},
			_totalSelected: {
				type: Number,
				value: 3
			}
		};
	}

	static get template() {
		return html`
			<d2l-filter-dropdown total-selected-option-count="[[_totalSelected]]">
				<dom-repeat items="[[_filters]]" as="f">
					<template>
						<d2l-filter-dropdown-category key="[[f.key]]" category-text="[[f.title]]" selected-option-count="[[f.numSelected]]">
						<dom-repeat items="[[f.options]]" as="o">
							<template>
								<d2l-filter-dropdown-option selected="[[o.selected]]" text="[[o.title]]" value="[[o.key]]" hidden$="[[!o.display]]"></d2l-filter-dropdown-option>
							</template>
						</dom-repeat>
						</d2l-filter-dropdown-category>
					</template>
				</dom-repeat>
			</d2l-filter-dropdown>
		`;
	}

	connectedCallback() {
		super.connectedCallback();
		afterNextRender(this, function() {
			this.addEventListener('d2l-filter-dropdown-option-change', this._handleMenuItemChange);
			this.addEventListener('d2l-filter-dropdown-cleared', this._handleClear);
			this.addEventListener('d2l-filter-dropdown-category-searched', this._handleSearch);
		}.bind(this));
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('d2l-filter-dropdown-option-change', this._handleMenuItemChange);
		this.removeEventListener('d2l-filter-dropdown-cleared', this._handleClear);
		this.removeEventListener('d2l-filter-dropdown-category-searched', this._handleSearch);
	}

	_handleClear() {
		for (var i = 0; i < this._filters.length; i++) {
			this.set(['_filters', i, 'numSelected'], 0);
			for (var j = 0; j < this._filters[i].options.length; j++) {
				this.set(['_filters', i, 'options', j, 'selected'], false);
			}
		}
		this._totalSelected = 0;
	}

	_handleMenuItemChange(e) {
		for (var i = 0; i < this._filters.length; i++) {
			if (this._filters[i].key === e.detail.categoryKey) {
				for (var j = 0; j < this._filters[i].options.length; j++) {
					if (this._filters[i].options[j].key === e.detail.menuItemKey) {
						var item = this._filters[i].options[j];
						if (item.selected !== e.detail.selected) {
							item.selected = e.detail.selected;
							if (e.detail.selected) {
								this.set(['_filters', i, 'numSelected'], this._filters[i].numSelected + 1);
								this._totalSelected++;
							} else {
								this.set(['_filters', i, 'numSelected'], this._filters[i].numSelected - 1);
								this._totalSelected--;
							}
						}
					}
				}
			}
		}
	}

	_handleSearch(e) {
		for (var i = 0; i < this._filters.length; i++) {
			if (this._filters[i].key === e.detail.categoryKey) {
				for (var j = 0; j < this._filters[i].options.length; j++) {
					if (e.detail.value === '') {
						this.set(['_filters', i, 'options', j, 'display'], true);
					} else {
						if (this._filters[i].options[j].title.toLowerCase().indexOf(e.detail.value.toLowerCase()) > -1) {
							this.set(['_filters', i, 'options', j, 'display'], true);
						} else {
							this.set(['_filters', i, 'options', j, 'display'], false);
						}
					}
				}
			}
		}
	}
}

window.customElements.define(D2LDemoFilter.is, D2LDemoFilter);
