const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

const colors = {
	gray: { "very-dark": "#333333", "very-light": "#F3F3F3", dark: '#767676' },
	orange: { "dark-grayish": "#97938F", grayish: "#CFCDC9", light: '#FF7F50' },
	red: { "very-light": "#FF7D6C", light: "#FF7F63" },
	cyan: { "very-dark-grayish": "#37403A" },
};

const fontSize = {};

const maxWidth = {
	344: `${1376 / 16}rem`,
	"9/12": `${(9 * 100) / 12}%`,
};

const spacing = {
	"1/6": `${(1 * 100) / 6}%`,
	"1/12": `${(1 * 100) / 12}%`,
	"2/12": `${(2 * 100) / 12}%`,
	"3/12": `${(3 * 100) / 12}%`,
	"3.5/12": `${(3.5 * 100) / 12}%`,
	"4/12": `${(4 * 100) / 12}%`,
	"5/12": `${(5 * 100) / 12}%`,
	"6/12": `${(6 * 100) / 12}%`,
	"8/12": `${(8 * 100) / 12}%`,
	"9/12": `${(9 * 100) / 12}%`,
	"1/6": `${(1 * 100) / 6}%`,
	"4/6": `${(4 * 100) / 6}%`,
	"3/9": `${(3 * 100) / 9}%`,
};

const zIndex = {
	1: "1",
	2: "2",
	3: "3",
	4: "4",
	5: "5",
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
			zIndex,
		},
		fontFamily: {
			display: ['"Roobert"', ...defaultTheme.fontFamily.serif],
			body: ['"Roboto Mono"', ...defaultTheme.fontFamily.mono],
		},
	},
	plugins: [
		plugin(({ addVariant }) => addVariant("is-inview", ".is-inview&")),
		plugin(({ addVariant }) => addVariant("is-active", ".is-active&")),
		plugin(({ addVariant }) => addVariant("is-disabled", "[aria-disabled='true']&")),
		plugin(({ addVariant }) => addVariant("expanded", "&[aria-expanded='true']")),
		plugin(({ addVariant }) => addVariant("parent-expanded", "[aria-expanded='true'] > &")),
		plugin(({ addVariant }) => addVariant("grandparent-expanded", "[aria-expanded='true'] > * > &")),
		plugin(({ addVariant }) => addVariant("parent-open", "[open='true'] > &")),
	],
};
