import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/inputs/input-checkbox-spacer.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './d2l-search-facets-localize-behavior.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

/**
 * A grouping of search facet options that keeps tracks of selected options
 * @slot - Contains the search facets in the group
 * @fires d2l-search-facets-grouping-change - Dispatched when the search group changes
 * @fires d2l-search-facets-grouping-has-more - Dispatched when the more button is clicked
 */
class SearchFacetsGrouping extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.SearchFacets.LocalizeBehavior
	],
	PolymerElement
) {
	static get properties() {
		return {
			/**
			* Reference to bound listener functions to be removed in disconnectedCallback
			*/
			_boundListeners: {
				type: Object,
				value: function() {
					return {
						_onFacetOptionChange: null
					};
				}
			},
			/**
			* Indicates whether this grouping has more options to be added later. Controls
			* the visibility of the 'More' button
			*/
			hasMore: {
				type: Boolean,
				value: false
			},
			/**
			* The name of the grouping
			*/
			text: {
				type: String,
				value: ''
			},
			/**
			* The value of the grouping name
			*/
			value: {
				type: String,
				value: ''
			},
		};
	}

	static get is() { return 'd2l-search-facets-grouping'; }

	static get template() {
		return html`
			<style>
				:host {
					display: block;
				}

				.d2l-search-facets-grouping-fieldset {
					border: none;
					margin: 0;
					padding: 0;
				}

				.d2l-search-facets-grouping-legend {
					@apply --d2l-body-compact-text;
					font-weight: bold;
					margin-bottom: 0.4rem;
					padding: 0;
				}

				.d2l-search-facets-grouping-show-more > button {
					@apply --d2l-body-compact-text;
					border: none;
					color: var(--d2l-color-celestine);
					font-family: inherit;
					outline: none;
					padding: 0;
				}

				.d2l-search-facets-grouping-show-more > button:hover,
				.d2l-search-facets-grouping-show-more > button:focus {
					cursor: pointer;
					font-weight: bold;
				}

			</style>
			<fieldset class="d2l-search-facets-grouping-fieldset">
				<legend class="d2l-search-facets-grouping-legend">[[text]]</legend>
				<slot></slot>
				<template is="dom-if" if="[[hasMore]]">
					<d2l-input-checkbox-spacer class="d2l-search-facets-grouping-show-more">
						<button on-click="_onMoreClicked">[[localize('more')]]</button>
					</d2l-input-checkbox-spacer>
				</template>
			</fieldset>
        `;
	}

	connectedCallback() {
		super.connectedCallback();

		afterNextRender(this, () => {
			this._boundListeners._onFacetOptionChange = this._onFacetOptionChange.bind(this);

			this.addEventListener('d2l-search-facets-option-change',
				this._boundListeners._onFacetOptionChange);
		});
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('d2l-search-facets-option-change',
			this._boundListeners._onFacetOptionChange);
	}

	_onFacetOptionChange(e) {
		this.dispatchEvent(new CustomEvent('d2l-search-facets-grouping-change', {
			bubbles: true,
			composed: true,
			detail: Object.assign({}, e.detail, { grouping: this.value })
		}));
	}

	_onMoreClicked() {
		this.dispatchEvent(new CustomEvent('d2l-search-facets-grouping-has-more', {
			bubbles: true,
			composed: true,
			detail: { grouping: this.value }
		}));
	}
}

customElements.define(SearchFacetsGrouping.is, SearchFacetsGrouping);
