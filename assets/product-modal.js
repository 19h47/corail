if (!customElements.get("product-modal")) {
	class ProductModal extends ModalDialog {
		hide() {
			super.hide();
		}

		show(opener) {
			super.show(opener);
			this.showActiveMedia();
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
