import '@brightspace-ui/core/components/tag-list/tag-list.js';
import '@brightspace-ui/core/components/tag-list/tag-list-item.js';
import { css, html, LitElement, nothing } from 'lit';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { getComposedChildren } from '@brightspace-ui/core/helpers/dom.js';

const DROPDOWN_NAME = 'D2L-LABS-FILTER-DROPDOWN';
const DROPDOWN_CATEGORY_NAME = 'D2L-LABS-FILTER-DROPDOWN-CATEGORY';
const DROPDOWN_OPTION_NAME = 'D2L-LABS-FILTER-DROPDOWN-OPTION';

/**
 * A tag-list allowing the user to see (and remove) the currently applied filters.
 */
class D2lLabsAppliedFilters extends LitElement {
	static get properties() {
		return {
			/**
			 * REQUIRED: The id of the "d2l-labs-filter-dropdown" that you want to track
			 */
			for: { type: String },
			/**
			 * Optional: The text displayed in this component's label. Default: "Applied Filters:"
			 */
			labelText: { type: String, attribute: 'label-text' },
			_entries: { type: Array },
			_selectedEntries: { type: Array },
			_target: { type: Object },
		};
	}

	static get styles() {
		return [bodyCompactStyles, css`
			:host {
				display: block;
			}

			:host([hidden]) {
				display: none;
			}

			[hidden] {
				display: none;
			}
		`];
	}

	constructor() {
		super();
		this.labelText = '';

		this._clearFiltersClicked = this._clearFiltersClicked.bind(this);
		this._clearSelected = this._clearSelected.bind(this);
		this._setSelectedOptions = this._setSelectedOptions.bind(this);
		this._update = this._update.bind(this);

		this._setSelectedOptions();
	}

	firstUpdated() {
		this._update();
	}

	render() {
		if (!(this._selectedEntries.length)) return nothing;

		return html`<d2l-tag-list
			clearable
			description="${this.labelText}"
			@d2l-tag-list-clear="${this._clearFiltersClicked}">
			${(this._selectedEntries || []).map((x, index) => html`
				<d2l-tag-list-item
					text="${x.text}"
					key="${index}"
					@d2l-tag-list-item-clear="${this._multiSelectItemDeleted}"
				>
				</d2l-tag-list-item>
			`)}
		</d2l-tag-list>`;
	}

	updated(changedProperties) {
		if (Object.keys(changedProperties).indexOf('for') > -1) {
			this._update();
		}
	}

	_clearFiltersClicked() {
		const dropdown = this._target;
		if (!dropdown) { return; }
		dropdown.clearFilters();
		dropdown.focus();
	}

	_clearSelected() {
		this._selectedEntries = [];
	}

	_filterOptionChanged() {
		this._setSelectedOptions();
	}

	_findDropdownIfNested(target) {
		if (target.nodeName !== DROPDOWN_NAME) {
			const dropdownChildren = getComposedChildren(target);

			for (let i = 0; i < dropdownChildren.length; i++) {
				const child = dropdownChildren[i];
				if (child.nodeName === DROPDOWN_NAME) {
					return child;
				}
				const nestedChildren = getComposedChildren(child) || [];
				const t = nestedChildren.find(x => x.nodeName === DROPDOWN_NAME);
				if (t) {
					return t;
				}
			}
		}
		return target;
	}

	_getFilterOptions(categoryKey) {
		this._setFilter();
		const dropdown = this._target;

		if (!dropdown) {
			return [];
		}

		const results = {};

		const childFilter = categoryKey ?
			x => x.nodeName === DROPDOWN_CATEGORY_NAME && x.key === categoryKey :
			x => x.nodeName === DROPDOWN_CATEGORY_NAME;

		[...dropdown.children].filter(childFilter)
			.forEach(x => results[x.key] = [...x.children].filter(x => x.nodeName === DROPDOWN_OPTION_NAME));

		return results;
	}

	_multiSelectItemDeleted(e) {
		this._selectedEntries[e.target.getAttribute('key')].deselect();
	}

	_setFilter() {
		if (!this.for) {
			return undefined;
		}
		if (this._target) {
			this._target.removeEventListener('d2l-labs-filter-dropdown-option-change', this._setSelectedOptions, true);
			this._target.removeEventListener('d2l-labs-filter-dropdown-cleared', this._clearSelected, true);
			this._target.removeEventListener('d2l-labs-filter-dropdown-category-slotchange', this._update, true);
		}

		const ownerRoot = this.getRootNode();

		const targetSelector = `#${this.for}`;
		let target = ownerRoot.querySelector(targetSelector) || (ownerRoot && ownerRoot.host && ownerRoot.host.querySelector(targetSelector));

		if (target) {
			target = this._findDropdownIfNested(target);
			target.addEventListener('d2l-labs-filter-dropdown-option-change', this._setSelectedOptions, true);
			target.addEventListener('d2l-labs-filter-dropdown-cleared', this._clearSelected, true);
			target.addEventListener('d2l-labs-filter-dropdown-category-slotchange', this._update, true);
		}
		this._target = target;
	}

	_setOptions(categoryKey) {
		const result = this._getFilterOptions(categoryKey);
		if (categoryKey) {
			Object.assign(this._entries, result);
		} else {
			this._entries = result;
		}
	}

	_setSelectedOptions() {
		this._selectedEntries = [].concat(... Object.values(this._entries || {})).filter(x => x.selected);
	}

	_update(e) {
		this._setOptions(e && e.detail.categoryKey);
		this._setSelectedOptions();
	}
}

customElements.define('d2l-labs-applied-filters', D2lLabsAppliedFilters);
