/* global Swiper */
if (!customElements.get("slider-component")) {
	class SliderComponent extends HTMLElement {
		constructor() {
			super();

			const parameters = JSON.parse(this.getAttribute("data-parameters")) || {};

			const $next = this.querySelector(".js-next");
			const $previous = this.querySelector(".js-previous");
			const $swiper = this.querySelector(".swiper");

			if (
				parameters.breakpoints &&
				parameters.breakpoints[1024] &&
				parameters.breakpoints[1024].thumbs
			) {
				parameters.breakpoints[1024].thumbs = {
					swiper: document.querySelector(`slider-component${parameters.breakpoints[1024].thumbs} .swiper`).swiper
				};
			}

			this.swiper = new Swiper($swiper, {
				...{ slidesPerView: "auto" },
				...parameters,
			});

			// console.log(parameters);

			if ($next) {
				$next.addEventListener("click", () => this.next());
			}

			if ($previous) {
				$previous.addEventListener("click", () => this.previous());
			}
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
