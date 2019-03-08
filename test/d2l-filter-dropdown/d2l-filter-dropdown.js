import '@polymer/iron-test-helpers/mock-interactions.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

(function() {
	var filter;

	var categories = [];
	var options = [];

	function _getExpectedAndImport() {
		var expected = [];
		categories.map(c => {
			filter.addFilterCategory(c.key, c.title, c.active);
			expected.push({
				key: c.key,
				title: c.title,
				numSelected: 0,
				options: []
			});
		});
		options.map(o => {
			filter.addFilterOption(o.cat, o.key, o.title, o.selected);
			expected.filter(v => v.key === o.cat)[0].options.push({
				key: o.key,
				title: o.title,
				selected: o.selected || false,
				display: true
			});
		});
		expected.forEach(f => {
			f.numSelected = f.options.filter(o => o.selected).length;
		});
		return expected;
	}

	function _setSelectedOptions(selected) {
		var expectedNum = {};
		for (var i = 0; i < options.length; i++) {
			options[i].selected = selected.filter(s => s === i).length !== 0;
			if (!expectedNum[options[i].cat]) {
				expectedNum[options[i].cat] = 0;
			}
			if (options[i].selected) {
				expectedNum[options[i].cat]++;
			}
		}
		return expectedNum;
	}

	function _updateExpectedOption(index, value, expected) {
		for (let i = 0; i < expected.length; i++) {
			const cat = expected[i];
			for (let j = 0; j < cat.options.length; j++) {
				if (options[index].cat === cat.key && options[index].key === cat.options[j].key && cat.options[j].selected != value) {
					cat.options[j].selected = value;
					cat.numSelected = cat.numSelected + (value ? 1 : -1);
				}
			}
		}
	}

	function _getOptionByKeys(cKey, key) {
		return options.filter(o => o.cat === cKey && o.key === key)[0];
	}

	function _getDropdownOpener() {
		return filter.shadowRoot.querySelector('d2l-dropdown-button-subtle');
	}
	function _getTabPanels() {
		return filter.shadowRoot.querySelectorAll('d2l-tab-panel');
	}
	function _getPages() {
		return filter.shadowRoot.querySelectorAll('d2l-filter-dropdown-page');
	}
	function _getOptions(page) {
		return page.shadowRoot.querySelectorAll('d2l-menu-item-checkbox');
	}

	suite('d2l-filter-dropdown', function() {
		setup(function(done) {
			filter = fixture('basic');
			categories = [
				{key: 'cat1', title: 'Cat 1'},
				{key: 'cat2', title: 'Cat 2'},
				{key: 'cat3', title: 'Cat 3'}
			];
			options = [
				{cat: 'cat1', key: 'opt1-1', title: 'Opt 1-1'},
				{cat: 'cat1', key: 'opt1-2', title: 'Opt 1-2'},
				{cat: 'cat2', key: 'opt2-1', title: 'Opt 2-1'},
				{cat: 'cat2', key: 'opt2-2', title: 'Opt 2-2'},
				{cat: 'cat3', key: 'opt3-1', title: 'Opt 3-1'},
				{cat: 'cat3', key: 'opt3-2', title: 'Opt 3-2'}
			];
			afterNextRender(filter, done);
		});
		test('instantiating the element works', function() {
			assert.equal('d2l-filter-dropdown', filter.tagName.toLowerCase());
		});
		test('attributes are set correctly', function() {
			assert.equal(false, filter.disableSearch);
		});
		test('filters are imported correctly', function() {
			var expected = _getExpectedAndImport(filter);
			assert.deepEqual(expected, filter._filters);
		});
		test('clear button is hidden if no filters are applied', function() {
			var clearButton = filter.shadowRoot.querySelector('d2l-button-subtle');
			assert.isTrue(clearButton.hidden);
		});
		test('filter category num selected is correct after importing filters and clear button is visible', function() {
			var clearButton = filter.shadowRoot.querySelector('d2l-button-subtle');
			var selected = [0, 4, 5];
			var expectedNum = _setSelectedOptions(selected);
			var expected = _getExpectedAndImport(filter);

			assert.isFalse(clearButton.hidden);
			assert.deepEqual(expected, filter._filters);
			for (var i = 0; i < filter._filters.length; i++) {
				var f = filter._filters[i];
				for (var j = 0; j < f.options.length; j++) {
					assert.equal(f.options[j].selected, _getOptionByKeys(f.key, f.options[j].key).selected);
				}
				assert.equal(expectedNum[f.key], f.numSelected);
			}
		});
		test('filter category num selected is correct after changing option selected status', function(done) {
			_getExpectedAndImport(filter);
			filter._filters.forEach(f => {
				assert.equal(0, f.numSelected);
			});
			window.requestAnimationFrame(function() {
				var pages = _getPages();
				for (var i = 0; i < pages.length; i++) {
					var options = _getOptions(pages[i]);
					for (var j = 0; j < i && j < options.length; j++) {
						afterNextRender(options[j], function(option) {
							MockInteractions.click(option);
						}, [options[j]]);
					}
				}
				window.setTimeout(function() {
					for (i = 0; i < filter._filters.length; i++) {
						assert.equal(Math.min(i, filter._filters[i].options.length), filter._filters[i].numSelected);
					}
					done();
				}, 100);
			});
		});
		test('filter category num selected count does not display if count is 0', function(done) {
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var tabs = _getTabPanels();
				for (var i = 0; i < tabs.length; i++) {
					assert.equal(tabs[i].text, categories[i].title);
				}
				done();
			});
		});
		test('category selected count displays correctly', function(done) {
			var expectedNum = _setSelectedOptions([0, 4, 5]);
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var tabs = _getTabPanels();
				for (var i = 0; i < tabs.length; i++) {
					var expectedNumText = expectedNum[categories[i].key] !== 0 ? ` (${expectedNum[categories[i].key]})` : '';
					assert.equal(tabs[i].text, `${categories[i].title}${expectedNumText}`);
				}
				done();
			});
		});
		test('total filter count is not shown when no options are selected', function(done) {
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var totalCount = _getDropdownOpener();
				assert.equal('Filter', totalCount.text);
				done();
			});
		});
		test('total filter count is displayed correctly when one option is selected', function(done) {
			_setSelectedOptions([2]);
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var totalCount = _getDropdownOpener();
				assert.equal('Filter: 1 Filter', totalCount.text);
				done();
			});
		});
		test('total filter count is displayed correctly when multiple options are selected', function(done) {
			var selected = [0, 4, 5];
			_setSelectedOptions(selected);
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var totalCount = _getDropdownOpener();
				assert.equal(`Filter: ${selected.length} Filters`, totalCount.text);
				done();
			});
		});
		test('filter categories display correctly', function(done) {
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var headers = _getTabPanels();
				assert.equal(filter._filters.length, headers.length);
				for (var i = 0; i < headers.length; i++) {
					assert.equal(filter._filters[i].title, headers[i].text);
				}
				done();
			});
		});
		test('filter options display correctly', function(done) {
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var pages = _getPages();
				for (var i = 0; i < pages.length; i++) {
					var opts = _getOptions(pages[i]);
					assert.equal(pages[i].options.length, opts.length);
					for (var j = 0; j < opts.length; j++) {
						assert.equal(pages[i].options[j].title, opts[j].text);
					}
				}
				done();
			});
		});
		test('changing search input updates option display', function(done) {
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var pages = _getPages();
				var search = options[1].title.substr(-1);
				var searchInput = pages[0].shadowRoot.querySelector('d2l-input-search');
				searchInput.value = search;
				var searchButton = searchInput.shadowRoot.querySelector('.d2l-input-search-search');
				afterNextRender(searchButton, function(button) {
					MockInteractions.tap(button);
					requestAnimationFrame(function() {
						var opts = _getOptions(pages[0]);
						for (var i = 0; i < opts.length; i++) {
							assert.equal(opts[i].text.indexOf(search) === -1, opts[i].hidden || false);
						}
						done();
					});
				}, [searchButton]);
			});
		});
		test('removing filter category updates filters', function() {
			var expected = _getExpectedAndImport(filter);
			var removal = categories[0].key;
			filter.removeFilterCategory(removal);
			expected = expected.filter(e => e.key !== removal);
			assert.deepEqual(expected, filter._filters);
		});
		test('removing filter option updates filters', function() {
			var expected = _getExpectedAndImport(filter);
			var removal = [options[1].cat, options[1].key];
			filter.removeFilterOption(removal[0], removal[1]);
			var cat = expected.filter(e => e.key === removal[0])[0];
			cat.options = cat.options.filter(o => o.key !== removal[1]);
			assert.deepEqual(expected, filter._filters);
		});
		test('removing filter category updates display', function(done) {
			_getExpectedAndImport(filter);
			var removal = categories[0].key;
			filter.removeFilterCategory(removal);
			window.requestAnimationFrame(function() {
				var headers = _getTabPanels();
				assert.equal(categories.length - 1, headers.length);
				assert.deepEqual(categories.filter(c => c.key !== removal).map(c => c.title), [].map.call(headers, h => h.text));
				done();
			});
		});
		test('removing filter option updates display', function(done) {
			var expected = _getExpectedAndImport(filter);
			var removal = [options[1].cat, options[1].key];
			filter.removeFilterOption(removal[0], removal[1]);
			var cat = expected.filter(e => e.key === removal[0])[0];
			cat.options = cat.options.filter(o => o.key !== removal[1]);
			window.requestAnimationFrame(function() {
				var pages = _getPages();
				for (var i = 0; i < pages.length; i++) {
					var pCat = expected.filter(e => e.key === pages[i].parentKey)[0];
					var opts = _getOptions(pages[i]);
					assert.deepEqual(pCat.options.map(o => o.title), [].map.call(opts, o => o.text));
				}
				done();
			});
		});
		test('updating filter option updates filters', function() {
			const update = 2;
			_setSelectedOptions([0, 4, 5]);
			let expected = _getExpectedAndImport(filter);
			filter.updateFilterOptionSelectedStatus(options[update].cat, options[update].key, true);
			_updateExpectedOption(update, true, expected);
			assert.deepEqual(expected, filter._filters);
		});
		test('updating filter option updates display', function(done) {
			const update = 2;
			const selected = [0, 4, 5];
			_setSelectedOptions(selected);
			let expected = _getExpectedAndImport(filter);
			filter.updateFilterOptionSelectedStatus(options[update].cat, options[update].key, true);
			_updateExpectedOption(update, true, expected);
			window.requestAnimationFrame(function() {
				var pages = _getPages();
				for (var i = 0; i < pages.length; i++) {
					var opts = _getOptions(pages[i]);
					assert.equal(pages[i].options.length, opts.length);
					for (var j = 0; j < opts.length; j++) {
						assert.equal (opts[j].selected, expected[i].options[j].selected);
					}
				}
				done();
			});
		})
	});

	suite('d2l-filter-dropdown without search', function() {
		setup(function() {
			filter = fixture('no-search');
		});
		test('instantiating the element works', function() {
			assert.equal(filter.tagName.toLowerCase(), 'd2l-filter-dropdown');
		});
		test('attributes are set correctly', function() {
			assert.equal(filter.disableSearch, true);
		});
		test('search bar is hidden', function(done) {
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var search = filter.shadowRoot.querySelector('d2l-filter-dropdown-page').shadowRoot.querySelector('.d2l-filter-dropdown-page-search');
				assert.equal(search.hidden, true);
				done();
			});
		});
	});
})();
