import './test-helper-functions.js';
import '../../components/search-facets/search-facets-grouping.js';
import '../../components/search-facets/search-facets-option.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const basic = html`
	<d2l-labs-search-facets-grouping value="basic-grouping" text="Basic grouping">
		<d2l-labs-search-facets-option
			id="basic-option1"
			text="Basic Option 1"
			count="1"
		></d2l-labs-search-facets-option>
		<d2l-labs-search-facets-option
			id="basic-option2"
			text="Basic Option 2"
			count="2">
		</d2l-labs-search-facets-option>
	</d2l-labs-search-facets-grouping>`;

const hasMore = html`
	<d2l-labs-search-facets-grouping value="has-more-grouping" text="Hide after grouping" has-more>
		<d2l-labs-search-facets-option
			id="has-more-option1"
			value="has-more-option1"
			text="Initial Option 1"
			count="1"
		></d2l-labs-search-facets-option>
		<d2l-labs-search-facets-option
			id="has-more-option2"
			value="has-more-option2"
			text="Initial Option 2"
			count="2"
		></d2l-labs-search-facets-option>
	</d2l-labs-search-facets-grouping>`;

describe('d2l-labs-search-facets-grouping', () => {

	it('should construct', () => {
		runConstructor('d2l-labs-search-facets-grouping');
	});

	describe('basic', () => {
		let basicFixture;

		beforeEach(async() => {
			basicFixture = await fixture(basic);
		});

		it('should not display the "More" button', () => {
			const showMoreButton = basicFixture.shadowRoot.querySelector('button');
			expect(showMoreButton).to.be.null;
		});

		it('should emit an event when options are selected', async() => {
			const option1 = document.getElementById('basic-option1');
			setTimeout(() => selectOption(option1));

			const e = await oneEvent(basicFixture, 'd2l-labs-search-facets-grouping-change');
			expect(e.detail).to.deep.equal({
				grouping: basicFixture.value,
				option: option1.value,
				checked: true
			});
		});

	});

	describe('has-more', () => {
		let hasMoreFixture;

		beforeEach(async() => {
			hasMoreFixture = await fixture(hasMore);
		});

		it('should display the "More" button when has-more is true', () => {
			const showMoreButton = hasMoreFixture.shadowRoot.querySelector('button');
			expect(showMoreButton).to.not.be.null;
		});

		it('should fire an event when the "More" button is clicked', async() => {
			const showMoreButton = hasMoreFixture.shadowRoot.querySelector('button');
			setTimeout(() => showMoreButton.click());

			const e = await oneEvent(hasMoreFixture, 'd2l-labs-search-facets-grouping-has-more');
			expect(e.detail).to.deep.equal({ grouping: hasMoreFixture.value });
		});
	});

});
