class CartNotification extends HTMLElement {
	constructor() {
		super();

		this.notification = document.getElementById('cart-notification');
		this.onBodyClick = this.handleBodyClick.bind(this);

		this.notification.addEventListener('keyup', evt => 'Escape' === evt.code && this.close());

		this.querySelectorAll('button[type="button"]').forEach($button => $button.addEventListener('click', this.close.bind(this)));
	}

	open() {
		this.notification.classList.add('animate', 'active');

		this.notification.addEventListener('transitionend', () => {
			this.notification.focus();
			trapFocus(this.notification);
		}, { once: true });

		document.body.addEventListener('click', this.onBodyClick);
	}

	close() {
		this.notification.classList.remove('active');
		document.body.removeEventListener('click', this.onBodyClick);

		removeTrapFocus(this.activeElement);
	}

	renderContents(parsedState) {
		this.cartItemKey = parsedState.key;

		this.getSectionsToRender().forEach((section => {
			console.log(section, section.selector)
			document.getElementById(section.id).innerHTML = this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
		}));


		this.open();
	}

	getSectionsToRender() {
		return [
			{
				id: 'cart-notification-product',
				selector: `[id="cart-notification-product-${this.cartItemKey}"]`,
			},
			{
				id: 'cart-notification-button'
			},
			{
				id: 'cart-icon-bubble'
			}
		];
	}

	getSectionInnerHTML(html, selector = '.shopify-section') {
		return new DOMParser()
			.parseFromString(html, 'text/html')
			.querySelector(selector).innerHTML;
	}

	handleBodyClick({target}) {
		if (target !== this.notification && !target.closest('cart-notification')) {
			const disclosure = target.closest('details-disclosure, header-menu');
			this.activeElement = disclosure ? disclosure.querySelector('summary') : null;
			this.close();
		}
	}

	setActiveElement(element) {
		this.activeElement = element;
	}
}

customElements.define('cart-notification', CartNotification);
