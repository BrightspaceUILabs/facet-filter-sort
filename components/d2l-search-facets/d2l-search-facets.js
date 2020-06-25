import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-search-facets">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
			}
		</style>
		<slot></slot>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
/**
 * Polymer-based web component for D2L search facets.
 * @fires d2l-search-facets-change - Dispatched when the search facets group changes
 */
class SearchFacets extends PolymerElement {
	static get is() { return 'd2l-search-facets'; }
	static get properties() {
		return {
			/**
			* Reference to bound listener functions to be removed in disconnectedCallback
			*/
			_boundListeners: {
				type: Object,
				value: function() {
					return {
						_onFacetGroupingChange: null,
					};
				}
			},
		};
	}

	connectedCallback() {
		super.connectedCallback();

		afterNextRender(this, function() {
			this._boundListeners._onFacetGroupingChange = this._onFacetGroupingChange.bind(this);
			this.addEventListener('d2l-search-facets-grouping-change',
				this._boundListeners._onFacetGroupingChange);
		}.bind(this));
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener('d2l-search-facets-grouping-change',
			this._boundListeners._onFacetGroupingChange);
	}

	_onFacetGroupingChange(e) {
		this.dispatchEvent(new CustomEvent('d2l-search-facets-change', {
			bubbles: true, composed: true, detail: e.detail
		}));
	}
}

customElements.define(SearchFacets.is, SearchFacets);
