import '@polymer/polymer/polymer-legacy.js';
import 'd2l-colors/d2l-colors.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-filter-dropdown-page-styles">
	<template strip-whitespace="">
		<style>
			.d2l-filter-dropdown-option {
				cursor: pointer;
				border: 1px solid transparent;
				color: var(--d2l-color-ferrite);
				line-height: 1.2rem;
				font-size: 0.8rem;
				padding: 0.5rem 1rem;
			}
			.d2l-filter-dropdown-option:hover {
				background-color: var(--d2l-color-celestine-plus-2);
				border-top-color: var(--d2l-color-celestine-plus-1);
				border-bottom-color: var(--d2l-color-celestine-plus-1);
				color: var(--d2l-color-celestine);
			}
			.d2l-filter-dropdown-option:not([hidden]) ~ .d2l-filter-dropdown-option:not([hidden]) {
				border-top-color: var(--d2l-color-gypsum);
			}
			.d2l-filter-dropdown-option:not([hidden]) ~ .d2l-filter-dropdown-option:not([hidden]):hover {
				border-top-color: var(--d2l-color-celestine-plus-1);
				border-bottom-color: var(--d2l-color-celestine-plus-1);
			}
			.d2l-filter-dropdown-option d2l-icon {
				--d2l-icon-height: 1rem;
				--d2l-icon-width: 1rem;
				visibility: visible;
				margin-right: 0.5rem;
			}
			.d2l-filter-dropdown-page-search {
				position: relative;
				margin: 10px 20px;
			}
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
