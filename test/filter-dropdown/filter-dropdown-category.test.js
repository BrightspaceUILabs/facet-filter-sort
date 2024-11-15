
import '@brightspace-ui/core/components/tabs/tabs.js';
import '../../components/filter-dropdown/filter-dropdown-category.js';
import '../../components/filter-dropdown/filter-dropdown-option.js';
import { expect, fixture, html, oneEvent } from '@brightspace-ui/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const basic = html`
	<d2l-tabs>
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
	</d2l-tabs>`;

describe('d2l-labs-filter-dropdown-category', () => {
	let container;
	let categories = [];

	beforeEach(async() => {
		container = await fixture(basic);
		categories = container.querySelectorAll('d2l-labs-filter-dropdown-category');
	});

	it('should construct', () => {
		runConstructor('d2l-labs-filter-dropdown-category');
	});
	it('instantiating the element works', () => {
		expect('d2l-labs-filter-dropdown-category').to.equal(categories[0].tagName.toLowerCase());
	});
	it('attributes are set correctly (including d2l-tab-panel attributes)', async() => {
		await categories[0].updateComplete;
		await categories[1].updateComplete;
		expect(categories[0].key).to.equal('1');
		expect(categories[0].getAttribute('role')).to.equal('tabpanel');

		expect(categories[1].key).to.equal('2');
		expect(categories[1].getAttribute('role')).to.equal('tabpanel');
	});
	it('tab text is set properly', async() => {
		await categories[0].updateComplete;
		await categories[1].updateComplete;
		expect(categories[0].selectedOptionCount).to.equal(3);
		expect(categories[0].categoryText).to.equal('Category 1');
		expect(categories[0].text).to.equal('Category 1 (3)');

		expect(categories[1].selectedOptionCount).to.equal(0);
		expect(categories[1].categoryText).to.equal('Category 2');
		expect(categories[1].text).to.equal('Category 2');
	});
	it('search input is hidden if disable-search attribute is present', async() => {
		await categories[0].updateComplete;
		await categories[1].updateComplete;
		expect(categories[0].disableSearch).to.equal(false);
		let searchInput = categories[0].shadowRoot.querySelector('.d2l-labs-filter-dropdown-page-search');
		expect(searchInput.hidden).to.equal(false);

		expect(categories[1].disableSearch).to.equal(true);
		searchInput = categories[1].shadowRoot.querySelector('.d2l-labs-filter-dropdown-page-search');
		expect(searchInput.hidden).to.equal(true);
	});
	it('setting the search-value attribute updates the value in the search input', async() => {
		categories[0].searchValue = 'test';
		await categories[0].updateComplete;

		const searchInput = categories[0].shadowRoot.querySelector('d2l-input-search');
		expect(searchInput.value).to.equal('test');

	});
	it('searching triggers the d2l-labs-filter-dropdown-category-searched event and updates the searchValue property', async() => {
		await categories[0].updateComplete;
		categories[0].shadowRoot.querySelector('d2l-input-search').value = 'test';
		setTimeout(() => categories[0].shadowRoot.querySelector('d2l-input-search').search());

		const e = await oneEvent(container, 'd2l-labs-filter-dropdown-category-searched');
		expect(e.detail.categoryKey).to.equal('1');
		expect(e.detail.value).to.equal('test');
		expect(categories[0].searchValue).to.equal('test');
	});
	it('changing the category tab triggers the d2l-labs-filter-dropdown-category-selected event', async() => {
		setTimeout(() => categories[1].selected = true);
		const e = await oneEvent(container, 'd2l-labs-filter-dropdown-category-selected');
		expect(e.detail.categoryKey).to.equal('2');
	});
	it('selecting a menu option triggers the d2l-labs-filter-dropdown-option-change event', async() => {
		const menuItems = categories[0].querySelectorAll('d2l-labs-filter-dropdown-option');

		setTimeout(() => menuItems[0].click());
		let e = await oneEvent(container, 'd2l-labs-filter-dropdown-option-change');
		expect(e.detail.categoryKey).to.equal('1');
		expect(e.detail.selected).to.equal(false);

		setTimeout(() => menuItems[1].click());
		e = await oneEvent(container, 'd2l-labs-filter-dropdown-option-change');
		expect(e.detail.selected).to.equal(true);
	});
});
