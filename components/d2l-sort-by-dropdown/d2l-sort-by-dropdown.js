import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-dropdown/d2l-dropdown-button-subtle.js';
import 'd2l-menu/d2l-menu.js';
import './d2l-filter-sort-opener.js';
import './d2l-sort-by-dropdown-localize-behavior.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-sort-by-dropdown">
	<template strip-whitespace="">
		<style>
			:host {
				display: inline-block;
			}
		</style>
		<d2l-filter-sort-opener text="[[_selectedOptionText]]">
			<d2l-dropdown-menu align="[[align]]" no-pointer="" vertical-offset="10" id="d2l-sort-by-dropdown-menu">
				<d2l-menu label="[[label]]">
				  <slot></slot>
				</d2l-menu>
			  </d2l-dropdown-menu>
		</d2l-filter-sort-opener>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/**
 * `<d2l-sort-by-dropdown>`
 * Polymer-based web component for D2L sort by dropdown component
 */
class SortByDropdown extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.SortByDropdown.LocalizeBehavior
	],
	PolymerElement
) {
	static get is() { return 'd2l-sort-by-dropdown'; }
	static get properties() {
		return {
			/**
			* Reference to bound listener functions to be removed in disconnectedCallback
			*/
			_boundListeners: {
				type: Object,
				value: function() {
					return {
						_onItemSelect: null
					};
				}
			},
			/**
			* The text of the selected option, after localization
			*/
			_selectedOptionText: {
				type: String,
			},
			/**
			* The text of the currently selected option
			*/
			_text: {
				type: String,
				value: '',
				observer: function(selection) {
					this._selectedOptionText = this.compact
						? this.localize('sort')
						: this.localize('sortWithOption', 'option', selection);
				}
			},

			/**
			* Indicates whether the dropdown is in compact mode or not. The selection text
			* will not be visible when compact is true
			*/
			compact: {
				type: Boolean,
				value: false
			},
			/**
			* Alignment of dropdown menu
			*/
			align: {
				type: String,
				value: 'start'
			},
			/**
			* Label for the dropdown-menu
			*/
			label: {
				type: String,
				value: ''
			},
			/**
			* The value of the currently selected option
			*/
			value: {
				type: String,
				reflectToAttribute: true
			}
		};
	}

	connectedCallback() {
		super.connectedCallback();
		this._boundListeners = { _onItemSelect: this._onItemSelect.bind(this) };
		afterNextRender(this, function() {
			this.$['d2l-sort-by-dropdown-menu'].addEventListener('d2l-menu-item-change',
				this._boundListeners._onItemSelect);

			const effectiveChildren = FlattenedNodesObserver.getFlattenedNodes(this)
				.filter(function(n) { return n.nodeType === Node.ELEMENT_NODE; });

			let initialOption = effectiveChildren.find(function(child) {
				return child.selected;
			}.bind(this));

			if (!initialOption) {
				// Select the first option if none are selected
				initialOption = effectiveChildren[0];
				initialOption.setAttribute('selected', true);
			}

			this._text = initialOption.text;
			this.value = initialOption.value;
		}.bind(this));
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.$['d2l-sort-by-dropdown-menu'].removeEventListener('d2l-menu-item-change',
			this._boundListeners._onItemSelect);
	}

	_onItemSelect(e) {
		this._text = e.target.text;
		this.value = e.detail.value;

		this.dispatchEvent(new CustomEvent(
			'd2l-sort-by-dropdown-change',
			{ bubbles: true, composed: true, detail: { value: this.value } }
		));
	}

}
customElements.define(SortByDropdown.is, SortByDropdown);
