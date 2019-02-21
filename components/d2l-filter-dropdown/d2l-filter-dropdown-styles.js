import '@polymer/polymer/polymer-legacy.js';
import 'd2l-colors/d2l-colors.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-filter-dropdown-styles">
	<template strip-whitespace="">
		<style>
			d2l-dropdown-content {
				--d2l-dropdown-verticaloffset: 5px;
			}
			.d2l-dropdown-opener {
				background: none;
				border: none;
				cursor: pointer;
				font-size: 0.95rem;
				font-family: Lato;
				margin-left: 1rem;
				outline: none;
				padding: 0;
			}
			button:focus > d2l-icon,
			button:hover > d2l-icon,
			button:focus > span,
			button:hover > span {
				text-decoration: underline;
				color: var(--d2l-color-celestine);
			}
			.d2l-filter-dropdown-content-header {
				border-bottom: 1px solid var(--d2l-color-titanius);
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				margin: 0 -1rem;
				padding: 0 1rem 1rem 1rem;
			}
			.d2l-filter-dropdown-content-header > span {
				align-self: center;
			}
			d2l-tab-panel {
				margin: -1px -1rem 0 -1rem;
				border-top: 1px solid var(--d2l-color-gypsum);
				padding: 1.2rem 1rem 0 1rem;
			}
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
