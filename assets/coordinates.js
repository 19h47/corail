/* global convertToDMS, getRandomFloat */
if (!customElements.get("coordinates-dms")) {
	class Coordinates extends HTMLElement {
		constructor() {
			super();

			document.addEventListener("mousemove", () => {
				const dmsX = convertToDMS(getRandomFloat(-90, 90), false); // latitude
				const dmsY = convertToDMS(getRandomFloat(-180, 180), true); // longitude

				this.children[0].innerHTML = `${dmsX.deg}°${dmsX.min}′${dmsX.sec}″ ${dmsX.dir}`;
				this.children[1].innerHTML = `${dmsY.deg}°${dmsY.min}′${dmsY.sec}″ ${dmsY.dir}`;
			});
		}
	}

	customElements.define("coordinates-dms", Coordinates);
}
