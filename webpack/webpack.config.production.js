/**
 * Webpack config Production
 *
 * @file webpack.config.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

// Webpack Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Webpack Utils
const { resolve, getStyleLoader } = require('./webpack.utils');

const plugins = [
	new CleanWebpackPlugin({
		cleanOnceBeforeBuildPatterns: [resolve('dist')],
	}),
	new MiniCssExtractPlugin({
		filename: 'main.css',
		chunkFilename: "[id].css",
	}),
];

module.exports = {
	mode: 'production',
	output: {
		filename: '[name].js',
	},
	module: {
		rules: [getStyleLoader(false)],
	},
	plugins
};
