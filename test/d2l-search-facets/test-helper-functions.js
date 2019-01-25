/* exported selectOption */

// Clicking the option doesn't seem to trigger the change event, so this function
// explicitly triggers it on the checkbox
function selectOption(option, selected = true) {
	const element = option.shadowRoot.querySelector('d2l-input-checkbox');
	element.checked = selected;

	const changeEvent = new Event('change');
	element.dispatchEvent(changeEvent);
}
