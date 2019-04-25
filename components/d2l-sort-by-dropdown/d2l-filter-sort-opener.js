import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import 'd2l-button/d2l-button-behavior.js';
import 'd2l-button/d2l-button-shared-styles.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-dropdown/d2l-dropdown-opener-behavior.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-polymer-behaviors/d2l-focusable-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-filter-sort-opener">
	<template strip-whitespace="">
		<style include="d2l-dropdown-opener-styles">
			:host {
				display: inline-block;

				--button-rtl: {
					left: 0;
					right: -0.6rem;
				};
				--content-icon-rtl: {
					padding-left: 1.2rem;
					padding-right: 0;
				};
				--icon-right-rtl: {
					left: 0.6rem;
					right: auto;
				};
			}

			button {
				background-color: transparent;
				border-color: transparent;
				color: var(--d2l-color-ferrite);
				font-family: inherit;
				padding: 0.5rem 0.6rem;
				position: relative;
				@apply --d2l-button-clear-focus;
				@apply --d2l-button-shared;
				@apply --d2l-label-text;
			}

			/* Firefox includes a hidden border which messes up button dimensions */
			button::-moz-focus-inner {
				border: 0;
			}
			button[disabled]:hover,
			button[disabled]:focus,
			:host([active]) button[disabled] {
				background-color: transparent;
			}

			button:hover,
			button:focus,
			button:hover d2l-icon,
			button:focus d2l-icon,
			button[aria-expanded="true"],
			button[aria-expanded="true"] d2l-icon,
			:host([active]) button {
				color: var(--d2l-color-celestine-minus-1);
			}

			button:hover,
			button[aria-expanded="true"] {
				border-color: var(--d2l-color-gypsum);
			}

			button[aria-expanded="false"]:focus {
				@apply --d2l-button-focus-plus-border;
			}

			button[aria-expanded="true"]:focus {
				@apply --d2l-button-clear-focus;
			}

			.d2l-filter-sort-opener-content {
				vertical-align: middle;
				padding-right: 1.2rem;
			}

			:host(:dir(rtl)) .d2l-filter-sort-opener-content {
				@apply --content-icon-rtl;
			}

			d2l-icon.d2l-filter-sort-opener-icon {
				height: 0.9rem;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 0.9rem;
				right: 0.6rem;
			}

			:host(:dir(rtl)) d2l-icon.d2l-filter-sort-opener-icon {
				@apply --icon-right-rtl;
			}

			button[disabled] {
				cursor: default;
				opacity: 0.5;
			}
		</style>
		<button
			aria-expanded$="[[ariaExpanded]]"
			aria-haspopup$="[[ariaHaspopup]]"
			aria-label$="[[ariaLabel]]"
			class="d2l-focusable d2l-filter-sort-opener-button"
			disabled$="[[disabled]]"
			autofocus$="[[autofocus]]"
			form$="[[form]]"
			formaction$="[[formaction]]"
			formenctype$="[[formenctype]]"
			formmethod$="[[formmethod]]"
			formnovalidate$="[[formnovalidate]]"
			formtarget$="[[formtarget]]"
			name$="[[name]]"
			type$="[[type]]">
			<span class="d2l-filter-sort-opener-content">[[text]]</span>
			<d2l-icon icon="d2l-tier1:chevron-down" class="d2l-filter-sort-opener-icon"></d2l-icon>
		</button>
		<slot></slot>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
/**
 * `<d2l-filter-sort-opener>`
 * Dropdown opener for D2L filter/sort components
 */
class FilterSortOpener extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.Button.Behavior,
		D2L.PolymerBehaviors.DropdownOpenerBehavior,
		D2L.PolymerBehaviors.FocusableBehavior
	],
	PolymerElement
) {
	static get is() { return 'd2l-filter-sort-opener'; }
	static get properties() {
		return {
			/**
			 * Text of the sort opener
			*/
			text: {
				type: String,
				value: '',
			},
		};
	}

	/**
	* Gets the opener element (required by d2l-dropdown behavior).
	*/
	getOpenerElement() {
		return this.shadowRoot.querySelector('.d2l-filter-sort-opener-button');
	}
}
customElements.define(FilterSortOpener.is, FilterSortOpener);
