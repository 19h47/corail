/* eslint-disable max-classes-per-file */

// eslint-disable-next-line no-unused-vars, no-return-assign
const convertToDMS = (D, lng) => ({
	// eslint-disable-next-line no-nested-ternary
	dir: 0 > D ? (lng ? "W" : "S") : lng ? "E" : "N",
	// eslint-disable-next-line no-bitwise
	deg: 0 | (0 > D ? (D = -D) : D),
	// eslint-disable-next-line no-bitwise
	min: 0 | (((D += 1e-9) % 1) * 60),
	// eslint-disable-next-line no-bitwise
	sec: (0 | (((D * 60) % 1) * 6000)) / 100,
});

// eslint-disable-next-line no-unused-vars
const getRandomFloat = (min, max, decimals = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

const getFocusableElements = container => Array.from(
	container.querySelectorAll(
		"summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
	)
)

// eslint-disable-next-line no-undef, no-unused-vars
const scroll = new LocomotiveNativeScroll({ smooth: false });

const isOntop = () => {
	const top = window.pageYOffset || document.documentElement.scrollTop;

	if (0 >= top) {
		document.documentElement.classList.add("is-ontop");
	} else {
		document.documentElement.classList.remove("is-ontop");
	}

	if (Math.round(window.pageYOffset + window.innerHeight) >= document.body.scrollHeight) {
		document.documentElement.classList.add("is-onbottom");
	} else {
		document.documentElement.classList.remove("is-onbottom");
	}
};

scroll.on("scroll", ({ direction }) => {
	document.documentElement.setAttribute("data-direction", direction || "down");

	isOntop();
});

document.querySelectorAll('[id^="Details-"] summary').forEach(summary => {
	summary.setAttribute("role", "button");
	summary.setAttribute("aria-expanded", summary.parentNode.hasAttribute("open"));

	if (summary.nextElementSibling.getAttribute("id")) {
		summary.setAttribute("aria-controls", summary.nextElementSibling.id);
	}

	summary.addEventListener("click", event => {
		event.currentTarget.setAttribute(
			"aria-expanded",
			!event.currentTarget.closest("details").hasAttribute("open")
		);
	});

	if (summary.closest("header-drawer")) {
		return;
	}

	summary.parentElement.addEventListener("keyup", onKeyUpEscape);
});

const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
	const elements = getFocusableElements(container);
	const first = elements[0];
	const last = elements[elements.length - 1];

	removeTrapFocus();

	trapFocusHandlers.focusin = event => {
		if (event.target !== container && event.target !== last && event.target !== first) return;

		document.addEventListener("keydown", trapFocusHandlers.keydown);
	};

	trapFocusHandlers.focusout = function () {
		document.removeEventListener("keydown", trapFocusHandlers.keydown);
	};

	trapFocusHandlers.keydown = function (event) {
		if ("TAB" !== event.code.toUpperCase()) return; // If not TAB key
		// On the last focusable element and tab forward, focus the first element.
		if (event.target === last && !event.shiftKey) {
			event.preventDefault();
			first.focus();
		}

		//  On the first focusable element and tab backward, focus the last element.
		if ((event.target === container || event.target === first) && event.shiftKey) {
			event.preventDefault();
			last.focus();
		}
	};

	document.addEventListener("focusout", trapFocusHandlers.focusout);
	document.addEventListener("focusin", trapFocusHandlers.focusin);

	elementToFocus.focus();
}

// Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
try {
	document.querySelector(":focus-visible");
} catch (e) {
	focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
	const navKeys = [
		"ARROWUP",
		"ARROWDOWN",
		"ARROWLEFT",
		"ARROWRIGHT",
		"TAB",
		"ENTER",
		"SPACE",
		"ESCAPE",
		"HOME",
		"END",
		"PAGEUP",
		"PAGEDOWN",
	];
	let currentFocusedElement = null;
	let mouseClick = null;

	window.addEventListener("keydown", event => {
		if (navKeys.includes(event.code.toUpperCase())) {
			mouseClick = false;
		}
	});

	// eslint-disable-next-line no-unused-vars
	window.addEventListener("mousedown", event => {
		mouseClick = true;
	});

	window.addEventListener(
		"focus",
		() => {
			if (currentFocusedElement) currentFocusedElement.classList.remove("focused");

			if (mouseClick) return;

			currentFocusedElement = document.activeElement;
			currentFocusedElement.classList.add("focused");
		},
		true
	);
}

