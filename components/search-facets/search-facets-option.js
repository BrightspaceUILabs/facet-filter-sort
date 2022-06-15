import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/localize-behavior/d2l-localize-behavior.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

/**
 * Search facet option, with a count to display the number of results
 * @fires d2l-labs-search-facets-option-change - Dispatched when the checked value of an option changes
 */
class LabsSearchFacetsOption extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.LocalizeBehavior
	],
	PolymerElement
) {
	static get properties() {
		return {
			/**
			* The text displayed for this option. Adds the count next to the text if present
			*/
			_facetText: {
				type: String,
				value: '',
				computed: '_getFacetText(text, count)'
			},
			/**
			* Whether the option is selected or not. This property matches the value of
			* the d2l-input-checkbox
			*/
			checked: {
				type: Boolean,
				reflectToAttribute: true
			},
			/**
			* The number of search results for this option
			*/
			count: {
				type: Number
			},
			/**
			* Whether this option should be disabled
			*/
			disabled: {
				type: Boolean,
				reflectToAttribute: true,
				value: false
			},
			/**
			* The text for this option
			*/
			text: {
				type: String,
				value: ''
			},
			/**
			* The value of this option
			*/
			value: {
				type: String,
				value: ''
			},
		};
	}

	static get is() { return 'd2l-labs-search-facets-option'; }

	static get template() {
		return html`
			<style>
				:host {
					display: block;
				}
			</style>
			<d2l-input-checkbox checked="[[checked]]" disabled="[[disabled]]" name="[[text]]" on-change="_handleChange" class="d2l-labs-search-facets-option-checkbox">[[_facetText]]</d2l-input-checkbox>
        `;
	}

	_getFacetText(text, count) {
		if (count) {
			return document.dir === 'rtl'
				? `(${this.formatNumber(count)}) ${text}`
				: `${text} (${this.formatNumber(count)})`;
		}
		return text;
	}

	_handleChange(e) {
		this.dispatchEvent(new CustomEvent('d2l-labs-search-facets-option-change', {
			bubbles: true,
			composed: true,
			detail: { checked: e.target.checked, option: this.value }
		}));
	}

}
customElements.define(LabsSearchFacetsOption.is, LabsSearchFacetsOption);
