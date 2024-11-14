import '../../components/filter-dropdown/filter-dropdown.js';
import '../../components/filter-dropdown/filter-dropdown-category.js';
import '../../components/filter-dropdown/filter-dropdown-option.js';
import '../../components/applied-filters/applied-filters.js';
import { clickElem, expect, fixture, html, oneEvent, sendKeysElem, waitUntil } from '@brightspace-ui/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const basic = html`
	<div>
		<d2l-labs-filter-dropdown id="dropdown" total-selected-option-count="3">
			<d2l-labs-filter-dropdown-category key="1" category-text="Category 1" selected-option-count="3">
				<d2l-labs-filter-dropdown-option selected text="Option 1 - 1" value="1"></d2l-labs-filter-dropdown-option>
				<d2l-labs-filter-dropdown-option text="Option 1 - 2" value="2"></d2l-labs-filter-dropdown-option>
				<d2l-labs-filter-dropdown-option text="Option 1 - 3" value="3"></d2l-labs-filter-dropdown-option>
				<d2l-labs-filter-dropdown-option selected text="Option 1 - 4" value="4"></d2l-labs-filter-dropdown-option>
				<d2l-labs-filter-dropdown-option text="Option 1 - 5" value="5"></d2l-labs-filter-dropdown-option>
				<d2l-labs-filter-dropdown-option text="Option 1 - 6" value="6"></d2l-labs-filter-dropdown-option>
			</d2l-labs-filter-dropdown-category>
			<d2l-labs-filter-dropdown-category key="2" category-text="Category 2" disable-search>
				<d2l-labs-filter-dropdown-option selected text="Option 2 - 1" value="1"></d2l-labs-filter-dropdown-option>
				<d2l-labs-filter-dropdown-option text="Option 2 - 2" value="2"></d2l-labs-filter-dropdown-option>
				<d2l-labs-filter-dropdown-option text="Option 2 - 3" value="3"></d2l-labs-filter-dropdown-option>
			</d2l-labs-filter-dropdown-category>
		</d2l-labs-filter-dropdown>
		<d2l-labs-applied-filters for="dropdown" label-text="The applied filters"></d2l-labs-applied-filters>
	</div>`;

describe('d2l-labs-applied-filters', () => {
	let dropdown, appliedFilters;

	function getClearFilterButton() {
		const tagList = appliedFilters.shadowRoot.querySelector('d2l-tag-list');
		return tagList.shadowRoot.querySelector('.d2l-tag-list-clear-button');
	}
	function getClearButtonVisibility() {
		const clearFilters = getClearFilterButton();
		return clearFilters.classList.contains('d2l-tag-list-clear-button-visible');
	}

	async function awaitFilterChange() {
		await appliedFilters.updateComplete;
		const tagList = appliedFilters.shadowRoot.querySelector('d2l-tag-list');
		await waitUntil(() => tagList._contentReady);
	}

	beforeEach(async() => {
		const elem = await fixture(basic);
		dropdown = elem.querySelector('d2l-labs-filter-dropdown');
		appliedFilters = elem.querySelector('d2l-labs-applied-filters');
		await elem.updateComplete;
		await appliedFilters.updateComplete;
	});

	it('should construct', () => {
		runConstructor('d2l-labs-applied-filters');
	});
	it('instantiating the element works', () => {
		expect('d2l-labs-applied-filters').to.equal(appliedFilters.tagName.toLowerCase());
	});
	it('attributes are set correctly', () => {
		expect(appliedFilters.for).to.equal('dropdown');
		expect(appliedFilters.labelText).to.equal('The applied filters');
	});
	it('instantiates with the selected filters added as tag-list items', () => {
		const filters = appliedFilters.shadowRoot.querySelectorAll('d2l-tag-list-item');
		expect(filters.length).to.equal(3);
		expect(filters[0].text).to.equal('Option 1 - 1');
		expect(filters[1].text).to.equal('Option 1 - 4');
		expect(filters[2].text).to.equal('Option 2 - 1');
	});
	it('selecting another filter adds to the list', async() => {
		const options = dropdown.querySelectorAll('d2l-labs-filter-dropdown-option');
		options[1].click();
		await options[1].updateComplete;

		const filters = appliedFilters.shadowRoot.querySelectorAll('d2l-tag-list-item');
		expect(filters.length).to.equal(4);
		expect(filters[0].text).to.equal('Option 1 - 1');
		expect(filters[1].text).to.equal('Option 1 - 2');
		expect(filters[2].text).to.equal('Option 1 - 4');
		expect(filters[3].text).to.equal('Option 2 - 1');
	});
	it('removing a filter removes from the list', async() => {
		const options = dropdown.querySelectorAll('d2l-labs-filter-dropdown-option');
		options[0].deselect();
		await options[0].updateComplete;

		const filters = appliedFilters.shadowRoot.querySelectorAll('d2l-tag-list-item');
		expect(filters.length).to.equal(2);
		expect(filters[0].text).to.equal('Option 1 - 4');
		expect(filters[1].text).to.equal('Option 2 - 1');
	});
	it('deleting an item from the tag-list list deselects the corresponding filter from the dropdown', async() => {
		const options = dropdown.querySelectorAll('d2l-labs-filter-dropdown-option');
		expect(options[0].selected).to.equal(true);

		const filters = appliedFilters.shadowRoot.querySelectorAll('d2l-tag-list-item');
		await filters[0].updateComplete;
		await sendKeysElem(filters[0], 'press', 'Backspace');

		await options[0].updateComplete;
		expect(options[0].selected).to.equal(false);
	});
	it('clear filters button is hidden when 3 filters are applied', () => {
		expect(getClearButtonVisibility()).to.equal(false);
	});
	it('selecting a 4th filter reveals the clear filters button', async() => {
		const options = dropdown.querySelectorAll('d2l-labs-filter-dropdown-option');
		options[1].click();

		await options[1].updateComplete;
		await awaitFilterChange();
		expect(getClearButtonVisibility()).to.be.true;
	});
	it('selecting a 4th filter then removing it hides the clear filters button', async() => {
		const options = dropdown.querySelectorAll('d2l-labs-filter-dropdown-option');
		options[1].click();

		await options[1].updateComplete;
		options[1].deselect();

		await options[1].updateComplete;
		await awaitFilterChange();
		expect(getClearButtonVisibility()).to.be.false;
	});
	it('clear filters button is visible when all filters are applied', async() => {
		const options = dropdown.querySelectorAll('d2l-labs-filter-dropdown-option');

		options[1].click();
		options[2].click();
		options[4].click();
		options[5].click();

		await options[1].updateComplete;
		await options[2].updateComplete;
		await awaitFilterChange();

		expect(getClearButtonVisibility()).to.be.true;
	});
	it('clear filters button is hidden when 0 filters are applied', async() => {
		const options = dropdown.querySelectorAll('d2l-labs-filter-dropdown-option');

		options[0].deselect();
		options[3].deselect();
		options[6].deselect();

		await options[0].updateComplete;
		expect(appliedFilters.shadowRoot.querySelector('d2l-tag-list')).to.be.null;
	});
	it('clear filters button is hidden when 1 filters is applied', async() => {
		const options = dropdown.querySelectorAll('d2l-labs-filter-dropdown-option');

		options[0].deselect();
		options[3].deselect();

		await options[0].updateComplete;
		await awaitFilterChange();
		expect(getClearButtonVisibility()).to.equal(false);
	});
	it('selecting a 4th filter & clicking clear filters fires a d2l-labs-filter-dropdown-cleared event', async() => {
		const clearFilters = getClearFilterButton();
		const options = dropdown.querySelectorAll('d2l-labs-filter-dropdown-option');

		options[1].click();
		await awaitFilterChange();
		clickElem(clearFilters);
		await oneEvent(document, 'd2l-labs-filter-dropdown-cleared');
	});
	it('selecting a 4th filter & clicking clear filters removes filters & hides clear filters button', async() => {
		const clearFilters = getClearFilterButton();
		const options = dropdown.querySelectorAll('d2l-labs-filter-dropdown-option');

		options[1].click();

		await awaitFilterChange();
		clearFilters.click();

		await appliedFilters.updateComplete;
		const filters = appliedFilters.shadowRoot.querySelectorAll('d2l-tag-list-item');
		expect(filters.length).to.equal(0);
	});
});
