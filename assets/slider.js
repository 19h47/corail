/* global Swiper */
// if (!customElements.get("slider-component")) {
// 	class SliderComponent extends HTMLElement {
// 		constructor() {
// 			super();
// 			this.slider = this.querySelector('[id^="Slider-"]');
// 			this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
// 			this.enableSliderLooping = false;
// 			this.currentPageElement = this.querySelector(".js-current");
// 			this.pageTotalElement = this.querySelector(".js-total");
// 			this.prevButton = this.querySelector('button[name="previous"]');
// 			this.nextButton = this.querySelector('button[name="next"]');

// 			if (!this.slider || !this.nextButton) return;

// 			this.initPages();
// 			const resizeObserver = new ResizeObserver((entries) => this.initPages());
// 			resizeObserver.observe(this.slider);

// 			this.slider.addEventListener("scroll", this.update.bind(this));
// 			this.prevButton.addEventListener("click", this.onButtonClick.bind(this));
// 			this.nextButton.addEventListener("click", this.onButtonClick.bind(this));
// 		}

// 		initPages() {
// 			this.sliderItemsToShow = [...this.sliderItems].filter(element => 0 < element.clientWidth);

// 			if (2 > this.sliderItemsToShow.length) {
// 				return;
// 			}

// 			this.sliderItemOffset =
// 				this.sliderItemsToShow[1].offsetLeft - this.sliderItemsToShow[0].offsetLeft;
// 			this.slidesPerPage = Math.floor(
// 				(this.slider.clientWidth - this.sliderItemsToShow[0].offsetLeft) / this.sliderItemOffset
// 			);
// 			this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1;
// 			this.update();
// 		}

// 		resetPages() {
// 			this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
// 			this.initPages();
// 		}

// 		update() {
// 			const previousPage = this.currentPage;
// 			this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1;

// 			if (this.currentPageElement && this.pageTotalElement) {
// 				this.currentPageElement.textContent = this.currentPage;
// 				this.pageTotalElement.textContent = this.totalPages;
// 			}

// 			if (this.currentPage !== previousPage) {
// 				this.dispatchEvent(
// 					new CustomEvent("slideChanged", {
// 						detail: {
// 							currentPage: this.currentPage,
// 							currentElement: this.sliderItemsToShow[this.currentPage - 1],
// 						},
// 					})
// 				);
// 			}

// 			if (this.enableSliderLooping) return;

// 			if (this.isSlideVisible(this.sliderItemsToShow[0]) && 0 === this.slider.scrollLeft) {
// 				this.prevButton.setAttribute("disabled", "disabled");
// 			} else {
// 				this.prevButton.removeAttribute("disabled");
// 			}

// 			if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])) {
// 				this.nextButton.setAttribute("disabled", "disabled");
// 			} else {
// 				this.nextButton.removeAttribute("disabled");
// 			}
// 		}

// 		isSlideVisible(element, offset = 0) {
// 			const lastVisibleSlide = this.slider.clientWidth + this.slider.scrollLeft - offset;
// 			return (
// 				element.offsetLeft + element.clientWidth <= lastVisibleSlide &&
// 				element.offsetLeft >= this.slider.scrollLeft
// 			);
// 		}

// 		onButtonClick(event) {
// 			event.preventDefault();
// 			const step = event.currentTarget.dataset.step || 1;
// 			this.slideScrollPosition =
// 				"next" === event.currentTarget.name
// 					? this.slider.scrollLeft + step * this.sliderItemOffset
// 					: this.slider.scrollLeft - step * this.sliderItemOffset;
// 			this.slider.scrollTo({
// 				left: this.slideScrollPosition,
// 			});
// 		}
// 	}

// 	customElements.define("slider-component", SliderComponent);
// }

if (!customElements.get("slider-component")) {
	class SliderComponent extends HTMLElement {
		constructor() {
			super();

			const parameters = JSON.parse(this.getAttribute('data-parameters')) || {};

			const $next = this.querySelector('.js-next');
			const $previous = this.querySelector('.js-previous');

			// if (parameters.pagination) {
			// 	[parameters.pagination.el] = this.$('pagination')
			// }

			console.log(this);

			this.swiper = new Swiper(this.querySelector('.swiper'), {
				...{ slidesPerView: 'auto' },
				...parameters,
			});

			if ($next) {
				$next.addEventListener('click', () => this.next())
			}

			if ($previous) {
				$previous.addEventListener('click', () => this.previous())
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

