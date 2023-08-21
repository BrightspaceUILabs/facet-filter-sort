import '../../components/filter-dropdown/filter-dropdown.js';
import '../../components/filter-dropdown/filter-dropdown-category.js';
import '../../components/filter-dropdown/filter-dropdown-option.js';
import { html, LitElement } from 'lit';

/**
 * An example of a templated filter-dropdown.
**/
class TemplatedFilterDropdownFilter extends LitElement {
	static get properties() {
		return {
			_filters: { attribute: false, type: Array },
			_totalSelected: { attribute: false, type: Number }
		};
	}

	constructor() {
		super();
		this._totalSelected = 3;
		this._filters = [
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
		];
	}

	render() {
		return html`
			<d2l-labs-filter-dropdown
				@d2l-labs-filter-dropdown-cleared="${this._handleClear}"
				total-selected-option-count="${this._totalSelected}">

				${this._filters.map(f => html`
					<d2l-labs-filter-dropdown-category
						@d2l-labs-filter-dropdown-category-searched="${this._handleSearch}"
						@d2l-labs-filter-dropdown-option-change="${this._handleMenuItemChange}"
						key="${f.key}"
						category-text="${f.title}"
						selected-option-count="${f.numSelected}">

						${f.options.map(o => html`
							<d2l-labs-filter-dropdown-option
								?selected="${o.selected}"
								text="${o.title}"
								value="${o.key}"
								?hidden="${!o.display}">
							</d2l-labs-filter-dropdown-option>
						`)}
					</d2l-labs-filter-dropdown-category>
				`)}
			</d2l-labs-filter-dropdown>
		`;
	}

	_handleClear() {
		for (let i = 0; i < this._filters.length; i++) {
			this._filters[i].numSelected = 0;
			for (let j = 0; j < this._filters[i].options.length; j++) {
				this._filters[i].options[j].selected = false;
			}
		}
		this._totalSelected = 0;
		this.requestUpdate();
	}

	_handleMenuItemChange(e) {
		for (let i = 0; i < this._filters.length; i++) {
			if (this._filters[i].key === e.detail.categoryKey) {
				for (let j = 0; j < this._filters[i].options.length; j++) {
					if (this._filters[i].options[j].key === e.detail.menuItemKey) {
						const item = this._filters[i].options[j];
						if (item.selected !== e.detail.selected) {
							item.selected = e.detail.selected;
							if (e.detail.selected) {
								this._filters[i].numSelected++;
								this._totalSelected++;
							} else {
								this._filters[i].numSelected--;
								this._totalSelected--;
							}
						}
					}
				}
			}
		}
		this.requestUpdate();
	}

	_handleSearch(e) {
		for (let i = 0; i < this._filters.length; i++) {
			if (this._filters[i].key === e.detail.categoryKey) {
				for (let j = 0; j < this._filters[i].options.length; j++) {
					if (e.detail.value === '') {
						this._filters[i].options[j].display = true;
					} else {
						if (this._filters[i].options[j].title.toLowerCase().indexOf(e.detail.value.toLowerCase()) > -1) {
							this._filters[i].options[j].display = true;
						} else {
							this._filters[i].options[j].display = false;
						}
					}
				}
			}
		}
		this.requestUpdate();
	}
}

window.customElements.define('d2l-labs-templated-filter-dropdown-demo', TemplatedFilterDropdownFilter);
