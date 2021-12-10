/* eslint sort-imports: ["error", {"allowSeparatedGroups": true}] */
import '@brightspace-ui-labs/multi-select/multi-select-list.js';
import '@brightspace-ui-labs/multi-select/multi-select-list-item.js';
import { LitElement, css, html } from 'lit-element';
import { FilterInfoSubscriberMixin } from '@brightspace-ui/core/components/filter/filter-info-subscriber-mixin.js';
import { LocalizeStaticMixin } from '@brightspace-ui/core/mixins/localize-static-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';

import ar from './lang/ar-sa.js';
import de from './lang/de.js';
import en from './lang/en.js';
import es from './lang/es.js';
import esMx from './lang/es-mx.js';
import fi from './lang/fi.js';
import fr from './lang/fr.js';
import frCa from './lang/fr-ca.js';
import ja from './lang/ja.js';
import ko from './lang/ko.js';
import nb from './lang/nb.js';
import nl from './lang/nl.js';
import pt from './lang/pt-br.js';
import sv from './lang/sv.js';
import tr from './lang/tr.js';
import zhCn from  './lang/zh-cn.js';
import zhTw from './lang/zh-tw.js';

const CLEAR_FILTERS_THRESHOLD = 4;

/**
 * A multi-select-list allowing the user to see (and remove) the currently applied filters.  Works with the new core filter.
 */
class D2lLabsAppliedCoreFilters extends RtlMixin(LocalizeStaticMixin(FilterInfoSubscriberMixin(LitElement))) {
	static get properties() {
		return {
			/**
			 * Optional: The text displayed in this component's label. Default: "Applied Filters:"
			 */
			labelText: { type: String, attribute: 'label-text' }
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
				margin-right: 0.25rem;
				display: inline-block;
				padding-top: 0.3rem;
				font-weight: bold;
			}

			:host([dir="rtl"]) .d2l-labs-applied-filters-label {
				margin-right: 0;
				margin-left: 0.25rem;
			}

			.d2l-labs-applied-filters-none-label {
				display: inline-block;
				padding-top: 0.3rem;
				font-style: italic;
				color: var(--d2l-color-corundum);
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

	static get resources() {
		return {
			'ar': ar,
			'de': de,
			'en': en,
			'es': es,
			'es-mx': esMx,
			'fi': fi,
			'fr': fr,
			'fr-ca': frCa,
			'ja': ja,
			'ko': ko,
			'nb': nb,
			'nl': nl,
			'pt': pt,
			'sv': sv,
			'tr': tr,
			'zh-cn': zhCn,
			'zh-tw': zhTw,
		};
	}

	constructor() {
		super();
		this.labelText = '';
	}

	render() {
		let numActiveFilters = 0;
		const allActiveFilters = Array.from(this._allActiveFilters);
		let filters = html`
			<d2l-labs-multi-select-list
				collapsable
				aria-labelledby="d2l-labs-applied-filters-label">
				${allActiveFilters.map(filter => Array.from(filter[1].values()).map(value => { numActiveFilters++; return html`
					<d2l-labs-multi-select-list-item
						text="${value.text}"
						deletable
						data-filter-id="${filter[0]}"
						data-value-key="${value.key}"
						@d2l-labs-multi-select-list-item-deleted="${this._multiSelectItemDeleted}">
					</d2l-labs-multi-select-list-item>
				`;}))}
			</d2l-labs-multi-select-list>
		`;
		if (numActiveFilters === 0) filters = html`<span class="d2l-labs-applied-filters-none-label d2l-body-compact">${this.localize('noActiveFilters')}</span>`;

		return html`
			<div class="d2l-labs-applied-filters-wrapper">
				<span id="d2l-labs-applied-filters-label" class="d2l-labs-applied-filters-label d2l-body-compact">${this.labelText || this.localize('appliedFilters')}</span>
				<div id="d2l-list-holder">
					${filters}
					<d2l-button-subtle id="d2l-clear-filters-button" text="${this.localize('clearFilters')}" ?hidden="${numActiveFilters < CLEAR_FILTERS_THRESHOLD}" @click="${this._clearFiltersClicked}"></d2l-button-subtle>
				</div>
			</div>
		`;
	}

	_clearFiltersClicked() {
		this._filters.registries.forEach((filter, index) => {
			if (index === 0) filter.focus();
			filter.requestFilterClearAll();
		});
	}

	_multiSelectItemDeleted(e) {
		const filterId = e.target.getAttribute('data-filter-id');
		const filter = this._filters.registries.find(filter => filter.id === filterId);
		filter.requestFilterValueClear(e.target.getAttribute('data-value-key'));

		announce(this.localize('filterRemoved', 'filterText', e.target.text));
	}

}

customElements.define('d2l-labs-applied-core-filters', D2lLabsAppliedCoreFilters);
