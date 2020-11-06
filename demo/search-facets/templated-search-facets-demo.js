import '../../components/search-facets/search-facets.js';
import '../../components/search-facets/search-facets-grouping.js';
import '../../components/search-facets/search-facets-option.js';
import { html, LitElement } from 'lit-element';

/**
 * An example of templated search facets. The data can potentially be retrieved from an
 * external source, and given to the search-facets to handle.
**/
class TemplatedSearchFacetsDemo extends LitElement {
	static get properties() {
		return {
			searchFacets: { type: Array }
		};
	}

	constructor() {
		super();
		this.searchFacets = [];
	}

	connectedCallback() {
		super.connectedCallback();
		this.searchFacets = [
			{
				name: 'My Status',
				value: 'status',
				options: [
					{ name: 'My Courses', value: 'my-courses', count: 21 },
					{ name: 'On My List', value: 'my-list', count: 1 },
					{ name: 'In Progress', value: 'in-progress', count: 1 },
					{ name: 'Complete', value: 'complete', count: 10 },
				],
			},
			{
				name: 'Rating',
				value: 'rating',
				options: [
					{ name: 'Excellent', value: 'excellent', count: 1000, checked: true },
					{ name: 'Good', value: 'good', count: 100 },
					{ name: 'Poor', value: 'poor', count: 10 },
				],
			},
			{
				name: 'Format',
				value: 'format',
				options: [
					{ name: 'Online', value: 'online', count: 1000 },
					{ name: 'In-Class', value: 'in-class', count: 1 },
				]
			},
		];
	}

	render() {
		return html`
			<d2l-search-facets>
				${this.searchFacets.map(item => html`
					<d2l-search-facets-grouping value="${item.value}" text="${item.name}">
						${item.options.map(searchFacet => html`
							<d2l-search-facets-option
								value="${searchFacet.value}" text="${searchFacet.name}" count="${searchFacet.count}" ?checked="${searchFacet.checked}">
							</d2l-search-facets-option>
						`)}
					</d2l-search-facets-grouping>
				`)}
			</d2l-search-facets>
		`;
	}
}

customElements.define('d2l-labs-templated-search-facets-demo', TemplatedSearchFacetsDemo);
