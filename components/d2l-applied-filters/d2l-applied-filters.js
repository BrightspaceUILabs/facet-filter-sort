import { LitElement, css, html } from 'lit-element';
import { LocalizeStaticMixin } from '@brightspace-ui/core/mixins/localize-static-mixin.js';

import '@brightspace-ui-labs/multi-select/multi-select-list';
import '@brightspace-ui-labs/multi-select/multi-select-list-item';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { getComposedChildren } from '@brightspace-ui/core/helpers/dom';

const DROPDOWN_NAME = 'D2L-FILTER-DROPDOWN';
const DROPDOWN_CATEGORY_NAME = 'D2L-FILTER-DROPDOWN-CATEGORY';
const DROPDOWN_OPTION_NAME = 'D2L-FILTER-DROPDOWN-OPTION';

class D2lAppliedFilters extends LocalizeStaticMixin(LitElement) {
	static get properties() {
		return {
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

			.d2l-applied-filters-no-applied-filters-label {
				display: inline-block;
				padding-top: 0.3rem;
				font-style: italic;
				color: var(--d2l-color-corundum);
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
				noActiveFilters: 'No active filters'
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
		this._setSelectedOptions = this._setSelectedOptions.bind(this);
	}

	firstUpdated() {
		this._update();
	}

	updated(changedProperties) {
		if (Object.keys(changedProperties).indexOf('for') > -1) {
			this._update();
		}
	}

	_update() {
		this._setOptions();
		this._setSelectedOptions();
	}

	_filterOptionChanged() {
		this._setSelectedOptions();
	}

	_multiSelectItemDeleted(e) {
		const entryIndex = Number.parseInt(e.path[0].attributes.index.value);
		const entry = this._selectedEntries[entryIndex];
		entry.dispatchEvent(new CustomEvent('d2l-menu-item-select'));
	}

	_setFilter() {
		console.log('SETTING FILTER', this.for);
		if (!this.for) {
			return undefined;
		}
		if (this._target) {
			this._target.removeEventListener('d2l-filter-dropdown-option-change', this._setSelectedOptions);
		}

		const ownerRoot = this.getRootNode();

		const targetSelector = `#${this.for}`;
		const target = ownerRoot.querySelector(targetSelector) || (ownerRoot && ownerRoot.host && ownerRoot.host.querySelector(targetSelector));

		if (target) {
			target.addEventListener('d2l-filter-dropdown-option-change', this._setSelectedOptions);
		}
		this._target = target;
	}

	_getFilterOptions() {
		this._setFilter();
		const dropdown = this._target;
		console.log('DROPDOWN', dropdown, getComposedChildren(dropdown));

		if (!dropdown) {
			return [];
		}

		// Go down one layer if the "for" was for the container of the dropdown
		let children = dropdown.children;
		const composedChildren = getComposedChildren(dropdown);
		const dropdownChildren = composedChildren.filter(x => x.nodeName === DROPDOWN_NAME);
		if (dropdownChildren && dropdownChildren[0]) {
			console.log('xyz', dropdownChildren.map(x => x.nodeName));
			children = dropdownChildren[0].children;
		}

		console.log('CHILDREN', children);
		const results = {};
		[...children]
			.filter(x => x.nodeName === DROPDOWN_CATEGORY_NAME)
			.forEach(x => results[x.key] = [...x.children].filter(x => x.nodeName === DROPDOWN_OPTION_NAME));

		console.log('RESULTS', results);
		return results;
	}

	_setOptions() {
		this._entries = this._getFilterOptions();
	}

	_setSelectedOptions() {
		this._selectedEntries = [].concat.apply([], Object.values(this._entries || {})).filter(x => x.selected);
	}

	render() {
		const filters = this._selectedEntries && this._selectedEntries.length > 0 ?
			html`<d2l-labs-multi-select-list
				collapsable
				@d2l-labs-multi-select-list-item-deleted="${this._multiSelectItemDeleted}"
			>
				${(this._selectedEntries || []).map((x, index) => html`
					<d2l-labs-multi-select-list-item
						text="${x.text}"
						deletable
						index="${index}"
					>
					</d2l-labs-multi-select-list-item>
				`)}
			</d2l-labs-multi-select-list>`
			: html`<span class="d2l-applied-filters-no-applied-filters-label d2l-body-compact">${this.localize('noActiveFilters')}</span>`;

		return html`
			<div class="d2l-applied-filters-wrapper">
				<span class="d2l-applied-filters-applied-filters-label d2l-body-compact">${this.localize('appliedFilters')}</span>
				${filters}
			</div>
		`;
	}
}

customElements.define('d2l-applied-filters', D2lAppliedFilters);
