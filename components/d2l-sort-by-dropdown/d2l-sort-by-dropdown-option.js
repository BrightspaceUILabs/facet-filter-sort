import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import '@brightspace-ui/core/components/icons/icon.js';
import 'd2l-menu/d2l-menu-item-radio-behavior.js';
import 'd2l-menu/d2l-menu-item-selectable-styles.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-sort-by-dropdown-option">
	<template strip-whitespace="">
		<style include="d2l-menu-item-selectable-styles">
			/*
			* https://github.com/Polymer/tools/issues/408
			* Empty style blocks break linter.
			*/
			:host {}
		</style>
		<d2l-icon icon="tier1:check" aria-hidden="true"></d2l-icon>
		<span>[[text]]</span>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
/**
 * `<d2l-sort-by-dropdown-option>`
 * Option for sort by dropdown
 */
class SortByOption extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.MenuItemRadioBehavior
	],
	PolymerElement
) {
	static get is() { return 'd2l-sort-by-dropdown-option'; }
	static get properties() {
		return {
			text: {
				type: String
			},
			value: {
				type: String
			}
		};
	}
}
customElements.define(SortByOption.is, SortByOption);
