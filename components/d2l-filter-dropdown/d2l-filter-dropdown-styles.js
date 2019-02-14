import '@polymer/polymer/polymer-legacy.js';
import 'd2l-colors/d2l-colors.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-filter-dropdown-styles">
	<template strip-whitespace="">
		<style>
			d2l-dropdown {
				min-width: 100%;
			}
			d2l-dropdown-content {
				--d2l-dropdown-verticaloffset: 5px;
			}
			.d2l-dropdown-opener {
				background: none;
				border: none;
				cursor: pointer;
				outline: none;
				font-size: 0.95rem;
				font-family: Lato;
				padding: 0;
				margin-left: 1rem;
			}
			.d2l-filter-dropdown-tab {
				display: inline-block;
			}
			.d2l-filter-dropdown-clear-button {
				color: var(--d2l-color-celestine);
				background: none;
				border: none;
				cursor: pointer;
				margin: 0 !important;
				padding: 0;
			}
			.d2l-filter-dropdown-content-header {
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid var(--d2l-color-titanius);
				width: 100%;
				padding: 20px;
			}
			.d2l-filter-dropdown-tab-button {
				background: none;
				border: none;
				color: var(--d2l-color-ferrite);
				cursor: pointer;
				display: inherit;
				font-family: inherit;
				outline: none;
				padding: 10px;
			}
			.d2l-filter-dropdown-tab-highlight {
				background-color: var(--d2l-color-celestine);
				border-bottom-left-radius: 4px;
				border-bottom-right-radius: 4px;
				height: 4px;
				margin: auto;
				width: 80%;
			}
			.d2l-filter-dropdown-tab-selector {
				display: block;
				align-items: center;
				overflow-x: auto;
				white-space: nowrap;
				width: 100%;
				height: 100%;
				background: linear-gradient(to top, white, #f9fafb);
			}

			button:focus > d2l-icon,
			button:hover > d2l-icon,
			button:focus > span,
			button:hover > span {
				text-decoration: underline;
				color: var(--d2l-color-celestine);
			}
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
