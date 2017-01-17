const assert = require('assert');
const Healthcheck = require('../src/Healthcheck');
const Runner = require('../src/Runner');

class SuccessCheck extends Healthcheck {
	resolver () {
		return Promise.resolve('OK');
	}
}

class FailureCheck extends Healthcheck {
	resolver () {
		return Promise.reject('OK');
	}
}

describe('Runner', function () {
	describe('run', function () {
		context('initialised with no healthchecks', function () {
			it('resolves with a valid object', function () {
				const runner = new Runner();

				return runner
					.run()
					.then(results => {
						assert.deepEqual(results, { healthy: true, healthchecks: [] });
					});
			});
		});

		context('when all checks fail', function () {
			it('resolves with a failure object', function () {
				const runner = new Runner([
					FailureCheck,
					FailureCheck,
				]);

				return runner
					.run()
					.then(results => {
						assert.deepEqual(results, {
							healthy: false,
							healthchecks: [
								{ name: 'FailureCheck', healthy: false, data: 'OK' },
								{ name: 'FailureCheck', healthy: false, data: 'OK' },
							],
						});
					});
			});
		});

		context('when at least one check fails', function () {
			it('resolves with a failure object', function () {
				const runner = new Runner([
					FailureCheck,
					SuccessCheck,
				]);

				return runner
					.run()
					.then(results => {
						assert.deepEqual(results, {
							healthy: false,
							healthchecks: [
								{ name: 'FailureCheck', healthy: false, data: 'OK' },
								{ name: 'SuccessCheck', healthy: true, data: 'OK' },
							],
						});
					});
			});
		});

		context('when all checks pass', function () {
			it('resolves with a failure object', function () {
				const runner = new Runner([
					SuccessCheck,
					SuccessCheck,
				]);

				return runner
					.run()
					.then(results => {
						assert.deepEqual(results, {
							healthy: true,
							healthchecks: [
								{ name: 'SuccessCheck', healthy: true, data: 'OK' },
								{ name: 'SuccessCheck', healthy: true, data: 'OK' },
							],
						});
					});
			});
		});
	});
});
