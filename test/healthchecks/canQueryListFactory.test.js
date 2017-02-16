const assert = require('assert');
const canQueryListFactory = require('../../src/healthchecks/canQueryListFactory');

describe('canQueryListfactory', function () {
	it('returns a subclass of CanQueryList with List set to the passed argument', function () {
		const List = {};
		const Healthcheck = canQueryListFactory(List);
		const healthcheck = new Healthcheck();
		assert.equal(healthcheck.List, List);
	});
});
