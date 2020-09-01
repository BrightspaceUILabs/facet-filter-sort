import './d2l-search-results-count-localize-behavior.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

/**
 * `<d2l-search-results-count>`
 * Polymer-based web component for D2L search result
 */
class SearchResultsCount extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.SearchResultsCount.LocalizeBehavior
	],
	PolymerElement
) {
	static get properties() {
		return {
			/**
			* Displayed text
			*/
			_text: {
				type: String,
				value: ''
			},
			/**
			* Range start
			*/
			rangeStart: {
				type: Number
			},
			/**
			* Range end
			 */
			rangeEnd: {
				type: Number
			},
			/**
			* Total count
			*/
			totalCount: {
				type: Number,
				value: 0
			},
			/**
			* Search query
			*/
			query: {
				type: String,
				value: ''
			}
		};
	}

	static get is() { return 'd2l-search-results-count'; }

	static get template() {
		return html`
			[[_text]]
        `;
	}

	connectedCallback() {
		super.connectedCallback();
		if (this.rangeStart && this.rangeEnd) {
			this._text = this.query
				? this.localize('searchPagedResultsForQuery',
					'rangeStart', this.rangeStart, 'rangeEnd', this.rangeEnd, 'totalCount', this.totalCount, 'query', this.query)
				: this.localize('searchPagedResults',
					'rangeStart', this.rangeStart, 'rangeEnd', this.rangeEnd, 'totalCount', this.totalCount);
		} else {
			this._text = this.query
				? this.localize('searchResultsForQuery', 'totalCount', this.totalCount, 'query', this.query)
				: this.localize('searchResults', 'totalCount', this.totalCount);
		}
	}
}
customElements.define(SearchResultsCount.is, SearchResultsCount);
