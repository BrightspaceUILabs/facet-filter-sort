import '@brightspace-ui/core/components/icons/icon.js';
import { html, LitElement } from 'lit';
import { MenuItemRadioMixin } from '@brightspace-ui/core/components/menu/menu-item-radio-mixin.js';
import { menuItemSelectableStyles } from '@brightspace-ui/core/components/menu/menu-item-selectable-styles.js';

/**
 * A dropdown option menu item component.
 */
class LabsSortByDropdownOption extends MenuItemRadioMixin(LitElement) {

	static get styles() {
		return menuItemSelectableStyles;
	}

	render() {
		return html`
			<d2l-icon icon="tier1:check" aria-hidden="true"></d2l-icon>
			<span class="d2l-menu-item-text">${this.text}</span>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has('text') && this.selected) {
			this.dispatchEvent(new CustomEvent('d2l-labs-sort-by-dropdown-option-selected-text-change', {
				detail: { text: this.text },
				bubbles: true
			}));
		}
	}

}

customElements.define('d2l-labs-sort-by-dropdown-option', LabsSortByDropdownOption);
