const assert = require('assert');
const CanQueryList = require('../../src/healthchecks/CanQueryList');

describe('CanQueryList', function () {
	describe('#timeout', function () {
		it('has a timeout of 500ms', function () {
			const healthcheck = new CanQueryList();
			assert.equal(healthcheck.timeout, 500);
		});
	});

	describe('#resolver', function () {
		context('when the model findOne resolves', function () {
			it('resolves with a message', function () {
				class Healthcheck extends CanQueryList {
					get List () {
						return {
							model: {
								findOne: function () { return Promise.resolve(); },
							},
							label: 'Foo',
						};
					}
				}

				const healthcheck = new Healthcheck();
				return healthcheck
					.resolver()
					.then(msg => assert.equal('Can query the database for list Foo', msg));
			});
		});

		context('when the model findOne rejects', function () {
			it('resolves with a message', function () {
				class Healthcheck extends CanQueryList {
					get List () {
						return {
							model: {
								findOne: function () { return Promise.reject(); },
							},
							label: 'Foo',
						};
					}
				}

				const healthcheck = new Healthcheck();
				return healthcheck
					.resolver()
					.catch(msg => assert.equal('Can not query the database for list Foo', msg));
			});
		});
	});
});
