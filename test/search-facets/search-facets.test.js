import './test-helper-functions.js';
import '../../components/search-facets/search-facets.js';
import '../../components/search-facets/search-facets-grouping.js';
import '../../components/search-facets/search-facets-option.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const basic = html`
	<d2l-labs-search-facets>
		<d2l-labs-search-facets-grouping id="grouping1" value="test-grouping1" text="Grouping 1">
			<d2l-labs-search-facets-option
				id="grouping1-option1"
				value="grouping1-option1"
				text="Grouping 1 Option 1"
				count="1"
			></d2l-labs-search-facets-option>
			<d2l-labs-search-facets-option
				id="grouping1-option2"
				value="grouping1-option2"
				text="Grouping 1 Option 2"
				count="2"
			></d2l-labs-search-facets-option>
		</d2l-labs-search-facets-grouping>
	</d2l-labs-search-facets>`;

describe('d2l-labs-search-facets', () => {

	it('should construct', () => {
		runConstructor('d2l-labs-search-facets');
	});

	describe('basic', () => {
		let basicFixture, grouping1, grouping1Option1, grouping1Option2;

		beforeEach(async() => {
			basicFixture = await fixture(basic);
			grouping1 = document.getElementById('grouping1');
			grouping1Option1 = document.getElementById('grouping1-option1');
			grouping1Option2 = document.getElementById('grouping1-option2');
		});

		it('should emit an event when an option is selected', async() => {
			setTimeout(() => selectOption(grouping1Option1));
			let e = await oneEvent(basicFixture, 'd2l-labs-search-facets-change');
			expect(e.detail).to.deep.equal({
				checked: true,
				option: grouping1Option1.value,
				grouping: grouping1.value,
			});

			setTimeout(() => selectOption(grouping1Option2));
			e = await oneEvent(basicFixture, 'd2l-labs-search-facets-change');
			expect(e.detail).to.deep.equal({
				checked: true,
				grouping: grouping1.value,
				option: grouping1Option2.value
			});
		});
	});
});
