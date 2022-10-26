
class VariantSelects extends HTMLElement {
	constructor() {
		super();
		this.addEventListener("change", this.onVariantChange);
	}

	onVariantChange() {
		this.updateOptions();
		this.updateMasterId();
		this.toggleAddButton(true, "", false);
		this.updatePickupAvailability();
		this.removeErrorMessage();

		if (!this.currentVariant) {
			this.toggleAddButton(true, "", true);
			this.setUnavailable();
		} else {
			this.updateMedia();
			this.updateURL();
			this.updateVariantInput();
			this.renderProductInfo();
			this.updateShareUrl();
		}
	}

	updateOptions() {
		this.options = Array.from(this.querySelectorAll("select"), select => select.value);
	}

	updateMasterId() {
		this.currentVariant = this.getVariantData().find(
			variant =>
				!variant.options.map((option, index) => this.options[index] === option).includes(false)
		);
	}

	updateMedia() {
		if (!this.currentVariant) return;
		if (!this.currentVariant.featured_media) return;

		const mediaGalleries = document.querySelectorAll(
				`[id^="MediaGallery-${this.dataset.section}"]`
		);
		mediaGalleries.forEach(mediaGallery =>
			mediaGallery.setActiveMedia(
					`${this.dataset.section}-${this.currentVariant.featured_media.id}`,
					true
			)
		);

		const modalContent = document.querySelector(
				`#ProductModal-${this.dataset.section} .product-media-modal__content`
		);
		if (!modalContent) return;
		const newMediaModal = modalContent.querySelector(
				`[data-media-id="${this.currentVariant.featured_media.id}"]`
		);
		modalContent.prepend(newMediaModal);
	}

	updateURL() {
		if (!this.currentVariant || "false" === this.dataset.updateUrl) return;
		window.history.replaceState({}, "", `${this.dataset.url}?variant=${this.currentVariant.id}`);
	}

	updateShareUrl() {
		const shareButton = document.getElementById(`Share-${this.dataset.section}`);
		if (!shareButton || !shareButton.updateUrl) return;
		shareButton.updateUrl(
				`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`
		);
	}

	updateVariantInput() {
		const productForms = document.querySelectorAll(
				`#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`
		);
		productForms.forEach(productForm => {
			const input = productForm.querySelector('input[name="id"]');
			input.value = this.currentVariant.id;
			input.dispatchEvent(new Event("change", { bubbles: true }));
		});
	}

	updatePickupAvailability() {
		const pickUpAvailability = document.querySelector("pickup-availability");
		if (!pickUpAvailability) return;

		if (this.currentVariant && this.currentVariant.available) {
			pickUpAvailability.fetchAvailability(this.currentVariant.id);
		} else {
			pickUpAvailability.removeAttribute("available");
			pickUpAvailability.innerHTML = "";
		}
	}

	removeErrorMessage() {
		const section = this.closest("section");

		console.log(section);

		if (!section) {
			return;
		}

		const productForm = section.querySelector("product-form");

		console.log(productForm)

		if (productForm) {
			productForm.handleErrorMessage();
		}
	}

	renderProductInfo() {
		fetch(
				`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${
					this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section
				}`
		)
			.then(response => response.text())
			.then(responseText => {
				const html = new DOMParser().parseFromString(responseText, "text/html");
				const destination = document.getElementById(`price-${this.dataset.section}`);
				const source = html.getElementById(
						`price-${
							this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section
						}`
				);
				if (source && destination) destination.innerHTML = source.innerHTML;

				const price = document.getElementById(`price-${this.dataset.section}`);

				if (price) price.classList.remove("sr-only");
				this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
			});
	}

	// eslint-disable-next-line default-param-last
	toggleAddButton(disable = true, text, modifyClass = true) {
		console.log('toggleAddButton');

		const productForm = document.getElementById(`product-form-${this.dataset.section}`);

		if (!productForm) {
			return;
		}

		const addButton = productForm.querySelector('[name="add"]');
		const addButtonText = addButton.querySelector("span");
		const addQuick = document.querySelector('[name="add-quick"]');
		const addQuickText = addQuick.querySelector('span');

		if (!addButton) {
			return;
		}

		if (disable) {
			addButton.setAttribute("disabled", "disabled");
			addQuick.setAttribute("disabled", "disabled");

			if (text) {
				addButtonText.textContent = text;
				addQuickText.textContent = text;
			}
		} else {
			addButton.removeAttribute("disabled");
			addButtonText.textContent = window.variantStrings.addToCart;
			addQuick.removeAttribute("disabled");
			addQuickText.textContent = window.variantStrings.addToCart;
		}

		// eslint-disable-next-line no-useless-return
		if (!modifyClass) return;
	}

	setUnavailable() {
		const button = document.getElementById(`product-form-${this.dataset.section}`);
		const addButton = button.querySelector('[name="add"]');
		const addButtonText = button.querySelector('[name="add"] > span');
		const addQuick = document.querySelector('[name="add-quick"]');
		const addQuickText = addQuick.querySelector("span");
		const price = document.getElementById(`price-${this.dataset.section}`);

		if (!addButton) {
			return;
		}

		addButtonText.textContent = window.variantStrings.unavailable;
		addQuickText.textContent = window.variantStrings.unavailable;

		if (price) {
			price.classList.add("sr-only");
		}
	}

	getVariantData() {
		this.variantData =
				this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
		return this.variantData;
	}
}

customElements.define("variant-selects", VariantSelects);
