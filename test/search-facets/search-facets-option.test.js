import './test-helper-functions.js';
import '../../components/search-facets/search-facets-option.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const basic = html`
	<d2l-labs-search-facets-option
		count="1"
		id="basic-option"
		text="Basic Option"
		value="basic-option"
	></d2l-labs-search-facets-option>`;

const noCount = html`
	<d2l-labs-search-facets-option
		id="no-count-option"
		text="No count option"
		value="no-count-option"
	></d2l-labs-search-facets-option>`;

describe('d2l-labs-search-facets-option', () => {

	it('should construct', () => {
		runConstructor('d2l-labs-search-facets-option');
	});

	describe('basic', () => {
		let basicFixture, option;

		beforeEach(async() => {
			basicFixture = await fixture(basic);
			option = document.getElementById('basic-option');
		});

		it('should emit an event when selected', async() => {
			setTimeout(() => selectOption(basicFixture));
			const e = await oneEvent(basicFixture, 'd2l-labs-search-facets-option-change');
			expect(e.detail).to.deep.equal({ option: option.value, checked: true });
		});

		it('should show the text along with the count', () => {
			const text = option.shadowRoot.querySelector('d2l-input-checkbox').innerHTML;
			expect(text).to.equal(`${option.text} (${option.count})`);
		});
	});

	describe('no-count', () => {
		let noCountFixture;

		beforeEach(async() => {
			noCountFixture = await fixture(noCount);
		});

		it('should not display the count if it is not present', () => {
			const text = noCountFixture.shadowRoot.querySelector('d2l-input-checkbox').innerHTML;
			expect(noCountFixture.count).to.be.undefined;
			expect(text).to.equal(noCountFixture.text);
		});

	});
});
