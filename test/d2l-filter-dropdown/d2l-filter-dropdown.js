import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

(function() {
	var filter;
	var categories = [];

	suite('d2l-filter-dropdown', function() {
		setup(function(done) {
			filter = fixture('basic');
			afterNextRender(filter, done);
		});
		test('instantiating the element works', function() {
			assert.equal('d2l-filter-dropdown', filter.tagName.toLowerCase());
		});
		test('attributes are set correctly', function() {
			assert.equal(filter.totalSelectedOptionCount, 3);
		});
		test('clear button is hidden if total selected count is 0, displayed otherwise', function(done) {
			var clearButton = filter.shadowRoot.querySelector('d2l-button-subtle');
			assert.isFalse(clearButton.hidden);

			filter.totalSelectedOptionCount = 0;

			requestAnimationFrame(function() {
				assert.isTrue(clearButton.hidden);
				done();
			});
		});
		test('pressing the clear button triggers the d2l-filter-dropdown-cleared event', function(done) {
			var clearButton = filter.shadowRoot.querySelector('d2l-button-subtle');
			filter.addEventListener('d2l-filter-dropdown-cleared', function() {
				done();
			});

			clearButton.click();
		});
		test('closing the filter triggers the d2l-filter-dropdown-close event', function(done) {
			var dropdown = filter.shadowRoot.querySelector('d2l-dropdown-tabs');
			filter.addEventListener('d2l-filter-dropdown-close', function() {
				done();
			});

			dropdown.toggleOpen();

			requestAnimationFrame(function() {
				requestAnimationFrame(function() {
					dropdown.toggleOpen();
				});
			});
		});
		test('the opener text is set accordingly', function() {
			var openerButton = filter.shadowRoot.querySelector('d2l-dropdown-button-subtle');
			assert.equal(openerButton.text, 'Filter: 3 Filters');

			filter.totalSelectedOptionCount = 1;
			assert.equal(openerButton.text, 'Filter: 1 Filter');

			filter.totalSelectedOptionCount = 0;
			assert.equal(openerButton.text, 'Filter');
		});
		test('filter categories display correctly', function(done) {
			function getTabs() {
				var tabs = filter.shadowRoot.querySelector('d2l-tabs').shadowRoot.querySelectorAll('d2l-tab');
				if (tabs.length === 2) {
					assert.equal(tabs[0].text, 'Category 1 (3)');
					assert.equal(tabs[1].text, 'Category 2');
					done();
				} else {
					setTimeout(getTabs, 25);
				}
			}

			getTabs();
		});
	});

	suite('d2l-filter-dropdown-category', function() {
		setup(function(done) {
			filter = fixture('basic');
			categories = filter.querySelectorAll('d2l-filter-dropdown-category');
			afterNextRender(filter, done);
		});
		test('instantiating the element works', function() {
			assert.equal('d2l-filter-dropdown-category', categories[0].tagName.toLowerCase());
		});
		test('attributes are set correctly (including d2l-tab-panel attributes)', function() {
			assert.equal(categories[0].key, '1');
			assert.equal(categories[0].getAttribute('role'), 'tabpanel');

			assert.equal(categories[1].key, '2');
			assert.equal(categories[1].getAttribute('role'), 'tabpanel');
		});
		test('tab text is set properly', function() {
			assert.equal(categories[0].selectedOptionCount, 3);
			assert.equal(categories[0].categoryText, 'Category 1');
			assert.equal(categories[0].text, 'Category 1 (3)');

			assert.equal(categories[1].selectedOptionCount, 0);
			assert.equal(categories[1].categoryText, 'Category 2');
			assert.equal(categories[1].text, 'Category 2');
		});
		test('search input is hidden if disable-search attribute is present', function() {
			assert.equal(categories[0].disableSearch, false);
			var searchInput = categories[0].shadowRoot.querySelector('.d2l-filter-dropdown-page-search');
			assert.equal(searchInput.hidden, false);

			assert.equal(categories[1].disableSearch, true);
			searchInput = categories[1].shadowRoot.querySelector('.d2l-filter-dropdown-page-search');
			assert.equal(searchInput.hidden, true);
		});
		test('setting the search-value aattrbiute updates the value in the search input', function() {
			categories[0].searchValue = 'test';

			var searchInput = categories[0].shadowRoot.querySelector('d2l-input-search');
			assert.equal(searchInput.value, 'test');
		});
		test('searching triggers the d2l-filter-dropdown-category-searched event', function(done) {
			categories[0].searchValue = 'test';

			filter.addEventListener('d2l-filter-dropdown-category-searched', function(e) {
				assert.equal(e.detail.categoryKey, '1');
				assert.equal(e.detail.value, 'test');
				done();
			});

			var searchInputButton = categories[0].shadowRoot.querySelector('d2l-input-search').shadowRoot.querySelector('.d2l-input-search-search');
			searchInputButton.click();
		});
		test('changing the category tab triggers the d2l-filter-dropdown-category-selected event', function(done) {
			filter.addEventListener('d2l-filter-dropdown-category-selected', function(e) {
				if (e.detail.categoryKey === '2') {
					done();
				}
			});

			categories[1].selected = true;
		});
		test('selecting a menu option triggers the d2l-filter-dropdown-menu-item-change event', function(done) {
			filter.addEventListener('d2l-filter-dropdown-menu-item-change', function(e) {
				assert.equal(e.detail.categoryKey, '1');

				if (e.detail.menuItemKey === '1') {
					assert.equal(e.detail.selected, false);
					menuItems[1].click();
				} else if (e.detail.menuItemKey === '2') {
					assert.equal(e.detail.selected, true);
					done();
				}
			});

			var menuItems = categories[0].querySelectorAll('d2l-menu-item-checkbox');
			menuItems[0].click();
		});
	});
})();
