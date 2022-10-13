const convertToDMS = (D, lng) => {
	return {
		dir: D < 0 ? (lng ? "W" : "S") : lng ? "E" : "N",
		deg: 0 | (D < 0 ? (D = -D) : D),
		min: 0 | (((D += 1e-9) % 1) * 60),
		sec: (0 | (((D * 60) % 1) * 6000)) / 100,
	};
};

const getRandomFloat = (min, max, decimals = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

class Coordinates extends HTMLElement {
	constructor() {
		super();

		document.addEventListener("mousemove", () => {
			const dmsX = convertToDMS(getRandomFloat(-90, 90), false); // latitude
			const dmsY = convertToDMS(getRandomFloat(-180, 180), true); // longitude

			this.children[0].innerHTML = `${dmsX.deg}°${dmsX.min}′${dmsX.sec}″ ${dmsX.dir}`;
			this.children[1].innerHTML = `${dmsY.deg}°${dmsY.min}′${dmsY.sec}″ ${dmsY.dir}`;
		});

		console.dir(this);
	}
}

customElements.define("coordinates-dms", Coordinates);
