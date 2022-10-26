if (!customElements.get("variant-radios")) {
	// eslint-disable-next-line no-undef
	class VariantRadios extends VariantSelects {
		constructor() {
			super();

			this.fieldsets = [...this.querySelectorAll("fieldset")];

			this.addEventListener("change", this.updateVariantButtons);
		}

		updateOptions() {
			this.options = this.fieldsets.map(
				fieldset =>
					Array.from(fieldset.querySelectorAll("input")).find(radio => radio.checked).value
			);
		}

		updateVariantButtons() {
			this.fieldsets.forEach($fieldset => {
				const $variantButtons = document.querySelector(`variant-buttons[data-section="${this.getAttribute('data-section')}"]`);

				const { value } = [...$fieldset.querySelectorAll("input")].find(radio => radio.checked);
				const $legend = $fieldset.querySelector('.js-legend');

				$legend.innerHTML = `(${value})`;

				if ($variantButtons) {
					const variantButtonsfieldsets = [...$variantButtons.querySelectorAll("fieldset")];

					variantButtonsfieldsets.forEach($variantButtonsfieldset => {
						const $input = [...$variantButtonsfieldset.querySelectorAll('input')].find($i => $i.value === value);

						if ($input) {
							$input.checked = true;
						}
					});
				}
			});
		}
	}

	customElements.define("variant-radios", VariantRadios);
}
