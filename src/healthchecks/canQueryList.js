const Healthcheck = require('../Healthcheck');

module.exports = function canQueryList (List) {
	return class CanQueryList extends Healthcheck {

		get timeout () {
			return 500;
		}

		resolver () {
			return List.model
				.findOne()
				.then(() => Promise.resolve('Can query the database for list ' + List.label))
				.catch(() => Promise.reject('Can not query the database for list ' + List.label));
		}
	};
};
