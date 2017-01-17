const Healthcheck = require('../Healthcheck');

module.exports = class CanQueryList extends Healthcheck {
	get name () {
		return `Can Query List: ${this.List.label}`;
	}

	get timeout () {
		return 500;
	}

	resolver () {
		return this
			.List
			.model
			.findOne()
			.then(() => Promise.resolve('Can query the database for list ' + this.List.label))
			.catch(() => Promise.reject('Can not query the database for list ' + this.List.label));
	}
};
