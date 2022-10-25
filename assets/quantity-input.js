class QuantityInput extends HTMLElement {
	constructor() {
		super();
		this.input = this.querySelector("input");
		this.changeEvent = new Event("change", { bubbles: true });

		this.querySelectorAll("button").forEach(button => button.addEventListener("click", this.onButtonClick.bind(this)));
	}

	onButtonClick(event) {
		console.log(event.target.name);

		event.preventDefault();
		const previousValue = this.input.value;

		if ("plus" === event.target.name) {
			this.input.stepUp();
		}

		if ("minus" === event.target.name) {
			this.input.stepDown();
		}

		if (previousValue !== this.input.value) {
			this.input.dispatchEvent(this.changeEvent);
		}
	}
}

customElements.define("quantity-input", QuantityInput);
