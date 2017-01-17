const Formatter = require('./Formatter');

class Runner {
	constructor (healthchecks = {}) {
		this.healthchecks = Object
			.keys(healthchecks)
			.reduce((p, c) => p.concat(healthchecks[c]), []);

		this.formatter = new Formatter();
	}

	runCheck (Check) {
		const check = new Check();
		return check.run();
	}

	runChecks () {
		return Promise.all(this.healthchecks.map(this.runCheck.bind(this)));
	}

	run () {
		return this.runChecks()
			.then(this.formatter.format.bind(this.formatter));
	}
}

module.exports = Runner;
