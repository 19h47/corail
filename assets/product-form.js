/* global routes */

if (!customElements.get('product-form')) {
	customElements.define('product-form', class ProductForm extends HTMLElement {
		constructor() {
			super();

			this.form = this.querySelector('form');
			this.form.querySelector('[name=id]').disabled = false;
			this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
			this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');

			this.submitButton = this.querySelector('[type="submit"]');
			this.submitQuick = document.querySelector('[name="add-quick"]');

			if (document.querySelector('cart-drawer')) {
				this.submitButton.setAttribute('aria-haspopup', 'dialog');

				if (this.submitQuick) {
					this.submitQuick.setAttribute('aria-haspopup', 'dialog');
				}
			}
		}

		onSubmitHandler(evt) {
			evt.preventDefault();

			if ('true' === this.submitButton.getAttribute('aria-disabled')) {
				return;
			}

			this.handleErrorMessage();

			this.submitButton.setAttribute('aria-disabled', true);
			this.submitButton.classList.add('loading');

			if (this.submitQuick) {
				this.submitQuick.setAttribute('aria-disabled', true);
				this.submitQuick.classList.add('loading');
			}

			this.querySelector('.js-loading-overlay-spinner').classList.remove('hidden');

			// eslint-disable-next-line no-undef
			const config = fetchConfig('javascript');
			config.headers['X-Requested-With'] = 'XMLHttpRequest';
			delete config.headers['Content-Type'];

			const formData = new FormData(this.form);

			if (this.cart) {
				formData.append('sections', this.cart.getSectionsToRender().map(section => section.id));
				formData.append('sections_url', window.location.pathname);
				this.cart.setActiveElement(document.activeElement);
			}

			config.body = formData;

			fetch(`${routes.cart_add_url}`, config)
				.then(response => response.json())
				.then(response => {
					if (response.status) {
						this.handleErrorMessage(response.description);

						const soldOutMessage = this.submitButton.querySelector('.sold-out-message');

						if (!soldOutMessage) {
							return;
						}

						this.submitButton.setAttribute('aria-disabled', true);
						this.submitButton.querySelector('span').classList.add('hidden');

						if (this.submitQuick) {
							this.submitQuick.setAttribute('aria-disabled', true);
							this.submitQuick.querySelector('span').classList.add('hidden');
						}

						soldOutMessage.classList.remove('hidden');
						this.error = true;
						return;
					} if (!this.cart) {
						window.location = window.routes.cart_url;
						return;
					}

					this.error = false;
					const quickAddModal = this.closest('quick-add-modal');

					if (quickAddModal) {
						document.body.addEventListener('modalClosed', () => {
							setTimeout(() => { this.cart.renderContents(response) });
						}, { once: true });
						quickAddModal.hide(true);
					} else {
						this.cart.renderContents(response);
					}
				})
				.catch(e => {
					console.error(e);
				})
				.finally(() => {
					this.submitButton.classList.remove('loading');

					if (this.submitQuick) {
						this.submitQuick.classList.remove('loading');
					}

					if (this.cart && this.cart.classList.contains('is-empty')) {
						this.cart.classList.remove('is-empty');
					}

					if (!this.error) {
						this.submitButton.removeAttribute('aria-disabled');

						if (this.submitQuick) {
							this.submitQuick.removeAttribute('aria-disabled');
						}
					}

					this.querySelector('.js-loading-overlay-spinner').classList.add('hidden');
				});
		}

		handleErrorMessage(errorMessage = false) {
			this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');

			if (!this.errorMessageWrapper) {
				return;
			}

			this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

			this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

			if (errorMessage) {
				this.errorMessage.textContent = errorMessage;
			}
		}
	});
}
