import '@brightspace-ui/core/components/icons/icon.js';
import { css, html, LitElement } from 'lit';
import { MenuItemSelectableMixin } from '@brightspace-ui/core/components/menu/menu-item-selectable-mixin.js';
import { menuItemSelectableStyles } from '@brightspace-ui/core/components/menu/menu-item-selectable-styles.js';

/**
 * A filter menu item component.
 */
class LabsFilterDropdownOption extends MenuItemSelectableMixin(LitElement) {

	static get styles() {
		return [menuItemSelectableStyles, css`
			.d2l-menu-item-text {
				white-space: normal;
			}
		`];
	}

	constructor() {
		super();
		this.role = 'menuitemcheckbox';
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
			<span class="d2l-menu-item-text">${this.text}</span>
		`;
	}

	deselect() {
		this.selected = false;
		this.__onSelect(new CustomEvent('d2l-menu-item-select')); // passing in a blank event since the MenuItemSelectableMixin needs one
	}

}

customElements.define('d2l-labs-filter-dropdown-option', LabsFilterDropdownOption);
