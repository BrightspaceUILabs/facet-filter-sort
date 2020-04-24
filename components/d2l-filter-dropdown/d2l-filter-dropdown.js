import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dropdown/dropdown-button-subtle.js';
import '@brightspace-ui/core/components/dropdown/dropdown-tabs.js';
import '@brightspace-ui/core/components/tabs/tabs.js';
import './d2l-filter-dropdown-localize-behavior.js';

/**
 * @customElement
 * @polymer
 */

class D2LFilterDropdown extends mixinBehaviors([D2L.PolymerBehaviors.FilterDropdown.LocalizeBehavior], PolymerElement) {
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
						<d2l-button-subtle text="[[localize('clear')]]" hidden$="[[!totalSelectedOptionCount]]" on-click="_clearFilters"></d2l-button-subtle>
					</div>
					<d2l-tabs>
						<slot></slot>
					</d2l-tabs>
					<slot name="footer" slot="[[_getFooterSlotValue(_hasFooter)]]" on-slotchange="_handleFooterSlotChange"></slot>
				</d2l-dropdown-tabs>
			</d2l-dropdown-button-subtle>
		`;
	}
	static get is() { return 'd2l-filter-dropdown'; }
	static get properties() {
		return {
			minWidth: {
				type: Number,
				value: 25
			},
			maxWidth: {
				type: Number,
				value: 400
			},
			totalSelectedOptionCount: {
				type: Number,
				value: 0
			},
			headerText: {
				type: String,
				value: ''
			},
			openerText: {
				type: String,
				value: ''
			},
			openerTextSingle: {
				type: String,
				value: ''
			},
			openerTextMultiple: {
				type: String,
				value: ''
			},
			disableOpenerTextVariation: {
				type: Boolean,
				value: false
			},
			disabled: {
				type: Boolean,
				value: false
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

	attached()  {
		this.addEventListener('d2l-dropdown-close', this._handleDropdownClose);
	}

	detached() {
		this.removeEventListener('d2l-dropdown-close', this._handleDropdownClose);
	}

	_clearFilters() {
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

	_localizeOrAlt(altText, ...args) {
		return altText ? altText : this.localize(...args);
	}

	focus() {
		this.shadowRoot.querySelector('d2l-dropdown-button-subtle').focus();
	}

	close() {
		this.shadowRoot.querySelector('d2l-dropdown-tabs').close();
	}
}

window.customElements.define(D2LFilterDropdown.is, D2LFilterDropdown);
