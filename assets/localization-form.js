if (!customElements.get("localization-form")) {
	class LocalizationForm extends HTMLElement {
		constructor() {
			super();

			this.$form = this.querySelector("form");
			this.$select = this.$form.querySelector("select");

			this.$select.addEventListener("change", () => this.$form.submit());
		}
	}

	customElements.define("localization-form", LocalizationForm);
}
