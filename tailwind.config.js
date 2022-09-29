const plugin = require('tailwindcss/plugin');

const colors = {
};

const fontSize = {
};

const maxWidth = {
	'344': `${1376 / 16}rem`,
};

const spacing = {
};

module.exports = {
	content: ['./snippets/**/*.liquid', './sections/**/*.liquid', './layout/**/*.liquid', './src/**/*.{html,js}'],
	theme: {
		extend: {
			colors,
			fontSize,
			maxWidth,
			spacing,
		},
	},
	plugins: [
		plugin(({ addVariant }) => addVariant('is-inview', '.is-inview &')),
		plugin(({ addVariant }) => addVariant('is-active', '.is-active &')),
	],
};
