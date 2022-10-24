if (!customElements.get("variant-radios")) {
	// eslint-disable-next-line no-undef
	class VariantRadios extends VariantSelects {
		updateOptions() {
			const fieldsets = [...this.querySelectorAll("fieldset")];

			this.options = fieldsets.map(
				fieldset =>
					Array.from(fieldset.querySelectorAll("input")).find(radio => radio.checked).value
			);

			fieldsets.forEach($fieldset => {
				const { value } = [...$fieldset.querySelectorAll("input")].find(radio => radio.checked);
				const $legend = $fieldset.querySelector('.js-legend');

				$legend.innerHTML = `(${value})`;
			});
		}
	}

	customElements.define("variant-radios", VariantRadios);
}
