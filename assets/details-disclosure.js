/* eslint-disable max-classes-per-file */
if (!customElements.get('details-disclosure')) {
	class DetailsDisclosure extends HTMLElement {
		constructor() {
			super();
			this.mainDetailsToggle = this.querySelector("details");
			this.content = this.mainDetailsToggle.querySelector("summary").nextElementSibling;

			this.mainDetailsToggle.addEventListener("focusout", this.onFocusOut.bind(this));
			this.mainDetailsToggle.addEventListener("toggle", this.onToggle.bind(this));
		}

		onFocusOut() {
			setTimeout(() => {
				if (!this.contains(document.activeElement)) this.close();
			});
		}

		onToggle() {
			if (!this.animations) {
				this.animations = this.content.getAnimations();
			}

			if (this.mainDetailsToggle.hasAttribute("open")) {
				this.animations.forEach(animation => animation.play());
			} else {
				this.animations.forEach(animation => animation.cancel());
			}
		}

		close() {
			// console.log('DetailsDisclosure.close');

			this.mainDetailsToggle.removeAttribute("open");
			this.mainDetailsToggle.querySelector("summary").setAttribute("aria-expanded", false);
		}
	}

	customElements.define("details-disclosure", DetailsDisclosure);

	class HeaderMenu extends DetailsDisclosure {
		constructor() {
			super();
			this.header = document.querySelector(".header-wrapper");

			const links = [...this.querySelectorAll('a[data-image]')];
			const $image = this.querySelector('.js-header-menu-image');

			links.forEach($link => {
				const { image, title } = $link.dataset;

				$link.addEventListener('mouseover', () => {
					$image.src = image;
					$image.alt = title;
				})
			})
		}

		onToggle() {

			if (!this.header) {
				return;
			}

			document.documentElement.classList.toggle('header-is-open');

			this.header.preventHide = this.mainDetailsToggle.open;

			if ("" !== document.documentElement.style.getPropertyValue("--header-bottom-position-desktop")) {
				// eslint-disable-next-line no-useless-return
				return;
			}

			document.documentElement.style.setProperty(
				"--header-bottom-position-desktop",
				`${Math.floor(this.header.getBoundingClientRect().bottom)}px`
			);
		}
	}

	customElements.define("header-menu", HeaderMenu);
}

