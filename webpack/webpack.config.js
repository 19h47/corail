/**
 * Webpack config
 *
 * @file webpack.config.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

const fs = require('fs');
const path = require('path');
const { merge } = require('webpack-merge');

const cwd = path.resolve(process.cwd());

const useConfig = fs.existsSync(path.join(cwd, '19h47-scripts.config.js'));

// eslint-disable-next-line import/no-dynamic-require
const config = useConfig ? require(path.join(cwd, '19h47-scripts.config.js')) : {}

const common = require('./webpack.config.common');
const production = require('./webpack.config.production');
const development = require('./webpack.config.development');

module.exports = (env, { mode }) => {
	switch (mode) {
		case 'development':
			return merge(common, development, { mode }, config);
		case 'production':
			return merge(common, production, { mode }, config);
		default:
			throw new Error(`Trying to use an unknown mode, ${mode}`);
	}
};
