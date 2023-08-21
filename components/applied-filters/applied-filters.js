import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui-labs/multi-select/multi-select-list.js';
import '@brightspace-ui-labs/multi-select/multi-select-list-item.js';
import { css, html, LitElement } from 'lit';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { FilterLocalizeMixin } from '../localize-mixin.js';
import { getComposedChildren } from '@brightspace-ui/core/helpers/dom.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

const DROPDOWN_NAME = 'D2L-LABS-FILTER-DROPDOWN';
const DROPDOWN_CATEGORY_NAME = 'D2L-LABS-FILTER-DROPDOWN-CATEGORY';
const DROPDOWN_OPTION_NAME = 'D2L-LABS-FILTER-DROPDOWN-OPTION';
const CLEAR_FILTERS_THRESHOLD = 4;

/**
 * A multi-select-list allowing the user to see (and remove) the currently applied filters.
 */
class D2lLabsAppliedFilters extends RtlMixin(FilterLocalizeMixin(LitElement)) {
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

			d2l-labs-multi-select-list {
				flex: 1;
			}

			.d2l-labs-applied-filters-wrapper {
				display: flex;
			}

			.d2l-labs-applied-filters-label {
				display: inline-block;
				font-weight: bold;
				margin-right: 0.25rem;
				padding-top: 0.3rem;
			}

			:host([dir="rtl"]) .d2l-labs-applied-filters-label {
				margin-left: 0.25rem;
				margin-right: 0;
			}

			.d2l-labs-applied-filters-none-label {
				color: var(--d2l-color-corundum);
				display: inline-block;
				font-style: italic;
				padding-top: 0.3rem;
			}

			#d2l-clear-filters-button {
				margin-left: 3px;
				margin-right: 3px;
			}

			#d2l-list-holder {
				flex: 1;
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
		const filters = this._selectedEntries && this._selectedEntries.length > 0 ?
			html`<d2l-labs-multi-select-list
				collapsable
				aria-labelledby="d2l-labs-applied-filters-label"
			>
				${(this._selectedEntries || []).map((x, index) => html`
					<d2l-labs-multi-select-list-item
						text="${x.text}"
						deletable
						index="${index}"
						@d2l-labs-multi-select-list-item-deleted="${this._multiSelectItemDeleted}"
					>
					</d2l-labs-multi-select-list-item>
				`)}
			</d2l-labs-multi-select-list>`
			: null;

		return html`
			<div class="d2l-labs-applied-filters-wrapper">
				<div id="d2l-list-holder">
					${filters}
					<d2l-button-subtle id="d2l-clear-filters-button" text="${this.localize('clearFilters')}" ?hidden="${this._selectedEntries.length < CLEAR_FILTERS_THRESHOLD}" @click="${this._clearFiltersClicked}"></d2l-button-subtle>
				</div>
			</div>
		`;
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

		announce(this.localize('allFiltersRemoved'));
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
		announce(this.localize('filterRemoved', 'filterText', e.target.text));
		this._selectedEntries[e.target.getAttribute('index')].deselect();
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
