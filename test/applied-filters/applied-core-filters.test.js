import '@brightspace-ui/core/components/filter/filter.js';
import '@brightspace-ui/core/components/filter/filter-dimension-set.js';
import '@brightspace-ui/core/components/filter/filter-dimension-set-value.js';
import '../../components/applied-filters/applied-core-filters.js';
import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const basic = html`
	<div>
		<d2l-filter id="filter">
			<d2l-filter-dimension-set key="1" text="Category 1">
				<d2l-filter-dimension-set-value selected text="Value 1 - 1" key="1"></d2l-filter-dimension-set-value>
				<d2l-filter-dimension-set-value text="Value 1 - 2" key="2"></d2l-filter-dimension-set-value>
				<d2l-filter-dimension-set-value text="Value 1 - 3" key="3"></d2l-filter-dimension-set-value>
				<d2l-filter-dimension-set-value selected text="Value 1 - 4" key="4"></d2l-filter-dimension-set-value>
				<d2l-filter-dimension-set-value text="Value 1 - 5" key="5"></d2l-filter-dimension-set-value>
				<d2l-filter-dimension-set-value text="Value 1 - 6" key="6"></d2l-filter-dimension-set-value>
			</d2l-filter-dimension-set>
			<d2l-filter-dimension-set key="2" text="Category 2" value-only-active-filter-text>
				<d2l-filter-dimension-set-value selected text="Value 2 - 1" key="1"></d2l-filter-dimension-set-value>
				<d2l-filter-dimension-set-value text="Value 2 - 2" key="2"></d2l-filter-dimension-set-value>
				<d2l-filter-dimension-set-value text="Value 2 - 3" key="3"></d2l-filter-dimension-set-value>
			</d2l-filter-dimension-set>
		</d2l-filter>
		<d2l-labs-applied-core-filters filter-ids="filter" label-text="The applied filters"></d2l-labs-applied-core-filters>
	</div>`;

const twoFilters = html`
	<div>
		<d2l-filter id="filter-1">
			<d2l-filter-dimension-set key="1" text="Category 1">
				<d2l-filter-dimension-set-value selected text="Value 1 - 1" key="1"></d2l-filter-dimension-set-value>
			</d2l-filter-dimension-set>
			<d2l-filter-dimension-set key="2" text="Category 2">
				<d2l-filter-dimension-set-value text="Value 2 - 1" key="1"></d2l-filter-dimension-set-value>
			</d2l-filter-dimension-set>
		</d2l-filter>
		<d2l-filter id="filter-2">
			<d2l-filter-dimension-set key="1" text="Category" value-only-active-filter-text>
				<d2l-filter-dimension-set-value selected text="Value" key="1"></d2l-filter-dimension-set-value>
			</d2l-filter-dimension-set>
		</d2l-filter>
		<d2l-labs-applied-core-filters filter-ids="filter-1 filter-2" label-text="The applied filters"></d2l-labs-applied-core-filters>
	</div>`;

