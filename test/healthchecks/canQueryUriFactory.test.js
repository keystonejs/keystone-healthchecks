const assert = require('assert');
const canQueryUriFactory = require('../../src/healthchecks/canQueryUriFactory');

describe('canQueryUrifactory', function () {
	it('returns a subclass of CanQueryUri with uri and sitename set to the passed argument', function () {
		const uri = 'http://localhost:3001';
		const siteName = 'A location on the internet';
		const Healthcheck = canQueryUriFactory(uri, siteName);
		const healthcheck = new Healthcheck();
		assert.equal(healthcheck.uri, uri);
		assert.equal(healthcheck.siteName, siteName);
	});
	it('should set the sitename to the uri if no sitename is passed in', function () {
		const uri = 'http://localhost:3001';
		const Healthcheck = canQueryUriFactory(uri);
		const healthcheck = new Healthcheck();
		assert.equal(healthcheck.uri, uri);
		assert.equal(healthcheck.siteName, uri);
	});
});
