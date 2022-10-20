/* global ScrollingArea */

if (!customElements.get('marquee-component')) {
	class MarqueeComponent extends HTMLElement {
		constructor() {
			super();

			const scrollingArea = new ScrollingArea(this, {});
			scrollingArea.init();
		}
	}

	customElements.define('marquee-component', MarqueeComponent);
}
