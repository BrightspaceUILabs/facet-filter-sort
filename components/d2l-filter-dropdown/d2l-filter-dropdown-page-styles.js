import '@polymer/polymer/polymer-legacy.js';
import 'd2l-colors/d2l-colors.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-filter-dropdown-page-styles">
	<template strip-whitespace="">
		<style>
			:host {
				--d2l-filter-dropdown-page-search-height: 45px;
			}
			:host iron-input {
				display: block;
			}
			.d2l-filter-dropdown-clear-button {
				position: absolute;
				top: 0px;
				right: 0px;
				margin: calc(var(--d2l-filter-dropdown-page-search-height) / 6);
				background: none;
				border: 1px solid transparent;
				cursor: pointer;
				height: calc(2 * var(--d2l-filter-dropdown-page-search-height) / 3);
				width: calc(2 * var(--d2l-filter-dropdown-page-search-height) / 3);
			}
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
			.d2l-filter-dropdown-page-search-input {
				color: var(--d2l-color-ferrite);
				font-family: inherit;
				font-size: calc(var(--d2l-filter-dropdown-page-search-height) / 3) !important;
				width: 100%;
				height: var(--d2l-filter-dropdown-page-search-height);
				border: 1px solid var(--d2l-color-titanius);
				border-radius: .3rem;
				box-shadow: inset 0 2px 0 0 rgba(185,194,208,.2);
				box-sizing: border-box;
				transition: background-color 0.5s ease, border-color 0.5s ease;
				-webkit-transition: background-color 0.5s ease, border-color 0.5s ease;
				padding-left: calc(var(--d2l-filter-dropdown-page-search-height) / 6);
				padding-right: var(--d2l-filter-dropdown-page-search-height);
			}
			.d2l-filter-dropdown-page-search-input:focus,
			.d2l-filter-dropdown-page-search-input:hover {
				border-color: var(--d2l-color-celestine);
				border-width: 2px;
				outline: 0;
				/* Subtract 1px for increased border width */
				padding-left: calc(var(--d2l-filter-dropdown-page-search-height) / 6 - 1px);
				padding-right: calc(var(--d2l-filter-dropdown-page-search-height) - 1px);
			}
			.d2l-filter-dropdown-page-search-input::-ms-clear {
				display: none;
			}
			.d2l-filter-dropdown-search-clear:hover,
			.d2l-filter-dropdown-search-clear:focus {
				border-color: var(--d2l-color-pressicus);
				border-radius: 0.3rem;
			}
			.d2l-filter-dropdown-search-clear d2l-icon {
				--d2l-icon-height: calc(var(--d2l-filter-dropdown-page-search-height) / 3);
				--d2l-icon-width: calc(var(--d2l-filter-dropdown-page-search-height) / 3);
				color: var(--d2l-color-ferrite);
			}
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
