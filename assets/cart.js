/* global debounce, fetchConfig, routes, trapFocus */

// eslint-disable-next-line max-classes-per-file
class CartRemoveButton extends HTMLElement {
	constructor() {
		super();
		this.addEventListener("click", event => {
			event.preventDefault();
			const cartItems = this.closest("cart-items") || this.closest("cart-drawer-items");
			cartItems.updateQuantity(this.dataset.index, 0);
		});
	}
}

customElements.define("cart-remove-button", CartRemoveButton);

class CartItems extends HTMLElement {
	constructor() {
		super();

		this.lineItemStatusElement =
			document.getElementById("shopping-cart-line-item-status") ||
			document.getElementById("CartDrawer-LineItemStatus");

		this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]')).reduce(
			(total, quantityInput) => total + parseInt(quantityInput.value, 10),
			0
		);

		this.debouncedOnChange = debounce(event => {
			this.onChange(event);
		}, 300);

		this.addEventListener("change", this.debouncedOnChange.bind(this));
	}

	onChange(event) {
		this.updateQuantity(
			event.target.dataset.index,
			event.target.value,
			document.activeElement.getAttribute("name")
		);
	}

	// eslint-disable-next-line class-methods-use-this
	getSectionsToRender() {
		return [
			{
				id: "main-cart-items",
				section: document.getElementById("main-cart-items").dataset.id,
				selector: ".js-contents",
			},
			{
				id: "cart-icon-bubble",
				section: "cart-icon-bubble",
				selector: ".shopify-section",
			},
			{
				id: "cart-live-region-text",
				section: "cart-live-region-text",
				selector: ".shopify-section",
			},
			{
				id: "main-cart-footer",
				section: document.getElementById("main-cart-footer").dataset.id,
				selector: ".js-contents",
			},
		];
	}

	updateQuantity(line, quantity, name) {
		this.enableLoading(line);

		const body = JSON.stringify({
			line,
			quantity,
			sections: this.getSectionsToRender().map(section => section.section),
			sections_url: window.location.pathname,
		});

		fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
			.then(response => response.text())
			.then(state => {
				const parsedState = JSON.parse(state);
				this.classList.toggle("is-empty", 0 === parsedState.item_count);
				const cartDrawerWrapper = document.querySelector("cart-drawer");
				const cartFooter = document.getElementById("main-cart-footer");

				if (cartFooter) cartFooter.classList.toggle("is-empty", 0 === parsedState.item_count);
				if (cartDrawerWrapper)
					cartDrawerWrapper.classList.toggle("is-empty", 0 === parsedState.item_count);

				this.getSectionsToRender().forEach(section => {
					const elementToReplace =
						document.getElementById(section.id).querySelector(section.selector) ||
						document.getElementById(section.id);
					elementToReplace.innerHTML = this.getSectionInnerHTML(
						parsedState.sections[section.section],
						section.selector
					);
				});

				this.updateLiveRegions(line, parsedState.item_count);
				const lineItem =
					document.getElementById(`CartItem-${line}`) ||
					document.getElementById(`CartDrawer-Item-${line}`);
				if (lineItem && lineItem.querySelector(`[name="${name}"]`)) {
					// eslint-disable-next-line no-unused-expressions
					cartDrawerWrapper
						? trapFocus(cartDrawerWrapper, lineItem.querySelector(`[name="${name}"]`))
						: lineItem.querySelector(`[name="${name}"]`).focus();
				} else if (0 === parsedState.item_count && cartDrawerWrapper) {
					trapFocus(
						cartDrawerWrapper.querySelector(".js-drawer-inner-empty"),
						cartDrawerWrapper.querySelector("a")
					);
				} else if (document.querySelector(".js-cart-item") && cartDrawerWrapper) {
					trapFocus(cartDrawerWrapper, document.querySelector(".js-cart-item-name"));
				}
				this.disableLoading();
			})
			.catch(() => {
				this.querySelectorAll(".loading-overlay").forEach(overlay =>
					overlay.classList.add("hidden")
				);
				const errors =
					document.getElementById("cart-errors") ||
					document.getElementById("CartDrawer-CartErrors");
				errors.textContent = window.cartStrings.error;
				this.disableLoading();
			});
	}

	updateLiveRegions(line, itemCount) {
		if (this.currentItemCount === itemCount) {
			const lineItemError =
				document.getElementById(`Line-item-error-${line}`) ||
				document.getElementById(`CartDrawer-LineItemError-${line}`);
			const quantityElement =
				document.getElementById(`Quantity-${line}`) ||
				document.getElementById(`Drawer-quantity-${line}`);
			lineItemError.querySelector(".cart-item__error-text").innerHTML =
				window.cartStrings.quantityError.replace("[quantity]", quantityElement.value);
		}

		this.currentItemCount = itemCount;
		this.lineItemStatusElement.setAttribute("aria-hidden", true);

		const cartStatus =
			document.getElementById("cart-live-region-text") ||
			document.getElementById("CartDrawer-LiveRegionText");
		cartStatus.setAttribute("aria-hidden", false);

		setTimeout(() => {
			cartStatus.setAttribute("aria-hidden", true);
		}, 1000);
	}

	// eslint-disable-next-line class-methods-use-this
	getSectionInnerHTML(html, selector) {
		return new DOMParser().parseFromString(html, "text/html").querySelector(selector).innerHTML;
	}

	enableLoading(line) {
		const mainCartItems = document.getElementById("main-cart-items") || document.getElementById("CartDrawer-CartItems");
		mainCartItems.classList.add("pointer-events-none");

		const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading-overlay`);
		const cartDrawerItemElements = this.querySelectorAll(
			`#CartDrawer-Item-${line} .loading-overlay`
		);

		[...cartItemElements, ...cartDrawerItemElements].forEach(overlay =>
			overlay.classList.remove("hidden")
		);

		document.activeElement.blur();
		this.lineItemStatusElement.setAttribute("aria-hidden", false);
	}

	// eslint-disable-next-line class-methods-use-this
	disableLoading() {
		const mainCartItems = document.getElementById("main-cart-items") || document.getElementById("CartDrawer-CartItems");
		mainCartItems.classList.remove("pointer-events-none");
	}
}

customElements.define("cart-items", CartItems);

if (!customElements.get("cart-note")) {
	customElements.define(
		"cart-note",
		class CartNote extends HTMLElement {
			constructor() {
				super();

				this.addEventListener(
					"change",
					debounce(event => {
						const body = JSON.stringify({ note: event.target.value });
						fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } });
					}, 300)
				);
			}
		}
	);
}
