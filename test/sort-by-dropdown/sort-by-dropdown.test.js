import '../../components/sort-by-dropdown/sort-by-dropdown-option.js';
import '../../components/sort-by-dropdown/sort-by-dropdown.js';
import { clickElem, expect, fixture, html, oneEvent } from '@brightspace-ui/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const basic = html`
	<d2l-labs-sort-by-dropdown label="Sort by test">
		<d2l-labs-sort-by-dropdown-option id="option1" value="option1" text="Option 1"></d2l-labs-sort-by-dropdown-option>
		<d2l-labs-sort-by-dropdown-option id="option2" value="option2" text="Option 2"></d2l-labs-sort-by-dropdown-option>
	</d2l-labs-sort-by-dropdown>`;

describe('d2l-labs-sort-by-dropdown', () => {

	it('should construct', () => {
		runConstructor('d2l-labs-sort-by-dropdown');
		runConstructor('d2l-labs-sort-by-dropdown-option');
	});

	describe('basic', () => {
		let basicFixture, option1, option2;

		beforeEach(async() => {
			basicFixture = await fixture(basic);
			option1 = basicFixture.querySelector('#option1');
			option2 = basicFixture.querySelector('#option2');
			await new Promise(resolve => setTimeout(resolve));
		});

		it('should initially select the first option by default', () => {
			expect(basicFixture.value).to.equal('option1');
			expect(basicFixture._selectedOptionText).to.equal('Sort: Option 1');
		});

		it('should change to the selected option', async() => {
			await clickElem(basicFixture);
			clickElem(option2);
			await oneEvent(basicFixture, 'd2l-labs-sort-by-dropdown-change');
			expect(basicFixture.getAttribute('value')).to.equal(option2.value);

			await oneEvent(basicFixture, 'd2l-dropdown-close');

			await clickElem(basicFixture);
			clickElem(option1);
			await oneEvent(basicFixture, 'd2l-labs-sort-by-dropdown-change');
			expect(basicFixture.getAttribute('value')).to.equal(option1.value);
		});
	});
});
