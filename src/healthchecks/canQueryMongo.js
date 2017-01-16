const Healthcheck = require('../Healthcheck');

module.exports = function canQueryMongo (model) {
	return class CanQueryMongo extends Healthcheck {
		get timeout () {
			return 500;
		}

		resolver () {
			return model
				.findOne()
				.then(() => Promise.resolve('Can query the database'))
				.catch(() => Promise.reject('Can not query the database'));
		}
	};
};
