const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

const colors = {
	gray: { "very-dark": "#333333", "very-light": "#F3F3F3", dark: '#767676' },
	orange: { "dark-grayish": "#97938F", grayish: "#CFCDC9", light: '#FF7F50' },
	red: { "very-light": "#FF7D6C", light: "#FF7F63" },
	cyan: { "very-dark-grayish": "#37403A" },
};

const fontSize = {
	'3xs': [`${8 / 16}rem`, `${8 / 16}rem`],
};

const maxWidth = {
	344: `${1376 / 16}rem`,
	"9/12": `${(9 * 100) / 12}%`,
};

const spacing = {
	"1/6": `${(1 * 100) / 6}%`,
	"1/7": `${(1 * 100) / 7}%`,
	"1/12": `${(1 * 100) / 12}%`,
	"2/12": `${(2 * 100) / 12}%`,
	"3/8": `${(3 * 100) / 8}%`,
	"3/12": `${(3 * 100) / 12}%`,
	"3.5/12": `${(3.5 * 100) / 12}%`,
	"4/12": `${(4 * 100) / 12}%`,
	"5.5/12": `${(5.5 * 100) / 12}%`,
	"5/7": `${(5 * 100) / 7}%`,
	"5/8": `${(5 * 100) / 8}%`,
	"5/12": `${(5 * 100) / 12}%`,
	"6/12": `${(6 * 100) / 12}%`,
	"8/12": `${(8 * 100) / 12}%`,
	"9/12": `${(9 * 100) / 12}%`,
	"4/6": `${(4 * 100) / 6}%`,
	"3/9": `${(3 * 100) / 9}%`,
	"1/10": `${(1 * 100) / 10}%`,
	"1.5/10": `${(1.5 * 100) / 10}%`,
	"3/10": `${(3 * 100) / 10}%`,
	"4/10": `${(4 * 100) / 10}%`,
	"7/10": `${(7 * 100) / 10}%`,
	"9/10": `${(9 * 100) / 10}%`,
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
		plugin(({ addVariant }) => addVariant("parent-active", ".is-active > &")),
		plugin(({ addVariant }) => addVariant("is-disabled", ["[aria-disabled='true']&", '.disabled&', '.is-disabled&'])),
		plugin(({ addVariant }) => addVariant("is-ontop", ".is-ontop &")),
		plugin(({ addVariant }) => addVariant("is-onbottom", ".is-onbottom &")),
		plugin(({ addVariant }) => addVariant("expanded", "&[aria-expanded='true']")),
		plugin(({ addVariant }) => addVariant("parent-expanded", "[aria-expanded='true'] > &")),
		plugin(({ addVariant }) => addVariant("grandparent-expanded", "[aria-expanded='true'] > * > &")),
		plugin(({ addVariant }) => addVariant("parent-open", "[open='true'] > &")),
		plugin(({ addVariant }) => addVariant("has-scroll-init", ".has-scroll-init &")),
		plugin(({ addVariant }) => addVariant("open", "&[open]")),
	],
};
