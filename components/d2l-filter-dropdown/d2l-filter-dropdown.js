import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dropdown/dropdown-button-subtle.js';
import '@brightspace-ui/core/components/dropdown/dropdown-tabs.js';
import '@brightspace-ui/core/components/tabs/tabs.js';
import './d2l-filter-dropdown-localize-behavior.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

/**
 * A component containing filter options and emitting selection events
 * @slot - Contents of the dropdown, including filter categories and options
 * @slot footer - Dropdown footer contents
 * @fires d2l-filter-dropdown-cleared - Dispatched when the clear button is pressed to clear all filters
 * @fires d2l-filter-dropdown-close - Dispatched when the filter dropdown is closed
 */
class D2LFilterDropdown extends mixinBehaviors([D2L.PolymerBehaviors.FilterDropdown.LocalizeBehavior], PolymerElement) {
	static get properties() {
		return {
			/**
			 * Disables the dropdown opener
			 */
			disabled: {
				type: Boolean,
				value: false
			},
			/**
			 * Disables displaying different text for different number of selections, instead always displaying the term for no selections.
			 */
			disableOpenerTextVariation: {
				type: Boolean,
				value: false
			},
			/**
			 * Sets the text for the filter content header
			 */
			headerText: {
				type: String,
				value: ''
			},
			/**
			 * Sets the max-width of the filter dropdown
			 */
			maxWidth: {
				type: Number,
				value: 400
			},
			/**
			 * Sets the min-width of the filter dropdown
			 */
			minWidth: {
				type: Number,
				value: 25
			},
			/**
			 * Sets the text for the opener when there are no selections
			 */
			openerText: {
				type: String,
				value: ''
			},
			/**
			 * Sets the text for the opener when there are multiple selections
			 */
			openerTextMultiple: {
				type: String,
				value: ''
			},
			/**
			 * Sets the text for the opener when there is a single selection
			 */
			openerTextSingle: {
				type: String,
				value: ''
			},
			/**
			 * The total number of selected filter options across all categories.  When options are selected and de-selected, the consumer is responsible for updating this number after updating its own data store.
			 */
			totalSelectedOptionCount: {
				type: Number,
				value: 0
			},
			_hasFooter: {
				type: Boolean,
				value: false
			},
			noPaddingFooter: {
				type: Boolean,
				value: false
			}
		};
	}

	static get is() { return 'd2l-filter-dropdown'; }

	static get template() {
		return html`
			<style>
				.d2l-filter-dropdown-content-header {
					border-bottom: 1px solid var(--d2l-color-titanius);
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					padding: 1rem;
				}
				.d2l-filter-dropdown-content-header > span {
					align-self: center;
				}
				d2l-tabs {
					padding: 0 1rem;
				}
				[hidden] {
					display: none;
				}
			</style>
			<d2l-dropdown-button-subtle
				text="[[_getOpenerText(totalSelectedOptionCount, disableOpenerTextVariation, openerText, openerTextSingle, openerTextMultiple)]]"
				disabled="[[disabled]]">
				<d2l-dropdown-tabs
					min-width="[[minWidth]]"
					max-width="[[maxWidth]]"
					no-padding
					no-padding-footer$="[[noPaddingFooter]]"
					render-content>
					<div class="d2l-filter-dropdown-content-header">
						<span>[[_localizeOrAlt(headerText, 'filterBy')]]</span>
						<d2l-button-subtle text="[[localize('clear')]]" hidden$="[[!totalSelectedOptionCount]]" on-click="clearFilters"></d2l-button-subtle>
					</div>
					<d2l-tabs>
						<slot></slot>
					</d2l-tabs>
					<slot name="footer" slot="[[_getFooterSlotValue(_hasFooter)]]" on-slotchange="_handleFooterSlotChange"></slot>
				</d2l-dropdown-tabs>
			</d2l-dropdown-button-subtle>
		`;
	}

	attached()  {
		this.addEventListener('d2l-dropdown-close', this._handleDropdownClose);
		this.addEventListener('d2l-tab-panel-selected', this._stopTabPanelSelectedEvent);
	}

	clearFilters() {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-filter-dropdown-cleared',
				{
					composed: true,
					bubbles: true
				}
			)
		);
	}

	close() {
		this.shadowRoot.querySelector('d2l-dropdown-tabs').close();
	}

	detached() {
		this.removeEventListener('d2l-dropdown-close', this._handleDropdownClose);
		this.removeEventListener('d2l-tab-panel-selected', this._stopTabPanelSelectedEvent);
	}

	focus() {
		this.shadowRoot.querySelector('d2l-dropdown-button-subtle').focus();
	}

	_getFooterSlotValue(hasFooter) {
		return hasFooter ? 'footer' : undefined;
	}

	_getOpenerText(totalSelectedOptionCount, disableOpenerTextVariation, openerText, openerTextSingle, openerTextMultiple) {
		if (totalSelectedOptionCount === 0 || disableOpenerTextVariation) {
			return this._localizeOrAlt(openerText, 'filter');
		}
		if (totalSelectedOptionCount === 1) {
			return this._localizeOrAlt(openerTextSingle, 'filterSingle');
		}
		return this._localizeOrAlt(openerTextMultiple, 'filterMultiple', 'numOptions', totalSelectedOptionCount);
	}

	_handleDropdownClose(e) {
		e.stopPropagation();
		this.dispatchEvent(
			new CustomEvent(
				'd2l-filter-dropdown-close',
				{
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_handleFooterSlotChange(e) {
		this._hasFooter = e.target.assignedNodes().length !== 0;
	}

	_localizeOrAlt(altText, ...args) {
		return altText ? altText : this.localize(...args);
	}

	// Must be done here (instead of d2l-filter-dropdown-category) as the d2l-dropdown-tabs component needs to receive it
	_stopTabPanelSelectedEvent(e) {
		e.stopPropagation();
	}
}

window.customElements.define(D2LFilterDropdown.is, D2LFilterDropdown);
