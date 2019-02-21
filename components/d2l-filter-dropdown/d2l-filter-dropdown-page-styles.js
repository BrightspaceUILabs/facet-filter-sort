import '@polymer/polymer/polymer-legacy.js';
import 'd2l-colors/d2l-colors.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-filter-dropdown-page-styles">
	<template strip-whitespace="">
		<style>
			d2l-menu {
				margin: 0 -1rem;
				width: unset;
			}
			.d2l-filter-dropdown-page-search {
				margin-bottom: 0.5rem;
			}
		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
