/* global debounce */
if (!customElements.get("media-gallery")) {
	class MediaGallery extends HTMLElement {
		constructor() {
			super();

			this.elements = {
				liveRegion: this.querySelector('[id^="GalleryStatus"]'),
				viewer: this.querySelector('[id^="GalleryViewer"] .swiper'),
				thumbnails: this.querySelector('[id^="GalleryThumbnails"]'),
				thumbs: this.querySelector('[id^="GalleryThumbs"] .swiper'),
			};
			this.mql = window.matchMedia("(min-width: 750px)");

			if (!this.elements.thumbnails) {
				return;
			}

			this.elements.viewer.addEventListener(
				"slideChange",
				debounce(this.onSlideChanged.bind(this), 500)
			);

			this.elements.thumbs.addEventListener(
				"slideChange",
				debounce(this.onSlideChanged.bind(this), 500)
			);

			this.elements.thumbnails.querySelectorAll("[data-target]").forEach(mediaToSwitch => {
				mediaToSwitch
					.querySelector("button")
					.addEventListener(
						"click",
						this.setActiveMedia.bind(this, mediaToSwitch.dataset.target, false)
					);
			});

			if (this.dataset.desktopLayout.includes("thumbnail") && this.mql.matches) {
				this.removeListSemantic();
			}
		}

		onSlideChanged(event) {
			// console.log('MediaGallery.onSlideChanged');

			const thumbnail = this.elements.thumbnails.querySelector(
				`[data-target="${event.detail.currentElement.dataset.mediaId}"]`
			);
			this.setActiveThumbnail(thumbnail);
		}

		setActiveMedia(mediaId, prepend) {
			console.log("MediaGallery.setActiveMedia", mediaId, prepend);

			const activeMedia = this.elements.viewer.querySelector(`[data-media-id="${mediaId}"]`);
			const activeMediaThumbs = this.elements.thumbs.querySelector(`[data-media-id="${mediaId}"]`);

			this.elements.viewer
				.querySelectorAll("[data-media-id]")
				.forEach(element => element.classList.remove("is-active"));
			this.elements.thumbs
				.querySelectorAll("[data-media-id]")
				.forEach(element => element.classList.remove("is-active"));

			console.log(activeMedia, activeMediaThumbs);

			activeMedia.classList.add("is-active");
			activeMediaThumbs.classList.add("is-active");

			if (prepend) {
				activeMedia.parentElement.prepend(activeMedia);
				activeMediaThumbs.parentElement.prepend(activeMediaThumbs);

				if (this.elements.thumbnails) {
					const activeThumbnail = this.elements.thumbnails.querySelector(`[data-target="${mediaId}"]`);

					activeThumbnail.parentElement.prepend(activeThumbnail);
				}

				if (this.elements.viewer.swiper) {
					this.elements.viewer.swiper.thumbs.swiper.update();
					this.elements.viewer.swiper.update();
					this.elements.viewer.swiper.slideTo(0);
				}
			}

			window.setTimeout(() => {
				if (this.elements.thumbnails) {
					activeMedia.parentElement.scrollTo({ left: activeMedia.offsetLeft });
				}

				if (!this.elements.thumbnails || "stacked" === this.dataset.desktopLayout) {
					activeMedia.scrollIntoView({ behavior: "smooth" });
				}
			});

			this.playActiveMedia(activeMedia);

			if (!this.elements.thumbnails) {
				return;
			}

			const activeThumbnail = this.elements.thumbnails.querySelector(`[data-target="${mediaId}"]`);
			this.setActiveThumbnail(activeThumbnail);
			this.announceLiveRegion(activeMedia, activeThumbnail.dataset.mediaPosition);
		}

		setActiveThumbnail(thumbnail) {
			if (!this.elements.thumbnails || !thumbnail) {
				return;
			}

			this.elements.thumbnails
				.querySelectorAll("button")
				.forEach(element => element.removeAttribute("aria-current"));
			thumbnail.querySelector("button").setAttribute("aria-current", true);

			if (this.elements.thumbnails.isSlideVisible(thumbnail, 10)) {
				return;
			}

			this.elements.thumbnails.slider.scrollTo({ left: thumbnail.offsetLeft });
		}

		announceLiveRegion(activeItem, position) {
			const image = activeItem.querySelector(".product__modal-opener--image img");

			if (!image) {
				return;
			}

			image.onload = () => {
				this.elements.liveRegion.setAttribute("aria-hidden", false);
				this.elements.liveRegion.innerHTML = window.accessibilityStrings.imageAvailable.replace(
					"[index]",
					position
				);
				setTimeout(() => {
					this.elements.liveRegion.setAttribute("aria-hidden", true);
				}, 2000);
			};
			// eslint-disable-next-line no-self-assign
			image.src = image.src;
		}

		// eslint-disable-next-line class-methods-use-this
		playActiveMedia(activeItem) {
			window.pauseAllMedia();
			const deferredMedia = activeItem.querySelector(".deferred-media");
			if (deferredMedia) deferredMedia.loadContent(false);
		}

		removeListSemantic() {
			if (!this.elements.viewer.slider) {
				return;
			}

			this.elements.viewer.slider.setAttribute("role", "presentation");

			this.elements.viewer.sliderItems.forEach(slide =>
				slide.setAttribute("role", "presentation")
			);
		}
	}

	customElements.define("media-gallery", MediaGallery);
}
