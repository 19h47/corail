const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

const colors = {
	gray: { "very-dark": "#333333", "very-light": "#F3F3F3" },
	orange: { "dark-grayish": "#97938F", grayish: "#CFCDC9" },
	red: { "very-light": "#FF7D6C" },
	cyan: { "very-dark-grayish": "#37403A" },
};

const fontSize = {};

const maxWidth = {
	344: `${1376 / 16}rem`,
};

const spacing = {
	"1/12": `${(1 * 100) / 12}%`,
	"2/12": `${(2 * 100) / 12}%`,
	"3/12": `${(3 * 100) / 12}%`,
	"3.5/12": `${(3.5 * 100) / 12}%`,
	"4/12": `${(4 * 100) / 12}%`,
	"5/12": `${(5 * 100) / 12}%`,
	"3/9": `${(3 * 100) / 9}%`,
};

const zIndex = {
	1: '1',
	2: '2',
	3: '3',
	4: '4',
	5: '5'
};

module.exports = {
	content: [
		"./layout/*.liquid",
		"./sections/*.liquid",
		"./snippets/*.liquid",
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
			zIndex
		},
		fontFamily: {
			display: ['"Roobert"', ...defaultTheme.fontFamily.serif],
			body: ['"Roboto Mono"', ...defaultTheme.fontFamily.mono],
		},
	},
	plugins: [
		plugin(({ addVariant }) => addVariant("is-inview", ".is-inview&")),
		plugin(({ addVariant }) => addVariant("is-active", ".is-active&")),
	],
};
