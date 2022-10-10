const plugin = require("tailwindcss/plugin");

const colors = {
	gray: { "very-dark": "#333333" },
	orange: { "dark-grayish": "#97938F", grayish: "#CFCDC9" },
	red: { "very-light": "#FF7D6C" },
};

const fontSize = {};

const maxWidth = {
	344: `${1376 / 16}rem`,
};

const spacing = {};

module.exports = {
	content: [
		"./snippets/**/*.liquid",
		"./sections/**/*.liquid",
		"./layout/**/*.liquid",
		"./src/**/*.{html,js}",
	],
	theme: {
		extend: {
			colors,
			fontSize,
			maxWidth,
			spacing,
		},
	},
	plugins: [
		plugin(({ addVariant }) => addVariant("is-inview", ".is-inview&")),
		plugin(({ addVariant }) => addVariant("is-active", ".is-active&")),
	],
};
