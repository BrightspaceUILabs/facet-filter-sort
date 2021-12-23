import '@brightspace-ui/core/components/menu/menu.js';
import '../../components/filter-dropdown/filter-dropdown-option.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const basic = html`
	<d2l-menu>
		<d2l-labs-filter-dropdown-option text="Option 1 - 1" value="1"></d2l-labs-filter-dropdown-option>
		<d2l-labs-filter-dropdown-option text="Option 1 - 2" value="2"></d2l-labs-filter-dropdown-option>
		<d2l-labs-filter-dropdown-option selected text="Option 1 - 3" value="3"></d2l-labs-filter-dropdown-option>
	</d2l-menu>`;

const keyDownOn = (element, keycode) => {
	const event = new CustomEvent('keydown', {
		detail: 0,
		bubbles: true,
		cancelable: true,
		composed: true
	});
	event.keyCode = keycode;
	event.code = keycode;
	element.dispatchEvent(event);
};

describe('d2l-labs-filter-dropdown-option', () => {
	let container;
	let options = [];

	beforeEach(async() => {
		container = await fixture(basic);
		await container.updateComplete;
		options = container.querySelectorAll('d2l-labs-filter-dropdown-option');
	});

	it('should construct', () => {
		runConstructor('d2l-labs-filter-dropdown-option');
	});
	it('instantiating the element works', () => {
		expect('d2l-labs-filter-dropdown-option').to.equal(options[0].tagName.toLowerCase());
	});
	it('role is set properly', () => {
		expect(options[0].getAttribute('role')).to.equal('menuitemcheckbox');

	});
	it('fires d2l-menu-item-change event when item is clicked', async() => {
		setTimeout(() => options[0].click());
		const e = await oneEvent(options[0], 'd2l-menu-item-change');
		expect(e.detail.value).to.equal('1');
		expect(e.detail.selected).to.equal(true);
	});
	it('fires d2l-menu-item-change event when enter key pressed on item', async() => {
		setTimeout(() => keyDownOn(options[0], 13));
		const e = await oneEvent(options[0], 'd2l-menu-item-change');
		expect(e.detail.value).to.equal('1');
		expect(e.detail.selected).to.equal(true);
	});
	it('fires d2l-menu-item-change event when space key pressed on item', async() => {
		setTimeout(() => keyDownOn(options[0], 32));
		const e = await oneEvent(options[0], 'd2l-menu-item-change');
		expect(e.detail.value).to.equal('1');
		expect(e.detail.selected).to.equal(true);
	});
	it('should toggle state on selection', async() => {
		setTimeout(() => options[0].click());
		let e = await oneEvent(options[0], 'd2l-menu-item-change');
		expect(options[0].selected).to.equal(true);
		expect(e.detail.selected).to.equal(true);
		expect(e.detail.value).to.equal('1');
		await options[0].updateComplete;
		expect(window.getComputedStyle(options[0].shadowRoot.querySelector('d2l-icon')).getPropertyValue('visibility')).to.equal('visible');

		setTimeout(() => options[0].click());
		e = await oneEvent(options[0], 'd2l-menu-item-change');
		expect(options[0].selected).to.equal(false);
		expect(e.detail.selected).to.equal(false);
		expect(e.detail.value).to.equal('1');
		await options[0].updateComplete;
		expect(window.getComputedStyle(options[0].shadowRoot.querySelector('d2l-icon')).getPropertyValue('visibility')).to.equal('hidden');
	});
	it('does not affect other checkboxes in the menu when selected', async() => {
		setTimeout(() => options[0].click());
		await oneEvent(options[0], 'd2l-menu-item-change');
		expect(options[0].selected).to.equal(true);
		expect(options[1].selected).to.not.equal(true);
	});
});
