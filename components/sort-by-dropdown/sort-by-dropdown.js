import '@brightspace-ui/core/components/dropdown/dropdown-button-subtle.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
import '@brightspace-ui/core/components/menu/menu.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import { LocalizeBehavior } from '../localize-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

/**
 * Polymer-based web component for D2L sort by dropdown component
 * @slot - Contains the dropdown options (e.g., d2l-labs-sort-by-dropdown-options)
 * @fires d2l-labs-sort-by-dropdown-change - Dispatched when option is selected
 */
class LabsSortByDropdown extends mixinBehaviors(
	[
		LocalizeBehavior
	],
	PolymerElement
) {
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
				computed: '_computeSelectedOptionText(_text, localize, resources)'
			},
			/**
			* The text of the currently selected option
			*/
			_text: {
				type: String,
				value: ''
			},

			/**
			* Whether this dropdown should be disabled
			*/
			disabled: {
				type: Boolean,
				value: false
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

	static get is() { return 'd2l-labs-sort-by-dropdown'; }

	static get template() {
		return html`
			<style>
				:host {
					display: inline-block;
				}
				:host([hidden]) {
					display: none;
				}
			</style>
			<d2l-dropdown-button-subtle text="[[_selectedOptionText]]" disabled="[[disabled]]">
				<d2l-dropdown-menu align="[[align]]" no-pointer="" vertical-offset="10" >
					<d2l-menu id="d2l-labs-sort-by-menu" label="[[label]]">
					<slot></slot>
					</d2l-menu>
				</d2l-dropdown-menu>
			</d2l-dropdown-button-subtle>
        `;
	}

	connectedCallback() {
		super.connectedCallback();
		this._boundListeners = { _onItemSelect: this._onItemSelect.bind(this) };
		afterNextRender(this, () => {
			// Issues with event bubbling in Edge/IE11 - need to listen directly on the menu
			this.$['d2l-labs-sort-by-menu'].addEventListener('d2l-menu-item-change',
				this._boundListeners._onItemSelect);

			const effectiveChildren = FlattenedNodesObserver.getFlattenedNodes(this)
				.filter((n) => { return n.nodeType === Node.ELEMENT_NODE; });

			let initialOption = effectiveChildren.filter((child) => {
				return child.selected;
			})[0];

			if (!initialOption) {
				// Select the first option if none are selected
				initialOption = effectiveChildren[0];
				initialOption.setAttribute('selected', true);
			}

			this._text = initialOption.text;
			this.value = initialOption.value;
		});

		this._selectedTextChangeHandler = e => this._text = e.detail.text;
		this.addEventListener('d2l-labs-sort-by-dropdown-option-selected-text-change', this._selectedTextChangeHandler);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.$['d2l-labs-sort-by-menu'].removeEventListener('d2l-menu-item-change',
			this._boundListeners._onItemSelect
		);
		this.removeEventListener('d2l-labs-sort-by-dropdown-option-selected-text-change', this._selectedTextChangeHandler);
	}

	_computeSelectedOptionText(selection, localize, resources) {
		if (!selection || !localize || !resources) return;
		return this.compact
			? this.localize('sort')
			: this.localize('sortWithOption', 'option', selection);
	}

	_onItemSelect(e) {
		this._text = e.target.text;
		this.value = e.detail.value;

		this.dispatchEvent(new CustomEvent(
			'd2l-labs-sort-by-dropdown-change',
			{ bubbles: true, composed: true, detail: { value: this.value } }
		));
	}

}
customElements.define(LabsSortByDropdown.is, LabsSortByDropdown);
