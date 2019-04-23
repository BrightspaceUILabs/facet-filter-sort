import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-dropdown/d2l-dropdown-button-subtle.js';
import 'd2l-dropdown/d2l-dropdown-tabs.js';
import 'd2l-button/d2l-button-subtle.js';
import 'd2l-tabs/d2l-tabs.js';
import 'd2l-colors/d2l-colors.js';
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
					margin: 0 -1rem;
					padding: 0 1rem 1rem 1rem;
				}
				.d2l-filter-dropdown-content-header > span {
					align-self: center;
				}
				[hidden] {
					display: none;
				}
			</style>
			<d2l-dropdown-button-subtle text="[[_getOpenerText(totalSelectedOptionCount)]]">
				<d2l-dropdown-tabs
					min-width="[[minWidth]]"
					max-width="[[maxWidth]]"
					render-content>
					<div class="d2l-filter-dropdown-content-header">
						<span>[[localize('filterBy')]]</span>
						<d2l-button-subtle text="[[localize('clear')]]" hidden$="[[!totalSelectedOptionCount]]" on-click="_clearFilters"></d2l-button-subtle>
					</div>
					<d2l-tabs>
						<slot></slot>
					</d2l-tabs>
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

	_getOpenerText(totalSelectedOptionCount) {
		if (totalSelectedOptionCount === 0) {
			return this.localize('filter');
		}
		if (totalSelectedOptionCount === 1) {
			return this.localize('filterSingle');
		}
		return this.localize('filterMultiple', 'numOptions', totalSelectedOptionCount);
	}
}

window.customElements.define(D2LFilterDropdown.is, D2LFilterDropdown);
