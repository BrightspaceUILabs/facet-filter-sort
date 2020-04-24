import '@polymer/polymer/polymer-legacy.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '@brightspace-ui/core/components/icons/icon.js';
import 'd2l-menu/d2l-menu-item-selectable-styles.js';
import 'd2l-menu/d2l-menu-item-selectable-behavior.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-filter-dropdown-option">
	<template strip-whitespace="">
		<style include="d2l-menu-item-selectable-styles">
			:host > span {
				white-space: normal;
			}
		</style>
		<d2l-icon icon="tier1:check" aria-hidden="true"></d2l-icon>
		<span>[[text]]</span>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-filter-dropdown-option',

	behaviors: [
		D2L.PolymerBehaviors.MenuItemSelectableBehavior
	],

	hostAttributes: {
		'role': 'menuitemcheckbox'
	},

	attached: function() {
		afterNextRender(this, function() {
			this.listen(this, 'd2l-menu-item-select', '_onSelect');
		}.bind(this));
	},

	detached: function() {
		this.unlisten(this, 'd2l-menu-item-select', '_onSelect');
	},

	_onSelect: function(e) {
		this.set('selected', !this.selected);
		this.__onSelect(e);
	}

});
