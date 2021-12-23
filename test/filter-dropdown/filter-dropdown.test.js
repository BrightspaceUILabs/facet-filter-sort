
import '../../components/filter-dropdown/filter-dropdown.js';
import '../../components/filter-dropdown/filter-dropdown-category.js';
import '../../components/filter-dropdown/filter-dropdown-option.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const basic = html`
	<d2l-labs-filter-dropdown total-selected-option-count="3">
		<d2l-labs-filter-dropdown-category key="1" category-text="Category 1" selected-option-count="3">
			<d2l-labs-filter-dropdown-option selected text="Option 1 - 1" value="1"></d2l-labs-filter-dropdown-option>
			<d2l-labs-filter-dropdown-option text="Option 1 - 2" value="2"></d2l-labs-filter-dropdown-option>
			<d2l-labs-filter-dropdown-option selected text="Option 1 - 3" value="3"></d2l-labs-filter-dropdown-option>
			<d2l-labs-filter-dropdown-option selected text="Option 1 - 4" value="4"></d2l-labs-filter-dropdown-option>
			<d2l-labs-filter-dropdown-option text="Option 1 - 5" value="5"></d2l-labs-filter-dropdown-option>
			<d2l-labs-filter-dropdown-option text="Option 1 - 6" value="6"></d2l-labs-filter-dropdown-option>
		</d2l-labs-filter-dropdown-category>
		<d2l-labs-filter-dropdown-category key="2" category-text="Category 2" disable-search>
			<d2l-labs-filter-dropdown-option text="Option 2 - 1" value="1"></d2l-labs-filter-dropdown-option>
			<d2l-labs-filter-dropdown-option text="Option 2 - 2" value="2"></d2l-labs-filter-dropdown-option>
			<d2l-labs-filter-dropdown-option text="Option 2 - 3" value="3"></d2l-labs-filter-dropdown-option>
		</d2l-labs-filter-dropdown-category>
	</d2l-labs-filter-dropdown>`;

const textOverride = html`
	<d2l-labs-filter-dropdown total-selected-option-count="2" header-text="Send To" opener-text="Sending To None" opener-text-single="Sending To One" opener-text-multiple="Sending To Many">
		<d2l-labs-filter-dropdown-category key="1" category-text="Category 1" selected-option-count="2">
			<d2l-labs-filter-dropdown-option selected text="Option 1 - 1" value="1"></d2l-labs-filter-dropdown-option>
			<d2l-labs-filter-dropdown-option text="Option 1 - 2" value="2"></d2l-labs-filter-dropdown-option>
			<d2l-labs-filter-dropdown-option selected text="Option 1 - 3" value="3"></d2l-labs-filter-dropdown-option>
		</d2l-labs-filter-dropdown-category>
	</d2l-labs-filter-dropdown>`;

const textVariationDisabled = html`
	<d2l-labs-filter-dropdown total-selected-option-count="2" disable-opener-text-variation>
		<d2l-labs-filter-dropdown-category key="1" category-text="Category 1" selected-option-count="2">
			<d2l-labs-filter-dropdown-option selected text="Option 1 - 1" value="1"></d2l-labs-filter-dropdown-option>
			<d2l-labs-filter-dropdown-option text="Option 1 - 2" value="2"></d2l-labs-filter-dropdown-option>
			<d2l-labs-filter-dropdown-option selected text="Option 1 - 3" value="3"></d2l-labs-filter-dropdown-option>
		</d2l-labs-filter-dropdown-category>
	</d2l-labs-filter-dropdown>`;

describe('d2l-labs-filter-dropdown', () => {
	let filter;

	beforeEach(async() => {
		filter = await fixture(basic);
		await new Promise(resolve => requestAnimationFrame(resolve));
	});

	it('should construct', () => {
		runConstructor('d2l-labs-filter-dropdown');
	});
	it('instantiating the element works', () => {
		expect('d2l-labs-filter-dropdown').to.equal(filter.tagName.toLowerCase());
	});
	it('attributes are set correctly', () => {
		expect(filter.totalSelectedOptionCount).to.equal(3);
	});
	it('clear button is hidden if total selected count is 0, displayed otherwise', async() => {
		const clearButton = filter.shadowRoot.querySelector('d2l-button-subtle');
		expect(clearButton.hidden).to.be.false;

		filter.totalSelectedOptionCount = 0;
		await new Promise(resolve => requestAnimationFrame(resolve));

		expect(clearButton.hidden).to.be.true;
	});
	it('pressing the clear button triggers the d2l-labs-filter-dropdown-cleared event', async() => {
		const clearButton = filter.shadowRoot.querySelector('d2l-button-subtle');
		setTimeout(() => clearButton.click());
		await oneEvent(filter, 'd2l-labs-filter-dropdown-cleared');
	});
	it('closing the filter triggers the d2l-labs-filter-dropdown-close event', async() => {
		const dropdown = filter.shadowRoot.querySelector('d2l-dropdown-tabs');
		await dropdown.updateComplete;
		dropdown.toggleOpen();
		await dropdown.updateComplete;
		dropdown.toggleOpen();

		await oneEvent(filter, 'd2l-labs-filter-dropdown-close');
	});
	it('the opener text is set accordingly', () => {
		const openerButton = filter.shadowRoot.querySelector('d2l-dropdown-button-subtle');
		expect(openerButton.text).to.equal('Filter: 3 Filters');

		filter.totalSelectedOptionCount = 1;
		expect(openerButton.text).to.equal('Filter: 1 Filter');

		filter.totalSelectedOptionCount = 0;
		expect(openerButton.text).to.equal('Filter');
	});
	it('filter categories display correctly', async() => {
		const getTabs = async() => {
			const tabs = filter.shadowRoot.querySelector('d2l-tabs').shadowRoot.querySelectorAll('d2l-tab-internal');
			if (tabs.length === 2) {
				return tabs;
			} else {
				await new Promise(resolve => setTimeout(resolve, 25));
				return await getTabs();
			}
		};

		const tabs = await getTabs();
		expect(tabs[0].text).to.equal('Category 1 (3)');
		expect(tabs[1].text).to.equal('Category 2');
	});
	it('focussing the filter sets the focus on the opener button', () => {
		expect(filter.shadowRoot.activeElement).to.be.null;
		filter.focus();
		expect(filter.shadowRoot.activeElement.tagName.toLowerCase()).to.equal('d2l-dropdown-button-subtle');
	});
	it('the text values can be overridden', async() => {
		filter = await fixture(textOverride);
		const header = filter.shadowRoot.querySelector('.d2l-labs-filter-dropdown-content-header span');
		expect(header.innerText).to.equal('Send To');

		const openerButton = filter.shadowRoot.querySelector('d2l-dropdown-button-subtle');
		expect(openerButton.text).to.equal('Sending To Many');

		filter.totalSelectedOptionCount = 1;
		expect(openerButton.text).to.equal('Sending To One');

		filter.totalSelectedOptionCount = 0;
		expect(openerButton.text).to.equal('Sending To None');
	});

	it('the opener text variations can be disabled', async() => {
		filter = await fixture(textVariationDisabled);
		const openerButton = filter.shadowRoot.querySelector('d2l-dropdown-button-subtle');
		expect(openerButton.text).to.equal('Filter');

		filter.totalSelectedOptionCount = 1;
		expect(openerButton.text).to.equal('Filter');

		filter.totalSelectedOptionCount = 0;
		expect(openerButton.text).to.equal('Filter');
	});
});
