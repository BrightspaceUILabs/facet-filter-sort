import '../../components/sort-by-dropdown/sort-by-dropdown-option.js';
import '../../components/sort-by-dropdown/sort-by-dropdown.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
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
		});

		it('should change to the selected option', async() => {
			setTimeout(() => option2.click());
			await oneEvent(basicFixture, 'd2l-labs-sort-by-dropdown-change');
			expect(basicFixture.getAttribute('value')).to.equal(option2.value);

			setTimeout(() => option1.click());
			await oneEvent(basicFixture, 'd2l-labs-sort-by-dropdown-change');
			expect(basicFixture.getAttribute('value')).to.equal(option1.value);
		});
	});
});
