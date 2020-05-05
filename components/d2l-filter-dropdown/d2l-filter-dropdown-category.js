import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import '@brightspace-ui/core/components/menu/menu.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { LocalizeStaticMixin } from '@brightspace-ui/core/mixins/localize-static-mixin.js';
import { TabPanelMixin } from '@brightspace-ui/core/components/tabs/tab-panel-mixin.js';

class FilterDropdownCategory extends LocalizeStaticMixin(TabPanelMixin(LitElement)) {

	static get properties() {
		return {
			categoryText: { type: String, attribute: 'category-text' },
			disableSearch: { type: Boolean, attribute: 'disable-search' },
			key: { type: String },
			searchValue: { type: String, attribute: 'search-value' },
			selectedOptionCount: { type: Number, attribute: 'selected-option-count' }
		};
	}

	static get styles() {
		return [super.styles, css`
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
		`];
	}

	static get resources() {
		return {
			'ar': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: 'البحث عن {category}'
			},
			'de': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: 'Nach {category} suchen'
			},
			'en': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: 'Search by {category}'
			},
			'es': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: 'Buscar por {category}'
			},
			'fi': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: 'Hakuperuste {category}'
			},
			'fr': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: 'Recherche par {category}'
			},
			'ja': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: '{category} で検索'
			},
			'ko': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: '{category} 필터로 검색'
			},
			'nb': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: 'Søk etter {category}'
			},
			'nl': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: 'Zoeken op {category}'
			},
			'pt': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: 'Pesquisar por {category}'
			},
			'sv': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: 'Sök per {category}'
			},
			'tr': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: '{category} Kullanarak Ara'
			},
			'zh': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: '按 {category} 搜索'
			},
			'zh-tw': {
				categoryTitleMultiple: '{title} ({numSelected})',
				searchBy: '依 {category} 搜尋'
			}
		};
	}

	constructor() {
		super();
		this.categoryText = '';
		this.disableSearch = false;
		this.key = '';
		this.selectedOptionCount = 0;
	}

	get categoryText() {
		return this._categoryText;
	}

	set categoryText(val) {
		const oldVal = this._categoryText;
		if (oldVal !== val) {
			this._categoryText = val;
			this.requestUpdate().then(() => {
				this._updateTabText(this._categoryText, this.selectedOptionCount);
			});
		}
	}

	get selectedOptionCount() {
		return this._selectedOptionCount;
	}

	set selectedOptionCount(val) {
		const oldVal = this._selectedOptionCount;
		if (oldVal !== val) {
			this._selectedOptionCount = val;
			this.requestUpdate().then(() => {
				this._updateTabText(this.categoryText, this._selectedOptionCount);
			});
		}
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);
		this.addEventListener('d2l-menu-item-select', (e) => {
			this.selected = !this.selected;
			this.__onSelect(e);
		});
	}

	_onSlotChange() {
		this.dispatchEvent(new CustomEvent('d2l-filter-dropdown-category-slotchange', { bubbles: true, composed: true, detail: { categoryKey: this.key } }));
	}

	render() {
		return html`
			<div class="d2l-filter-dropdown-page-search" ?hidden="${this.disableSearch}">
				<d2l-input-search @d2l-input-search-searched="${this._handleSearchChange}"
					placeholder="${this.localize('searchBy', 'category', this.categoryText)}"
					value="${ifDefined(this.searchValue)}">
				</d2l-input-search>
			</div>
			<d2l-menu @d2l-menu-item-change="${this._handleMenuItemChange}" label="${this.text}">
				<slot @slotchange="${this._onSlotChange}"></slot>
			</d2l-menu>
		`;
	}

	_dispatchSelected() {
		super._dispatchSelected();
		this.dispatchEvent(new CustomEvent('d2l-filter-dropdown-category-selected', {
			detail: {
				categoryKey: this.key
			},
			bubbles: true,
			composed: true
		}));
	}

	_handleMenuItemChange(e) {
		e.stopPropagation();
		this.dispatchEvent(new CustomEvent('d2l-filter-dropdown-option-change', {
			detail: {
				categoryKey: this.key,
				menuItemKey: e.detail.value,
				selected: e.detail.selected
			},
			composed: true,
			bubbles: true
		}));
	}

	_handleSearchChange(e) {
		e.stopPropagation();
		this.dispatchEvent(new CustomEvent('d2l-filter-dropdown-category-searched', {
			detail: {
				categoryKey: this.key,
				value: e.detail.value
			},
			composed: true,
			bubbles: true
		}));
	}

	_updateTabText(categoryText, selectedOptionCount) {
		if (selectedOptionCount === 0) {
			this.setAttribute('text', categoryText);
		} else {
			this.setAttribute('text', this.localize('categoryTitleMultiple', 'title', categoryText, 'numSelected', selectedOptionCount));
		}
	}

}

customElements.define('d2l-filter-dropdown-category', FilterDropdownCategory);
