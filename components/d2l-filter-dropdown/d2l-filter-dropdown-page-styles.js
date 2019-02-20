import '@polymer/polymer/polymer-legacy.js';
import 'd2l-colors/d2l-colors.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-filter-dropdown-page-styles">
	<template strip-whitespace="">
		<style>
			.d2l-filter-dropdown-option {
				border: 1px solid transparent;
				color: var(--d2l-color-ferrite);
				cursor: pointer;
				font-size: 0.8rem;
				line-height: 1.2rem;
				margin: 0 -1rem;
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
				margin-right: 0.5rem;
				visibility: visible;
			}
			.d2l-filter-dropdown-page-search {
				margin-bottom: 0.5rem;
			}
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
