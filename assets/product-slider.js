/* global Swiper */
if (!customElements.get("product-slider-component")) {
	class ProductSliderComponent extends HTMLElement {
		constructor() {
			super();

			const $slider = this.querySelector('.js-slider');
			const sliderParameters = JSON.parse($slider.getAttribute("data-parameters")) || {}

			const $thumbs = this.querySelector('.js-thumbs');

			if ($thumbs) {
				const thumbsParameters = JSON.parse($thumbs.getAttribute("data-parameters")) || {}

				this.thumbs = new Swiper($thumbs.querySelector('.swiper'), {
					...{ slidesPerView: "auto" },
					...thumbsParameters,
				});

				sliderParameters.thumbs = {
					swiper: this.thumbs
				};
			}

			this.slider = new Swiper($slider.querySelector('.swiper'), {
				...{ slidesPerView: "auto" },
				...sliderParameters,
			});
		}
	}

	customElements.define("product-slider-component", ProductSliderComponent);
}
