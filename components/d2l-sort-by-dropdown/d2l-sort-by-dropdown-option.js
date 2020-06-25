import '@brightspace-ui/core/components/icons/icon.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { MenuItemRadioMixin } from '@brightspace-ui/core/components/menu/menu-item-radio-mixin.js';
import { menuItemSelectableStyles } from '@brightspace-ui/core/components/menu/menu-item-selectable-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

/**
 * A dropdown option menu item component.
 */
class SortByDropdownOption extends RtlMixin(MenuItemRadioMixin(LitElement)) {

	static get styles() {
		return menuItemSelectableStyles;
	}

	render() {
		return html`
			<d2l-icon icon="tier1:check" aria-hidden="true"></d2l-icon>
			<span>${this.text}</span>
		`;
	}

}

customElements.define('d2l-sort-by-dropdown-option', SortByDropdownOption);