describe('d2l-labs-applied-core-filters', () => {

	it('should construct', () => {
		runConstructor('d2l-labs-applied-core-filters');
	});

	describe('Single filter', () => {
		let filter, appliedCoreFilters;

		beforeEach(async() => {
			const elem = await fixture(basic);
			filter = elem.querySelector('d2l-filter');
			appliedCoreFilters = elem.querySelector('d2l-labs-applied-core-filters');
			await filter.updateComplete;
			await appliedCoreFilters.updateComplete;
			await waitUntil(() => appliedCoreFilters._allActiveFilters.get('filter').length === 3, 'Active filters were not set');
		});

		it('instantiating the element works', () => {
			expect('d2l-labs-applied-core-filters').to.equal(appliedCoreFilters.tagName.toLowerCase());
		});
		it('attributes are set correctly', () => {
			expect(appliedCoreFilters.filterIds).to.equal('filter');
			expect(appliedCoreFilters.labelText).to.equal('The applied filters');
		});
		it('instantiates with the selected filters added as multi-select items', async() => {
			const items = appliedCoreFilters.shadowRoot.querySelectorAll('d2l-labs-multi-select-list-item');
			expect(items.length).to.equal(3);
			expect(items[0].text).to.equal('Category 1: Value 1 - 1');
			expect(items[1].text).to.equal('Category 1: Value 1 - 4');
			expect(items[2].text).to.equal('Value 2 - 1');
		});
		it('selecting another filter value adds to the list', async() => {
			const values = filter.querySelectorAll('d2l-filter-dimension-set-value');
			values[1].selected = true;
			await oneEvent(appliedCoreFilters, 'd2l-labs-applied-core-filters-updated');

			const items = appliedCoreFilters.shadowRoot.querySelectorAll('d2l-labs-multi-select-list-item');
			expect(items.length).to.equal(4);
			expect(items[0].text).to.equal('Category 1: Value 1 - 1');
			expect(items[1].text).to.equal('Category 1: Value 1 - 2');
			expect(items[2].text).to.equal('Category 1: Value 1 - 4');
			expect(items[3].text).to.equal('Value 2 - 1');
		});
		it('removing a filter value removes from the list', async() => {
			const values = filter.querySelectorAll('d2l-filter-dimension-set-value');
			values[0].selected = false;
			await oneEvent(appliedCoreFilters, 'd2l-labs-applied-core-filters-updated');

			const items = appliedCoreFilters.shadowRoot.querySelectorAll('d2l-labs-multi-select-list-item');
			expect(items.length).to.equal(2);
			expect(items[0].text).to.equal('Category 1: Value 1 - 4');
			expect(items[1].text).to.equal('Value 2 - 1');
		});
		it('deleting an item from the multi-select list deselects the corresponding value from the filter', async() => {
			const values = filter.querySelectorAll('d2l-filter-dimension-set-value');
			expect(values[0].selected).to.be.true;

			const items = appliedCoreFilters.shadowRoot.querySelectorAll('d2l-labs-multi-select-list-item');
			await items[0].updateComplete;
			items[0].shadowRoot.querySelectorAll('.d2l-labs-multi-select-delete-icon')[0].click();

			const e = await oneEvent(filter, 'd2l-filter-change');
			const dimensions = e.detail.dimensions;
			expect(dimensions.length).to.equal(1);
			expect(dimensions[0].dimensionKey).to.equal('1');
			const changes = dimensions[0].changes;
			expect(changes.length).to.equal(1);
			expect(changes[0].valueKey).to.equal('1');
			expect(changes[0].selected).to.be.false;
		});

		describe('clear filters button', () => {
			describe('visiblity', () => {
				it('clear filters button is hidden when 3 filters are applied', () => {
					const clearFilters = appliedCoreFilters.shadowRoot.querySelector('#d2l-clear-filters-button');
					expect(clearFilters.hidden).to.be.true;
				});
				it('selecting a 4th filter reveals the clear filters button, then removing it hides it', async() => {
					const clearFilters = appliedCoreFilters.shadowRoot.querySelector('#d2l-clear-filters-button');
					const values = filter.querySelectorAll('d2l-filter-dimension-set-value');
					values[1].selected = true;
					await oneEvent(appliedCoreFilters, 'd2l-labs-applied-core-filters-updated');

					expect(clearFilters.hidden).to.be.false;
					values[1].selected = false;
					await oneEvent(appliedCoreFilters, 'd2l-labs-applied-core-filters-updated');

					expect(clearFilters.hidden).to.be.true;
				});
				it('clear filters button is visible when all filters are applied', async() => {
					const values = filter.querySelectorAll('d2l-filter-dimension-set-value');
					values[1].selected = true;
					values[2].selected = true;
					values[4].selected = true;
					values[5].selected = true;

					await oneEvent(appliedCoreFilters, 'd2l-labs-applied-core-filters-updated');
					const clearFilters = appliedCoreFilters.shadowRoot.querySelector('#d2l-clear-filters-button');
					expect(clearFilters.hidden).to.be.false;
				});
				it('clear filters button is hidden when 0 filters are applied', async() => {
					const clearFilters = appliedCoreFilters.shadowRoot.querySelector('#d2l-clear-filters-button');
					const values = filter.querySelectorAll('d2l-filter-dimension-set-value');

					values[0].selected = false;
					values[3].selected = false;
					values[6].selected = false;

					await oneEvent(appliedCoreFilters, 'd2l-labs-applied-core-filters-updated');
					expect(clearFilters.hidden).to.be.true;
				});
				it('clear filters button is hidden when 1 filters is applied', async() => {
					const clearFilters = appliedCoreFilters.shadowRoot.querySelector('#d2l-clear-filters-button');
					const values = filter.querySelectorAll('d2l-filter-dimension-set-value');

					values[0].selected = false;
					values[3].selected = false;

					await oneEvent(appliedCoreFilters, 'd2l-labs-applied-core-filters-updated');
					expect(clearFilters.hidden).to.be.true;
				});
			});
			describe('functionality', () => {
				it('selecting a 4th filter & clicking clear filters fires a d2l-filter-change event', async() => {
					const clearFilters = appliedCoreFilters.shadowRoot.querySelector('#d2l-clear-filters-button');
					const values = filter.querySelectorAll('d2l-filter-dimension-set-value');

					values[1].selected = true;
					await oneEvent(appliedCoreFilters, 'd2l-labs-applied-core-filters-updated');

					setTimeout(() => clearFilters.click());
					const e = await oneEvent(filter, 'd2l-filter-change');
					expect(e.detail.allCleared).to.be.true;
					const dimensions = e.detail.dimensions;
					expect(dimensions.length).to.equal(2);
					expect(dimensions[0].cleared).to.be.true;
					expect(dimensions[1].cleared).to.be.true;
				});
				it('selecting a 4th filter & clicking clear filters removes filters & hides clear filters button', async() => {
					const clearFilters = appliedCoreFilters.shadowRoot.querySelector('#d2l-clear-filters-button');
					const values = filter.querySelectorAll('d2l-filter-dimension-set-value');

					values[1].selected = true;
					await oneEvent(appliedCoreFilters, 'd2l-labs-applied-core-filters-updated');

					clearFilters.click();
					await oneEvent(appliedCoreFilters, 'd2l-labs-applied-core-filters-updated');

					const filters = appliedCoreFilters.shadowRoot.querySelectorAll('d2l-labs-multi-select-list-item');
					expect(filters.length).to.equal(0);
					expect(clearFilters.hidden).to.equal(true);
				});
			});
		});
	});

	describe('Multiple filters', () => {
		let filter1, appliedCoreFilters;

		beforeEach(async() => {
			const elem = await fixture(twoFilters);
			filter1 = elem.querySelector('#filter-1');
			appliedCoreFilters = elem.querySelector('d2l-labs-applied-core-filters');
			await filter1.updateComplete;
			await appliedCoreFilters.updateComplete;
			const activeMap = appliedCoreFilters._allActiveFilters;
			await waitUntil(() => activeMap.get('filter-1').length === 1 && activeMap.get('filter-2').length === 1, 'Active filters were not set');
		});

		it('instantiates with the selected filters added as multi-select items', async() => {
			expect(appliedCoreFilters.filterIds).to.equal('filter-1 filter-2');
			const items = appliedCoreFilters.shadowRoot.querySelectorAll('d2l-labs-multi-select-list-item');
			expect(items.length).to.equal(2);
			expect(items[0].text).to.equal('Category 1: Value 1 - 1');
			expect(items[1].text).to.equal('Value');
		});
		it('selecting another filter value adds to the list', async() => {
			const values = filter1.querySelectorAll('d2l-filter-dimension-set-value');
			values[1].selected = true;
			await oneEvent(appliedCoreFilters, 'd2l-labs-applied-core-filters-updated');

			expect(appliedCoreFilters._allActiveFilters.get('filter-1').length).to.equal(2);
			expect(appliedCoreFilters._allActiveFilters.get('filter-2').length).to.equal(1);
			const items = appliedCoreFilters.shadowRoot.querySelectorAll('d2l-labs-multi-select-list-item');
			expect(items.length).to.equal(3);
			expect(items[0].text).to.equal('Category 1: Value 1 - 1');
			expect(items[1].text).to.equal('Category 2: Value 2 - 1');
			expect(items[2].text).to.equal('Value');
		});
		it('removing a filter value removes from the list', async() => {
			const values = filter1.querySelectorAll('d2l-filter-dimension-set-value');
			values[0].selected = false;
			await oneEvent(appliedCoreFilters, 'd2l-labs-applied-core-filters-updated');

			expect(appliedCoreFilters._allActiveFilters.get('filter-1')).to.be.empty;
			expect(appliedCoreFilters._allActiveFilters.get('filter-2').length).to.equal(1);
			const items = appliedCoreFilters.shadowRoot.querySelectorAll('d2l-labs-multi-select-list-item');
			expect(items.length).to.equal(1);
			expect(items[0].text).to.equal('Value');
		});
		it('deleting an item from the multi-select list deselects the corresponding value from the filter', async() => {
			const values = filter1.querySelectorAll('d2l-filter-dimension-set-value');
			expect(values[0].selected).to.be.true;

			const items = appliedCoreFilters.shadowRoot.querySelectorAll('d2l-labs-multi-select-list-item');
			await items[0].updateComplete;
			items[0].shadowRoot.querySelectorAll('.d2l-labs-multi-select-delete-icon')[0].click();

			const e = await oneEvent(filter1, 'd2l-filter-change');
			const dimensions = e.detail.dimensions;
			expect(dimensions.length).to.equal(1);
			expect(dimensions[0].dimensionKey).to.equal('1');
			const changes = dimensions[0].changes;
			expect(changes.length).to.equal(1);
			expect(changes[0].valueKey).to.equal('1');
			expect(changes[0].selected).to.be.false;
		});
	});
});
