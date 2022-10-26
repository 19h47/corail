if (!customElements.get("variant-buttons")) {
	// eslint-disable-next-line no-undef
	class VariantButtons extends HTMLElement {
		constructor() {
			super();

			this.section = this.getAttribute('data-section');

			this.fieldsets = [...this.querySelectorAll("fieldset")];
			this.$variantRadios = document.querySelector(`variant-radios[data-section="${this.section}"]`);
			this.variantRadiosInputs = [...this.$variantRadios.querySelectorAll("input")];

			this.addEventListener("change", this.onVariantChange);
		}

		onVariantChange() {
			this.fieldsets.forEach($fieldset => {
				const { value } = [...$fieldset.querySelectorAll("input")].find(radio => radio.checked);
				const $input = this.variantRadiosInputs.find($i => $i.value === value);

				console.log($input, value);

				if ($input) {
					$input.checked = true;
					this.$variantRadios.onVariantChange();
				}
			});
		}
	}

	customElements.define("variant-buttons", VariantButtons);
}