// eslint-disable-next-line no-unused-vars
function pauseAllMedia() {
	document.querySelectorAll(".js-youtube").forEach(video => {
		video.contentWindow.postMessage(
			'{"event":"command","func":"' + "pauseVideo" + '","args":""}',
			"*"
		);
	});
	document.querySelectorAll(".js-vimeo").forEach(video => {
		video.contentWindow.postMessage('{"method":"pause"}', "*");
	});
	document.querySelectorAll("video").forEach(video => video.pause());
	document.querySelectorAll("product-model").forEach(model => {
		if (model.modelViewerUI) model.modelViewerUI.pause();
	});
}

function removeTrapFocus(elementToFocus = null) {
	document.removeEventListener("focusin", trapFocusHandlers.focusin);
	document.removeEventListener("focusout", trapFocusHandlers.focusout);
	document.removeEventListener("keydown", trapFocusHandlers.keydown);

	if (elementToFocus) elementToFocus.focus();
}

function onKeyUpEscape(event) {
	if ("ESCAPE" !== event.code.toUpperCase()) {
		return;
	}

	const openDetailsElement = event.target.closest("details[open]");
	if (!openDetailsElement) return;

	const summaryElement = openDetailsElement.querySelector("summary");
	openDetailsElement.removeAttribute("open");
	summaryElement.setAttribute("aria-expanded", false);
	summaryElement.focus();
}

// eslint-disable-next-line no-unused-vars
function debounce(fn, wait) {
	let t;
	return (...args) => {
		clearTimeout(t);
		t = setTimeout(() => fn.apply(this, args), wait);
	};
}

// eslint-disable-next-line no-unused-vars
function fetchConfig(type = "json") {
	return {
		method: "POST",
		headers: { "Content-Type": "application/json", Accept: `application/${type}` },
	};
}

/*
 * Shopify Common JS
 *
 */
if ("undefined" === typeof window.Shopify) {
	window.Shopify = {};
}

Shopify.bind = function (fn, scope) {
	return function () {
		return fn.apply(scope, arguments);
	};
};

Shopify.setSelectorByValue = function (selector, value) {
	for (let i = 0, count = selector.options.length; i < count; i++) {
		const option = selector.options[i];
		if (value == option.value || value == option.innerHTML) {
			selector.selectedIndex = i;
			return i;
		}
	}
};

Shopify.addListener = function (target, eventName, callback) {
	target.addEventListener
		? target.addEventListener(eventName, callback, false)
		: target.attachEvent(`on${eventName}`, callback);
};

Shopify.postLink = function (path, options) {
	options = options || {};
	const method = options.method || "post";
	const params = options.parameters || {};

	const form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);

	for (const key in params) {
		const hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", key);
		hiddenField.setAttribute("value", params[key]);
		form.appendChild(hiddenField);
	}
	document.body.appendChild(form);
	form.submit();
	document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function (country_domid, province_domid, options) {
	this.countryEl = document.getElementById(country_domid);
	this.provinceEl = document.getElementById(province_domid);
	this.provinceContainer = document.getElementById(options.hideElement || province_domid);

	Shopify.addListener(this.countryEl, "change", Shopify.bind(this.countryHandler, this));

	this.initCountry();
	this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
	initCountry() {
		const value = this.countryEl.getAttribute("data-default");
		Shopify.setSelectorByValue(this.countryEl, value);
		this.countryHandler();
	},

	initProvince() {
		const value = this.provinceEl.getAttribute("data-default");
		if (value && 0 < this.provinceEl.options.length) {
			Shopify.setSelectorByValue(this.provinceEl, value);
		}
	},

	countryHandler(e) {
		var opt = this.countryEl.options[this.countryEl.selectedIndex];
		const raw = opt.getAttribute("data-provinces");
		const provinces = JSON.parse(raw);

		this.clearOptions(this.provinceEl);
		if (provinces && 0 == provinces.length) {
			this.provinceContainer.style.display = "none";
		} else {
			for (let i = 0; i < provinces.length; i++) {
				var opt = document.createElement("option");
				opt.value = provinces[i][0];
				opt.innerHTML = provinces[i][1];
				this.provinceEl.appendChild(opt);
			}

			this.provinceContainer.style.display = "";
		}
	},

	clearOptions(selector) {
		while (selector.firstChild) {
			selector.removeChild(selector.firstChild);
		}
	},

	setOptions(selector, values) {
		for (let i = 0, count = values.length; i < values.length; i++) {
			const opt = document.createElement("option");
			opt.value = values[i];
			opt.innerHTML = values[i];
			selector.appendChild(opt);
		}
	},
};

