import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import './d2l-search-results-count-localize-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-search-results-count">
	<template strip-whitespace="">
		<style>
			/*
			 * https://github.com/Polymer/tools/issues/408
			 * Empty style blocks break linter.
			 */
			:host {}
		</style>
		[[_text]]
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
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
	static get is() { return 'd2l-search-results-count'; }
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
