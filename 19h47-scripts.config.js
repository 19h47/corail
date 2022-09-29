const path = require('path');

const cwd = path.resolve(process.cwd());

module.exports = {
	output: {
		path: path.join(cwd, 'assets'),
	},
}
