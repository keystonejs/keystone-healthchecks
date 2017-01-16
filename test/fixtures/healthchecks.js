const Healthcheck = require('../../src/Healthcheck');

class FailureImmediateCheck extends Healthcheck {
	resolver () {
		return Promise.reject('OK');
	}
}

class FailureTimeoutCheck extends Healthcheck {
	constructor (ttl, limit) {
		super();

		this.ttl = ttl || 1000;
		this.limit = limit || 1;
	}

	get timeout () {
		return this.limit;
	}

	resolver () {
		return new Promise((resolve, reject) => {
			setTimeout(() => reject('OK'), this.ttl);
		});
	}
}

class SuccessfulImmediateCheck extends Healthcheck {
	resolver () {
		return Promise.resolve('OK');
	}
}

class SuccessfulTimeoutCheck extends Healthcheck {
	get timeout () {
		return 1000;
	}

	resolver () {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve('OK'), 1000);
		});
	}
}

module.exports = {
	FailureImmediateCheck,
	FailureTimeoutCheck,
	SuccessfulImmediateCheck,
	SuccessfulTimeoutCheck,
};
