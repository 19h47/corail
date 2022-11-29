/* eslint-disable max-classes-per-file */
if (!customElements.get("details-disclosure")) {
	class DetailsDisclosure extends HTMLElement {
		constructor() {
			super();
			this.mainDetailsToggle = this.querySelector("details");
			this.content = this.mainDetailsToggle.querySelector("summary").nextElementSibling;

			this.mainDetailsToggle.addEventListener("focusout", this.onFocusOut.bind(this));
			this.mainDetailsToggle.addEventListener("toggle", this.onToggle.bind(this));

			// this.mainDetailsToggle.addEventListener('mouseenter', () => {
			// 	this.mainDetailsToggle.setAttribute('open', true);
			// })

			// this.mainDetailsToggle.addEventListener('mouseleave', () => {
			// 	this.mainDetailsToggle.removeAttribute('open');
			// })
		}

		onFocusOut() {
			// console.log('DetailsDisclosure.onFocusOut');

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
			setTimeout(() => {
				this.mainDetailsToggle.removeAttribute("open");
				this.mainDetailsToggle.querySelector("summary").setAttribute("aria-expanded", false);
			});
		}
	}

	customElements.define("details-disclosure", DetailsDisclosure);

	class CommitmentsDrawer extends DetailsDisclosure {
		constructor() {
			super();

			this.mainDetailsToggle.addEventListener('mouseenter', () => {
				this.mainDetailsToggle.setAttribute('open', true);
			})

			this.mainDetailsToggle.addEventListener('mouseleave', () => {
				this.mainDetailsToggle.removeAttribute('open');
			})
		}

		close() {
			// console.log('DetailsDisclosure.close');
			setTimeout(() => {
				this.mainDetailsToggle.removeAttribute("open");
				this.mainDetailsToggle.querySelector("summary").setAttribute("aria-expanded", false);
			}, 100);
		}
	}

	customElements.define("commitments-drawer", CommitmentsDrawer);

	class HeaderMenu extends DetailsDisclosure {
		constructor() {
			super();
			this.header = document.querySelector(".header-wrapper");

			const $details = this.querySelector("details");

			if (JSON.parse(this.getAttribute('data-open-onmouseenter'))) {
				console.log(JSON.parse(this.getAttribute('data-open-onmouseenter')));
				$details.addEventListener("mouseenter", () => {
					$details.setAttribute("open", true);
				});
			}
			if (JSON.parse(this.getAttribute('data-close-onmouseleave'))) {
				$details.addEventListener("mouseleave", () => {
					$details.removeAttribute("open");
				});
			}

			const links = [...this.querySelectorAll("a[data-image]")];
			const $image = this.querySelector(".js-header-menu-image");

			links.forEach($link => {
				const { image, title } = $link.dataset;

				$link.addEventListener("mouseover", () => {
					$image.src = image;
					$image.alt = title;
				});
			});
		}

		onToggle() {
			if (!this.header) {
				return;
			}

			document.documentElement.classList.toggle("header-is-open");

			this.header.preventHide = this.mainDetailsToggle.open;

			if (
				"" !== document.documentElement.style.getPropertyValue("--header-bottom-position-desktop")
			) {
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
