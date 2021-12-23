import '../../components/search-results-count/search-results-count.js';
import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const basic = html`
	<d2l-labs-search-results-count total-count="22" query="Financial Planning"></d2l-labs-search-results-count>`;

const basicNoQuery = html`
	<d2l-labs-search-results-count total-count="22"></d2l-labs-search-results-count>`;

const paged = html`
	<d2l-labs-search-results-count range-start="1" range-end="20" total-count="22" query="Financial Planning"></d2l-labs-search-results-count>`;

const pagedNoQuery = html`
	<d2l-labs-search-results-count range-start="1" range-end="20" total-count="22"></d2l-labs-search-results-count>`;

describe('d2l-labs-search-results-count', () => {
	let elem;
	it('should construct', () => {
		runConstructor('d2l-labs-search-results-count');
	});

	describe('basic', () => {
		beforeEach(async() => {
			elem = await fixture(basic);
		});

		it('text should match', () => {
			const shadowRoot = elem.shadowRoot;
			const text = shadowRoot.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
			expect(text).to.equal('22 results for "Financial Planning"');
		});
	});

	describe('basic no query', () => {
		beforeEach(async() => {
			elem = await fixture(basicNoQuery);
		});

		it('text should match', () => {
			const shadowRoot = elem.shadowRoot;
			const text = shadowRoot.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
			expect(text).to.equal('22 results');
		});
	});

	describe('paged', () => {
		beforeEach(async() => {
			elem = await fixture(paged);
		});

		it('text should match', () => {
			const shadowRoot = elem.shadowRoot;
			const text = shadowRoot.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
			expect(text).to.equal('1 - 20 of 22 results for "Financial Planning"');
		});
	});

	describe('paged no query', () => {
		beforeEach(async() => {
			elem = await fixture(pagedNoQuery);
		});

		it('text should match', () => {
			const shadowRoot = elem.shadowRoot;
			const text = shadowRoot.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
			expect(text).to.equal('1 - 20 of 22 results');
		});
	});
});
