const assert = require('assert');
const canQueryMongo = require('../../src/healthchecks/canQueryMongo');

describe('canQueryMongo', function () {
	describe('#timeout', function () {
		it('has a timeout of 500ms', function () {
			const Healthcheck = canQueryMongo({});
			const healthcheck = new Healthcheck();
			assert.equal(healthcheck.timeout, 500);
		});
	});

	describe('#resolver', function () {
		context('when the model findOne resolves', function () {
			it('resolves with a message', function () {
				const Healthcheck = canQueryMongo({
					findOne: function () { return Promise.resolve(); },
				});
				const healthcheck = new Healthcheck();
				return healthcheck
					.resolver()
					.then(msg => assert.equal('Can query the database', msg));
			});
		});

		context('when the model findOne rejects', function () {
			it('resolves with a message', function () {
				const Healthcheck = canQueryMongo({
					findOne: function () { return Promise.reject(); },
				});
				const healthcheck = new Healthcheck();
				return healthcheck
					.resolver()
					.catch(msg => assert.equal('Can not query the database', msg));
			});
		});
	});
});
