const canQueryUri = require('./canQueryUri');

module.exports = function canQueryUriFactory (uri, siteName, timeout) {
	return class CanQueryUriImpl extends canQueryUri {
		constructor (timeout) {
			super(timeout);
		}

		get uri () { return uri; }
		get siteName () { return siteName || uri; }
	};
};