class MenuDrawer extends HTMLElement {
	constructor() {
		super();

		this.mainDetailsToggle = this.querySelector("details");

		this.addEventListener("keyup", this.onKeyUp.bind(this));
		this.addEventListener("focusout", this.onFocusOut.bind(this));
		this.bindEvents();
	}

	bindEvents() {
		this.querySelectorAll("summary").forEach(summary =>
			summary.addEventListener("click", this.onSummaryClick.bind(this))
		);
		this.querySelectorAll("button").forEach(button =>
			button.addEventListener("click", this.onCloseButtonClick.bind(this))
		);
	}

	onKeyUp(event) {
		if ("ESCAPE" !== event.code.toUpperCase()) {
			return;
		}

		const openDetailsElement = event.target.closest("details[open]");
		if (!openDetailsElement) return;

		openDetailsElement === this.mainDetailsToggle
			? this.closeMenuDrawer(event, this.mainDetailsToggle.querySelector("summary"))
			: this.closeSubmenu(openDetailsElement);
	}

	onSummaryClick(event) {
		console.log('MenuDrawer.onSummaryClick', event);

		const summaryElement = event.currentTarget;
		const detailsElement = summaryElement.parentNode;
		const parentMenuElement = detailsElement.closest(".has-submenu");
		const isOpen = detailsElement.hasAttribute("open");
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

		function addTrapFocus() {
			trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector("button"));
			summaryElement.nextElementSibling.removeEventListener("transitionend", addTrapFocus);
		}

		if (detailsElement === this.mainDetailsToggle) {
			if (isOpen) event.preventDefault();
			isOpen ? this.closeMenuDrawer(event, summaryElement) : this.openMenuDrawer(summaryElement);

			if (window.matchMedia("(max-width: 990px)")) {
				document.documentElement.style.setProperty("--viewport-height", `${window.innerHeight}px`);
			}
		} else {
			setTimeout(() => {
				detailsElement.classList.add("menu-opening");
				summaryElement.setAttribute("aria-expanded", true);
				parentMenuElement && parentMenuElement.classList.add("submenu-open");
				!reducedMotion || reducedMotion.matches
					? addTrapFocus()
					: summaryElement.nextElementSibling.addEventListener("transitionend", addTrapFocus);
			}, 100);
		}
	}

	openMenuDrawer(summaryElement) {
		setTimeout(() => {
			this.mainDetailsToggle.classList.add("menu-opening");
		});
		summaryElement.setAttribute("aria-expanded", true);
		trapFocus(this.mainDetailsToggle, summaryElement);

		document.body.classList.add(`overflow-hidden`);
	}

	closeMenuDrawer(event, elementToFocus = false) {
		console.log("closeMenuDrawer", event, elementToFocus);

		if (event === undefined) {
			return;
		}

		this.mainDetailsToggle.classList.remove("menu-opening");
		this.mainDetailsToggle.querySelectorAll("details").forEach(details => {
			details.removeAttribute("open");
			details.classList.remove("menu-opening");
		});
		this.mainDetailsToggle.querySelectorAll(".submenu-open").forEach(submenu => {
			submenu.classList.remove("submenu-open");
		});

		document.body.classList.remove(`overflow-hidden`);
		removeTrapFocus(elementToFocus);
		this.closeAnimation(this.mainDetailsToggle);
	}

	// eslint-disable-next-line no-unused-vars
	onFocusOut(event) {
		console.log(
			"MenuDrawer.onFocusOut",
			this.mainDetailsToggle.hasAttribute("open"),
			!this.mainDetailsToggle.contains(document.activeElement)
		);

		setTimeout(() => {
			if (
				this.mainDetailsToggle.hasAttribute("open") &&
				!this.mainDetailsToggle.contains(document.activeElement)
			)
				this.closeMenuDrawer();
		});
	}

	onCloseButtonClick(event) {
		const detailsElement = event.currentTarget.closest("details");
		this.closeSubmenu(detailsElement);
	}

	closeSubmenu(detailsElement) {
		const parentMenuElement = detailsElement.closest(".submenu-open");
		parentMenuElement && parentMenuElement.classList.remove("submenu-open");
		detailsElement.classList.remove("menu-opening");
		detailsElement.querySelector("summary").setAttribute("aria-expanded", false);
		removeTrapFocus(detailsElement.querySelector("summary"));
		this.closeAnimation(detailsElement);
	}

	// eslint-disable-next-line class-methods-use-this
	closeAnimation(detailsElement) {
		let animationStart;

		const handleAnimation = time => {
			if (animationStart === undefined) {
				animationStart = time;
			}

			const elapsedTime = time - animationStart;

			if (400 > elapsedTime) {
				window.requestAnimationFrame(handleAnimation);
			} else {
				detailsElement.removeAttribute("open");
				if (detailsElement.closest("details[open]")) {
					trapFocus(
						detailsElement.closest("details[open]"),
						detailsElement.querySelector("summary")
					);
				}
			}
		};

		window.requestAnimationFrame(handleAnimation);
	}
}

