/* global Swiper */
if (!customElements.get("slider-component")) {
	class SliderComponent extends HTMLElement {
		constructor() {
			super();

			const parameters = JSON.parse(this.getAttribute("data-parameters")) || {};

			const next = [...this.querySelectorAll(".js-next")];
			const previous = [...this.querySelectorAll(".js-previous")];
			const $swiper = this.querySelector(".swiper");

			if (
				parameters.breakpoints &&
				parameters.breakpoints[1024] &&
				parameters.breakpoints[1024].thumbs
			) {
				parameters.breakpoints[1024].thumbs = {
					swiper: document.querySelector(
						`slider-component${parameters.breakpoints[1024].thumbs} .swiper`
					).swiper,
				};
			}

			if (parameters.pagination && parameters.pagination.renderBullet) {
				parameters.pagination.renderBullet = (index, className) => `<span class="${className}"><span>${(index + 1)}</span></span>`
			}

			this.swiper = new Swiper($swiper, {
				...{ slidesPerView: "auto" },
				...parameters,
			});

			// console.log(parameters);

			next.forEach(el => el.addEventListener("click", () => this.next()));
			previous.forEach(el => el.addEventListener("click", () => this.previous()));
		}

		next() {
			this.swiper.slideNext();
		}

		previous() {
			this.swiper.slidePrev();
		}
	}

	customElements.define("slider-component", SliderComponent);
}
