const path = require('path');

const resolveApp = relativePath => path.resolve(process.cwd(), relativePath);

module.exports = {
	appPath: resolveApp('.'),
	appSrc: resolveApp('src'),
};
