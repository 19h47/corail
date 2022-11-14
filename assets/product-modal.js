/* global trapFocus */

if (!customElements.get("product-modal")) {
	class ProductModal extends HTMLElement {
		constructor() {
			super();

			this.querySelector('[id^="ModalClose-"]').addEventListener(
				"click",
				this.hide.bind(this, false)
			);

			// this.addEventListener("keyup", event => {
			// 	if ("ESCAPE" === event.code.toUpperCase()) this.hide();
			// });

			// if (this.classList.contains("media-modal")) {
			// 	this.addEventListener("pointerup", event => {
			// 		if ("mouse" === event.pointerType && !event.target.closest("deferred-media, product-model"))
			// 			this.hide();
			// 	});
			// } else {
			// 	this.addEventListener("click", event => {
			// 		if (event.target === this) this.hide();
			// 	});
			// }

			const images = [...this.querySelectorAll('.js-product-modal-image')];
			const container = this.querySelector('[role="document"]');

			images.forEach($image => {
				$image.classList.add('cursor-zoom-in');

				$image.addEventListener('click', () => {
					if ($image.style.width) {
						$image.style.removeProperty('width');
						$image.classList.remove('cursor-zoom-out');
						$image.classList.add('cursor-zoom-in');

					} else {
						$image.style.setProperty('width', 'auto');
						$image.classList.add('cursor-zoom-out');
						$image.classList.remove('cursor-zoom-in');

					}

					container.scrollTop = ($image.height - container.clientHeight) / 2;
					container.scrollLeft = ($image.width - container.clientWidth) / 2;
				})
			})
		}

		connectedCallback() {
			if (this.moved) return;
			this.moved = true;
			document.body.appendChild(this);
		}

		show(opener) {
			this.openedBy = opener;
			const popup = this.querySelector(".template-popup");
			document.body.classList.add("overflow-hidden");
			this.setAttribute("open", "");

			if (popup) {
				popup.loadContent();
			}

			trapFocus(this, this.querySelector('[role="dialog"]'));

			window.pauseAllMedia();
			this.showActiveMedia();
		}

		hide() {
			document.body.classList.remove("overflow-hidden");
			document.body.dispatchEvent(new CustomEvent("modalClosed"));
			this.removeAttribute("open");

			// removeTrapFocus(this.openedBy);

			window.pauseAllMedia();
		}

		showActiveMedia() {
			this.querySelectorAll(
				`[data-media-id]:not([data-media-id="${this.openedBy.getAttribute("data-media-id")}"])`
			).forEach(element => element.classList.remove("active"));

			const activeMedia = this.querySelector(
				`[data-media-id="${this.openedBy.getAttribute("data-media-id")}"]`
			);
			const activeMediaTemplate = activeMedia.querySelector("template");
			const activeMediaContent = activeMediaTemplate ? activeMediaTemplate.content : null;

			activeMedia.classList.add("active");
			activeMedia.scrollIntoView({
				behavior: 'auto',
				block: 'center',
				inline: 'center'
			});

			const container = this.querySelector('[role="document"]');

			container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;

			if (
				"DEFERRED-MEDIA" === activeMedia.nodeName &&
				activeMediaContent &&
				activeMediaContent.querySelector(".js-youtube")
			) {
				activeMedia.loadContent();
			}
		}
	}

	customElements.define("product-modal", ProductModal);
}
