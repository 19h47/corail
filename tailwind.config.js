const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

const colors = {
	gray: { "very-dark": "#333333", "very-light": "#F3F3F3" },
	orange: { "dark-grayish": "#97938F", grayish: "#CFCDC9" },
	red: { "very-light": "#FF7D6C" },
};

const fontSize = {};

const maxWidth = {
	344: `${1376 / 16}rem`,
};

const spacing = {
	"3/9": `${(3 * 100) / 9}%`,
};

module.exports = {
	content: [
		"./snippets/**/*.liquid",
		"./sections/**/*.liquid",
		"./layout/**/*.liquid",
		"./src/**/*.{html,js}",
	],
	corePlugins: {
		container: false,
	},
	theme: {
		extend: {
			colors,
			fontSize,
			maxWidth,
			spacing,
		},
		fontFamily: {
			display: ['"Roobert"', ...defaultTheme.fontFamily.serif],
			body: ['"Roboto Mono"', ...defaultTheme.fontFamily.sans],
		},
	},
	plugins: [
		plugin(({ addVariant }) => addVariant("is-inview", ".is-inview&")),
		plugin(({ addVariant }) => addVariant("is-active", ".is-active&")),
	],
};
