import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

/**
 * Polymer-based web component for D2L search facets.
 * @fires d2l-labs-search-facets-change - Dispatched when the search facets group changes
 */
class LabsSearchFacets extends PolymerElement {
	static get properties() {
		return {
			/**
			* Reference to bound listener functions to be removed in disconnectedCallback
			*/
			_boundListeners: {
				type: Object,
				value: function() {
					return {
						_onFacetGroupingChange: null
					};
				}
			},
		};
	}

	static get is() { return 'd2l-labs-search-facets'; }

	static get template() {
		return html`
			<style>
				:host {
					display: block;
				}
			</style>
			<slot></slot>
        `;
	}

	connectedCallback() {
		super.connectedCallback();

		afterNextRender(this, () => {
			this._boundListeners._onFacetGroupingChange = this._onFacetGroupingChange.bind(this);
			this.addEventListener('d2l-labs-search-facets-grouping-change',
				this._boundListeners._onFacetGroupingChange);
		});
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		this.removeEventListener('d2l-labs-search-facets-grouping-change',
			this._boundListeners._onFacetGroupingChange);
	}

	_onFacetGroupingChange(e) {
		this.dispatchEvent(new CustomEvent('d2l-labs-search-facets-change', {
			bubbles: true, composed: true, detail: e.detail
		}));
	}
}

customElements.define(LabsSearchFacets.is, LabsSearchFacets);
