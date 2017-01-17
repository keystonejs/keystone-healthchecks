const CanQueryList = require('./CanQueryList');

module.exports = function canQueryListFactory (list) {
	return class CanQueryListImpl extends CanQueryList {
		get List () { return list; }
	};
};
