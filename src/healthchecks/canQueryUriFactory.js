const CanQueryUri = require('./CanQueryUri');

module.exports = function canQueryUriFactory (uri, siteName, timeout) {
	return class CanQueryUriImpl extends CanQueryUri {
		constructor (timeout) {
			super(timeout);
		}

		get uri () { return uri; }
		get siteName () { return siteName || uri; }
	};
};
