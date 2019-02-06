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
				active: c.active === undefined ? c === categories[0] : c.active,
				numSelected: 0,
				options: []
			});
		});
		options.map(o => {
			filter.addFilterOption(o.cat, o.key, o.title, o.selected);
			expected.find(v => v.key === o.cat).options.push({
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
			options[i].selected = selected.includes(i);
			if (!expectedNum[options[i].cat]) {
				expectedNum[options[i].cat] = 0;
			}
			if (options[i].selected) {
				expectedNum[options[i].cat]++;
			}
		}
		return expectedNum;
	}

	function _getCatByTitle(title) {
		return categories.find(c => c.title === title);
	}

	function _getOptionByKeys(cKey, key) {
		return options.find(o => o.cat === cKey && o.key === key);
	}
	function _getOptionByTitle(title, cKey) {
		return options.find(o => o.title === title && (!cKey || o.cat === cKey));
	}

	function _getPages() {
		return filter.shadowRoot.querySelectorAll('d2l-filter-dropdown-page');
	}
	function _getPageTitles() {
		return filter.shadowRoot.querySelectorAll('.d2l-filter-dropdown-category-title');
	}
	function _getOptionTitles(page) {
		return page.shadowRoot.querySelectorAll('.d2l-filter-dropdown-option');
	}

	suite('d2l-filter-dropdown', function() {
		setup(function() {
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
		test('manually importing active filter category is the only active category', function() {
			var activeFilter = 1;
			for (var i = 0; i < categories.length; i++) {
				categories[i].active = i === activeFilter;
			}
			var expected = _getExpectedAndImport(filter);
			assert.deepEqual(expected, filter._filters);
			for (i = 0; i < filter._filters.length; i++) {
				assert.equal(filter._filters[i].key === categories[activeFilter].key, filter._filters[i].active);
			}
		});
		test('filter category num selected is correct after importing filters', function() {
			var selected = [0, 4, 5];
			var expectedNum = _setSelectedOptions(selected);
			var expected = _getExpectedAndImport(filter);
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
					for (var j = 0; j < i && j < pages[i].options.length; j++) {
						pages[i].selectOptionByIndex(j);
					}
				}
				for (i = 0; i < filter._filters.length; i++) {
					assert.equal(Math.min(i, filter._filters[i].options.length), filter._filters[i].numSelected);
				}
				done();
			});
		});
		test('filter category num selected count does not display if count is 0', function(done) {
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var counts = filter.shadowRoot.querySelectorAll('.d2l-filter-dropdown-category-filter-count');
				for (var i = 0; i < counts.lengh; i++) {
					assert.equal(true, counts[i].hidden);
				}
				done();
			});
		});
		test('category selected count displays correctly', function(done) {
			var expectedNum = _setSelectedOptions([0, 4, 5]);
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var buttons = filter.shadowRoot.querySelectorAll('.d2l-filter-dropdown-tab-button');
				for (var i = 0; i < buttons.length; i++) {
					var title = buttons[i].querySelector('.d2l-filter-dropdown-category-title').innerHTML;
					var key = _getCatByTitle(title).key;
					var numSpan = buttons[i].querySelector('.d2l-filter-dropdown-category-filter-count');
					assert.equal(expectedNum[key] === 0, numSpan.hidden);
					assert.equal(` (${expectedNum[key]})`, numSpan.innerHTML);
				}
				done();
			});
		});
		test('total filter count is not shown when no options are selected', function(done) {
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var totalCount = filter.shadowRoot.querySelector('.d2l-filter-dropdown-total-filter-count');
				assert.equal(true, totalCount.hidden);
				done();
			});
		});
		test('total filter count is displayed correctly when one option is selected', function(done) {
			_setSelectedOptions([2]);
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var totalCount = filter.shadowRoot.querySelector('.d2l-filter-dropdown-total-filter-count');
				assert.equal(false, totalCount.hidden);
				assert.equal(': 1 Filter', totalCount.innerHTML);
				done();
			});
		});
		test('total filter count is displayed correctly when multiple options are selected', function(done) {
			var selected = [0, 4, 5];
			_setSelectedOptions(selected);
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var totalCount = filter.shadowRoot.querySelector('.d2l-filter-dropdown-total-filter-count');
				assert.equal(false, totalCount.hidden);
				assert.equal(`: ${selected.length} Filters`, totalCount.innerHTML);
				done();
			});
		});
		test('active filter category is selected iron-page', function(done) {
			_getExpectedAndImport(filter);
			var selected = filter._getSelectedTab();
			window.requestAnimationFrame(function() {
				var ironPages = filter.shadowRoot.querySelector('iron-pages');
				assert.equal(selected, ironPages.selected);
				done();
			});
		});
		test('changing active filter category is the only active category', function() {
			_getExpectedAndImport(filter);
			var newSelected = 1;
			filter.selectFilterCategory(filter._filters[newSelected].key);
			for (var i = 0; i < filter._filters.length; i++) {
				assert.equal(i === newSelected, filter._filters[i].active);
			}
		});
		test('changing active filter category is selected iron-page', function(done) {
			_getExpectedAndImport(filter);
			var newSelected = 1;
			filter.selectFilterCategory(categories[newSelected].key);
			var selected = filter._getSelectedTab();
			window.requestAnimationFrame(function() {
				var ironPages = filter.shadowRoot.querySelector('iron-pages');
				assert.equal(categories[newSelected].key, selected);
				assert.equal(selected, ironPages.selected);
				done();
			});
		});
		test('unselected option shows empty check box', function(done) {
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var pages = _getPages();
				for (var i = 0; i < pages.length; i++) {
					var checked = pages[i].shadowRoot.querySelectorAll('.d2l-filter-dropdown-option .icon-checked');
					var unChecked = pages[i].shadowRoot.querySelectorAll('.d2l-filter-dropdown-option .icon-unchecked');
					for (var j = 0; j < checked.length; j++) {
						assert.equal(true, checked[j].hidden);
					}
					for (j = 0; j < unChecked.length; j++) {
						assert.equal(false, unChecked[j].hidden);
					}
				}
				done();
			});
		});
		test('selected option shows checked check box', function(done) {
			var selected = [0, 4, 5];
			_setSelectedOptions(selected);
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var pages = _getPages();
				for (var i = 0; i < pages.length; i++) {
					var opts = _getOptionTitles(pages[i]);
					for (var j = 0; j < opts.length; j++) {
						var title = opts[j].querySelector('span').innerHTML;
						var checked = _getOptionByTitle(title, opts[j].parentKey).selected;
						assert.equal(!checked, opts[j].querySelector('.icon-checked').hidden);
						assert.equal(checked, opts[j].querySelector('.icon-unchecked').hidden);
					}
				}
				done();
			});
		});
		test('filter categories display correctly', function(done) {
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var headers = _getPageTitles();
				assert.equal(filter._filters.length, headers.length);
				for (var i = 0; i < headers.length; i++) {
					assert.equal(filter._filters[i].title, headers[i].innerHTML);
				}
				done();
			});
		});
		test('filter options display correctly', function(done) {
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var pages = _getPages();
				for (var i = 0; i < pages.length; i++) {
					var opts = pages[i].shadowRoot.querySelectorAll('.d2l-filter-dropdown-option');
					assert.equal(pages[i].options.length, opts.length);
					for (var j = 0; j < opts.length; j++) {
						assert.equal(pages[i].options[j].title, opts[j].querySelector('span').innerHTML);
					}
				}
				done();
			});
		});
		test('changing search input updates option display', function(done) {
			_getExpectedAndImport(filter);
			window.requestAnimationFrame(function() {
				var pages = _getPages();
				var search = options[0].title.substr(-1);
				pages[0]._searchInput = search;
				for (var i = 0; i < pages.length; i++) {
					var opts = pages[i].querySelectorAll('.d2l-filter-dropdown-option');
					for (var j = 0; j < opts.length; j++) {
						assert.equal(!opts.shadowRoot.querySelector('span').innerHTML.includes(search), opts[j].hidden);
					}
				}
				done();
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
			var cat = expected.find(e => e.key === removal[0]);
			cat.options = cat.options.filter(o => o.key !== removal[1]);
			assert.deepEqual(expected, filter._filters);
		});
		test('removing filter category updates display', function(done) {
			_getExpectedAndImport(filter);
			var removal = categories[0].key;
			filter.removeFilterCategory(removal);
			window.requestAnimationFrame(function() {
				var headers = _getPageTitles();
				assert.equal(categories.length - 1, headers.length);
				assert.deepEqual(categories.filter(c => c.key !== removal).map(c => c.title), [].map.call(headers, h => h.innerHTML));
				done();
			});
		});
		test('removing filter option updates display', function(done) {
			var expected = _getExpectedAndImport(filter);
			var removal = [options[1].cat, options[1].key];
			filter.removeFilterOption(removal[0], removal[1]);
			var cat = expected.find(e => e.key === removal[0]);
			cat.options = cat.options.filter(o => o.key !== removal[1]);
			window.requestAnimationFrame(function() {
				var pages = _getPages();
				for (var i = 0; i < pages.length; i++) {
					var pCat = expected.find(e => e.key === pages[i].parentKey);
					var opts = _getOptionTitles(pages[i]);
					assert.deepEqual(pCat.options.map(o => o.title), [].map.call(opts, o => o.querySelector('span').innerHTML));
				}
				done();
			});
		});
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
