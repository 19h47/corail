/**
 * Webpack Resolve Alias
 *
 * @file webpack.config.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

// Webpack utils
const { resolve } = require('./webpack.utils');

module.exports = {
	'@': resolve('src'),

	vue: 'vue/dist/vue.esm.js',

	// scripts
	scripts: resolve('src/scripts'),
	abstracts: resolve('src/scripts/abstracts'),
	common: resolve('src/scripts/common'),
	modules: resolve('src/scripts/modules'),
	pages: resolve('src/scripts/pages'),
	transitions: resolve('src/scripts/transitions'),
	factories: resolve('src/scripts/factories'),
	services: resolve('src/scripts/services'),
	utils: resolve('src/scripts/utils'),
	blocks: resolve('src/scripts/blocks'),
	polyfills: resolve('src/scripts/polyfills'),
	vendors: resolve('src/scripts/vendors'),

	// stylesheets
	stylesheets: resolve('src/stylesheets'),

	// img
	jpg: resolve('src/img/jpg'),
	png: resolve('src/img/png'),
	gif: resolve('src/img/gif'),
	svg: resolve('src/img/svg'),
	icons: resolve('src/icons'),
	videos: resolve('src/videos'),
};
