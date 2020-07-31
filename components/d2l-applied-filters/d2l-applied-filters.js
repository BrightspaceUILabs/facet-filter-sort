import { LitElement, css, html } from 'lit-element';
import { LocalizeStaticMixin } from '@brightspace-ui/core/mixins/localize-static-mixin.js';

import '@brightspace-ui-labs/multi-select/multi-select-list';
import '@brightspace-ui-labs/multi-select/multi-select-list-item';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { getComposedChildren } from '@brightspace-ui/core/helpers/dom';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

const DROPDOWN_NAME = 'D2L-FILTER-DROPDOWN';
const DROPDOWN_CATEGORY_NAME = 'D2L-FILTER-DROPDOWN-CATEGORY';
const DROPDOWN_OPTION_NAME = 'D2L-FILTER-DROPDOWN-OPTION';
const CLEAR_FILTERS_THRESHOLD = 4;

/**
 * A multi-select-list allowing the user to see (and remove) the currently applied filters.
 */
class D2lAppliedFilters extends RtlMixin(LocalizeStaticMixin(LitElement)) {
	static get properties() {
		return {
			/**
			 * REQUIRED: The id of the "d2l-filter-dropdown" that you want to track
			 */
			for: { type: String },
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

			.d2l-applied-filters-wrapper {
				display: flex;
			}

			.d2l-applied-filters-applied-filters-label {
				margin-right: 0.25rem;
				display: inline-block;
				padding-top: 0.3rem;
				font-weight: bold;
			}

			:host([dir="rtl"]) .d2l-applied-filters-applied-filters-label {
				margin-right: 0;
				margin-left: 0.25rem;
			}

			.d2l-applied-filters-no-applied-filters-label {
				display: inline-block;
				padding-top: 0.3rem;
				font-style: italic;
				color: var(--d2l-color-corundum);
			}

			:host([hidden]) {
				display: none;
			}
		`];
	}

	static get resources() {
		return {
			'ar': {
			},
			'de': {
			},
			'en': {
				appliedFilters: 'Applied Filters:',
				noActiveFilters: 'No active filters',
				filterRemoved: 'Filter {filterText} removed',
				clearFilters: 'Clear filters'
			},
			'es': {
			},
			'fi': {
			},
			'fr': {
			},
			'ja': {
			},
			'ko': {
			},
			'nb': {
			},
			'nl': {
			},
			'pt': {
			},
			'sv': {
			},
			'tr': {
			},
			'zh': {
			},
			'zh-tw': {
			}
		};
	}

	constructor() {
		super();
		this._clearSelected = this._clearSelected.bind(this);
		this._getSelectedOptions = this._getSelectedOptions.bind(this);
		this._setSelectedOptions = this._setSelectedOptions.bind(this);
		this._update = this._update.bind(this);
		this._updateClearFiltersButton = this._updateClearFiltersButton.bind(this);

		this._updateClearFiltersButton();
	}

	firstUpdated() {
		this._update();
	}

	updated(changedProperties) {
		if (Object.keys(changedProperties).indexOf('for') > -1) {
			this._update();
		}
	}

	_update(e) {
		this._setOptions(e && e.detail.categoryKey);
		this._setSelectedOptions();
	}

	_filterOptionChanged() {
		this._setSelectedOptions();
	}

	_multiSelectItemDeleted(entry) {
		announce(this.localize('filterRemoved', 'filterText', entry.text));
		entry.deselect();
	}

	_findDropdownIfNested(target) {
		if (target.nodeName !== DROPDOWN_NAME) {
			const dropdownChildren = getComposedChildren(target);

			for (let i = 0; i < dropdownChildren.length; i++) {
				const child = dropdownChildren[i];
				if (child.nodeName === DROPDOWN_NAME) {
					return child;
				}
				const t = child.querySelector('d2l-filter-dropdown');
				if (t) {
					return t;
				}
			}
		}
		return target;
	}

	_setFilter() {
		if (!this.for) {
			return undefined;
		}
		if (this._target) {
			this._target.removeEventListener('d2l-filter-dropdown-option-change', this._setSelectedOptions, true);
			this._target.removeEventListener('d2l-filter-dropdown-option-change', this._updateClearFiltersButton, true);
			this._target.removeEventListener('d2l-filter-dropdown-cleared', this._updateClearFiltersButton, true);
			this._target.removeEventListener('d2l-filter-dropdown-cleared', this._clearSelected, true);
			this._target.removeEventListener('d2l-filter-dropdown-category-slotchange', this._update, true);
		}

		const ownerRoot = this.getRootNode();

		const targetSelector = `#${this.for}`;
		let target = ownerRoot.querySelector(targetSelector) || (ownerRoot && ownerRoot.host && ownerRoot.host.querySelector(targetSelector));

		if (target) {
			target = this._findDropdownIfNested(target);
			target.addEventListener('d2l-filter-dropdown-option-change', this._setSelectedOptions, true);
			target.addEventListener('d2l-filter-dropdown-option-change', this._updateClearFiltersButton, true);
			target.addEventListener('d2l-filter-dropdown-cleared', this._updateClearFiltersButton, true);
			target.addEventListener('d2l-filter-dropdown-cleared', this._clearSelected, true);
			target.addEventListener('d2l-filter-dropdown-category-slotchange', this._update, true);
		}
		this._target = target;
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

	_setOptions(categoryKey) {
		const result = this._getFilterOptions(categoryKey);
		if (categoryKey) {
			Object.assign(this._entries, result);
		} else {
			this._entries = result;
		}
	}

	_clearSelected() {
		this._selectedEntries = [];
	}

	_getSelectedOptions() {
		return [].concat.apply([], Object.values(this._entries || {})).filter(x => x.selected);
	}

	_setSelectedOptions() {
		this._selectedEntries = this._getSelectedOptions();
	}

	_updateClearFiltersButton() {
		this.hideClearFiltersButton = this._getSelectedOptions().length < CLEAR_FILTERS_THRESHOLD;
	}

	render() {
		const filters = this._selectedEntries && this._selectedEntries.length > 0 ?
			html`<d2l-labs-multi-select-list
				collapsable
				aria-labelledby="d2l-applied-filters-label"
			>
				${(this._selectedEntries || []).map((x, index) => html`
					<d2l-labs-multi-select-list-item
						text="${x.text}"
						deletable
						index="${index}"
						@d2l-labs-multi-select-list-item-deleted="${() => this._multiSelectItemDeleted(x)}"
					>
					</d2l-labs-multi-select-list-item>
				`)}
			</d2l-labs-multi-select-list>`
			: html`<span class="d2l-applied-filters-no-applied-filters-label d2l-body-compact">${this.localize('noActiveFilters')}</span>`;

		return html`
			<div class="d2l-applied-filters-wrapper">
				<span id="d2l-applied-filters-label" class="d2l-applied-filters-applied-filters-label d2l-body-compact">${this.localize('appliedFilters')}</span>
				${filters}
				<d2l-button-subtle text="${this.localize('clearFilters')}" ?hidden="${this.hideClearFiltersButton}"></d2l-button-subtle>
			</div>
		`;
	}
}

customElements.define('d2l-applied-filters', D2lAppliedFilters);
