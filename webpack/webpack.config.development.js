/**
 * Webpack config Development
 *
 * @file webpack.config.development.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

// Webpack Plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Webpack Utils
const { getStyleLoader } = require("./webpack.utils");

module.exports = {
	mode: "development",
	devtool: "source-map",
	watch: true,
	module: {
		rules: [getStyleLoader()],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
	],
};
