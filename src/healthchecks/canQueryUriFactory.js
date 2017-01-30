const canQueryUri = require('./canQueryUri');

module.exports = function canQueryUriFactory (uri, siteName) {
	return class canQueryUriImpl extends canQueryUri {
		get uri () { return uri; }
		get siteName () { return siteName || uri; }
	};
};