customElements.define("menu-drawer", MenuDrawer);

class HeaderDrawer extends MenuDrawer {
	constructor() {
		super();
	}

	openMenuDrawer(summaryElement) {
		this.header = this.header || document.getElementById("shopify-section-header");

		document.documentElement.style.setProperty(
			"--header-bottom-position",
			`${parseInt(this.header.getBoundingClientRect().bottom, 10)}px`
		);
		this.header.classList.add("menu-open");

		setTimeout(() => {
			this.mainDetailsToggle.classList.add("menu-opening");
		});

		summaryElement.setAttribute("aria-expanded", true);
		trapFocus(this.mainDetailsToggle, summaryElement);
		document.body.classList.add(`overflow-hidden`);
	}

	closeMenuDrawer(event, elementToFocus) {
		super.closeMenuDrawer(event, elementToFocus);
		this.header.classList.remove("menu-open");
	}
}

customElements.define("header-drawer", HeaderDrawer);

class ModalDialog extends HTMLElement {
	constructor() {
		super();
		this.querySelector('[id^="ModalClose-"]').addEventListener(
			"click",
			this.hide.bind(this, false)
		);
		this.addEventListener("keyup", event => {
			if ("ESCAPE" === event.code.toUpperCase()) this.hide();
		});
		if (this.classList.contains("media-modal")) {
			this.addEventListener("pointerup", event => {
				if ("mouse" === event.pointerType && !event.target.closest("deferred-media, product-model"))
					this.hide();
			});
		} else {
			this.addEventListener("click", event => {
				if (event.target === this) this.hide();
			});
		}
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
		if (popup) popup.loadContent();
		trapFocus(this, this.querySelector('[role="dialog"]'));
		window.pauseAllMedia();
	}

	hide() {
		document.body.classList.remove("overflow-hidden");
		document.body.dispatchEvent(new CustomEvent("modalClosed"));
		this.removeAttribute("open");
		removeTrapFocus(this.openedBy);
		window.pauseAllMedia();
	}
}
customElements.define("modal-dialog", ModalDialog);

class ModalOpener extends HTMLElement {
	constructor() {
		super();

		const button = this.querySelector("button");

		if (!button) {
			return;
		}

		button.addEventListener("click", () => {
			const modal = document.querySelector(this.getAttribute("data-modal"));

			if (modal) {
				modal.show(button);
			}
		});
	}
}
customElements.define("modal-opener", ModalOpener);

class DeferredMedia extends HTMLElement {
	constructor() {
		super();
		const poster = this.querySelector('[id^="Deferred-Poster-"]');
		if (!poster) return;
		poster.addEventListener("click", this.loadContent.bind(this));
	}

	loadContent(focus = true) {
		window.pauseAllMedia();
		if (!this.getAttribute("loaded")) {
			const content = document.createElement("div");
			content.appendChild(this.querySelector("template").content.firstElementChild.cloneNode(true));

			this.setAttribute("loaded", true);
			const deferredElement = this.appendChild(
				content.querySelector("video, model-viewer, iframe")
			);
			if (focus) deferredElement.focus();
		}
	}
}

customElements.define("deferred-media", DeferredMedia);

class ProductRecommendations extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const handleIntersection = (entries, observer) => {
			if (!entries[0].isIntersecting) return;
			observer.unobserve(this);

			fetch(this.dataset.url)
				.then(response => response.text())
				.then(text => {
					const html = document.createElement("div");
					html.innerHTML = text;
					const recommendations = html.querySelector("product-recommendations");

					if (recommendations && recommendations.innerHTML.trim().length) {
						this.innerHTML = recommendations.innerHTML;
					}

					if (
						!this.querySelector("slideshow-component") &&
						this.classList.contains("complementary-products")
					) {
						this.remove();
					}

					if (html.querySelector(".grid__item")) {
						this.classList.add("product-recommendations--loaded");
					}
				})
				.catch(e => {
					console.error(e);
				});
		};

		new IntersectionObserver(handleIntersection.bind(this), {
			rootMargin: "0px 0px 400px 0px",
		}).observe(this);
	}
}

customElements.define("product-recommendations", ProductRecommendations);
