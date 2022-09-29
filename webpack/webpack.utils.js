/**
 * Webpack
 *
 * @file webpack.utils.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

const fs = require('fs');
const path = require('path');

const cwd = path.resolve(process.cwd());

// Webpack Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Check if Tailwind config exists
const useTailwind = fs.existsSync(path.join(cwd, 'tailwind.config.js'));

const resolve = dir => path.join(cwd, dir);

const getStyleLoader = (sourceMap = true) => {
	const loaders = {
		test: !useTailwind ? /\.scss$/ : /\.css$/,
		exclude: /node_modules/,
		use: [
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					publicPath: '../',
				},
			},
			{
				loader: require.resolve('css-loader'),
				options: {
					sourceMap,
					importLoaders: 1,
				},
			},
			{
				loader: require.resolve('postcss-loader'),
				options: {
					sourceMap,
					postcssOptions: {
						plugins: !useTailwind
							? ['postcss-100vh-fix', 'autoprefixer']
							: ['postcss-import', 'tailwindcss', 'autoprefixer'],
					},
				},
			},
		],
	};

	if (!useTailwind) {
		loaders.use.push({
			loader: 'sass-loader',
			options: {
				sassOptions: {
					sourceMap,
					precision: 10,
				},
			},
		});
	}

	return loaders;
};

module.exports = { useTailwind, resolve, getStyleLoader };
