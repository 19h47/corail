/* global ScrollingArea */

if (!customElements.get('marquee-component')) {
	class MarqueeComponent extends HTMLElement {
		constructor() {
			super();

			// eslint-disable-next-line new-cap
			const scrollingArea = new ScrollingArea.default(this, {});
			document.addEventListener('DOMContentLoaded', () => scrollingArea.init());
		}
	}

	customElements.define('marquee-component', MarqueeComponent);
}
