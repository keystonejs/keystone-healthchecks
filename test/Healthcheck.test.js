const assert = require('assert');

const {
	FailureTimeoutCheck,
	FailureImmediateCheck,
	SuccessfulTimeoutCheck,
	SuccessfulImmediateCheck,
} = require('./fixtures/healthchecks');

describe('Healthcheck', function () {
	context('given a timeout', function () {
		context('when the resolver takes longer than the timeout', function () {
			it('fails with a timeout error', function () {
				const healthcheck = new FailureTimeoutCheck(1000, 1);

				return healthcheck.run()
					.then(response => {
						assert.deepEqual(response, {
							name: healthcheck.name,
							healthy: false,
							data: 'Operation timed out',
						});
					});
			});
		});

		context('when the resolver succeeds before the timeout', function () {
			it('resolves with a reason', function () {
				const healthcheck = new SuccessfulTimeoutCheck();

				return healthcheck.run()
					.then(response => {
						assert.deepEqual(response, {
							name: healthcheck.name,
							healthy: true,
							data: 'OK',
						});
					});
			});
		});

		context('when the resolver fails before the timeout', function () {
			it('fails with an error', function () {
				const healthcheck = new FailureTimeoutCheck(1, 1000);

				return healthcheck.run()
					.then(response => {
						assert.deepEqual(response, {
							name: healthcheck.name,
							healthy: false,
							data: 'OK',
						});
					});
			});
		});
	});

	context('given no timeout', function () {
		context('when the resolver succeeds', function () {
			it('resolves with a reason', function () {
				const healthcheck = new SuccessfulImmediateCheck();

				return healthcheck.run()
					.then(response => {
						assert.deepEqual(response, {
							name: healthcheck.name,
							healthy: true,
							data: 'OK',
						});
					});
			});
		});

		context('when the resolver fails', function () {
			it('fails with an error', function () {
				const healthcheck = new FailureImmediateCheck();

				return healthcheck.run()
					.then(response => {
						assert.deepEqual(response, {
							name: healthcheck.name,
							healthy: false,
							data: 'OK',
						});
					});
			});
		});
	});
});
