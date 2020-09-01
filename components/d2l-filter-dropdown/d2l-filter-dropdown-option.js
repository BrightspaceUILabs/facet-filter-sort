import '@brightspace-ui/core/components/icons/icon.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { MenuItemSelectableMixin } from '@brightspace-ui/core/components/menu/menu-item-selectable-mixin.js';
import { menuItemSelectableStyles } from '@brightspace-ui/core/components/menu/menu-item-selectable-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

/**
 * A filter menu item component.
 */
class FilterDropdownOption extends RtlMixin(MenuItemSelectableMixin(LitElement)) {

	static get styles() {
		return [menuItemSelectableStyles, css`
			:host > span {
				white-space: normal;
			}
		`];
	}

	constructor() {
		super();
		this.role = 'menuitemcheckbox';
	}

	deselect() {
		this.selected = false;
		this.__onSelect(new CustomEvent('d2l-menu-item-select')); // passing in a blank event since the MenuItemSelectableMixin needs one
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);
		this.addEventListener('d2l-menu-item-select', (e) => {
			this.selected = !this.selected;
			this.__onSelect(e);
		});
	}

	render() {
		return html`
			<d2l-icon icon="tier1:check" aria-hidden="true"></d2l-icon>
			<span>${this.text}</span>
		`;
	}

}

customElements.define('d2l-filter-dropdown-option', FilterDropdownOption);
