const assert = require('assert');
const http = require('http');
const CanQueryUri = require('../../src/healthchecks/CanQueryUri');

function createHandleRequest (statusCode) {
	return (request, response) => {
		response.writeHead(statusCode, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify({
			something: true,
			somethingElse: 'false',
		}));
	}
}

describe('CanQueryUri', function () {
	describe('#timeout', function () {
		it('has a timeout of 3000ms', function () {
			const healthcheck = new CanQueryUri();
			assert.equal(healthcheck.timeout, 3000);
		});
	});
	describe('#resolver', function () {
		context('when the uri resolves with a 200', function () {
			beforeEach(function (done) {
				this.server = http.createServer(createHandleRequest(200));
				this.server.listen(3001, done);
			});
			afterEach(function (done) {
				this.server.close(done);
			});
			it('uses sitename in label success string', function () {
				class Healthcheck extends CanQueryUri {
					get siteName () {
						return 'fake site name'
					}
					get uri () {
						return 'http://localhost:3001/'
					}
				}
				const healthcheck = new Healthcheck();

				return healthcheck
					.resolver()
					.then(msg => {
						assert.equal('fake site name is available', msg)
					});
			});
		});
		context('when the uri does not resolve', function () {
			it('should notify that it could not connect', function () {
				class Healthcheck extends CanQueryUri {
					get siteName () {
						return 'fake site name'
					}
					get uri () {
						return 'http://localhost:3001/'
					}
				}

				const healthcheck = new Healthcheck();
				return healthcheck
					.resolver()
					.catch(data => {
						assert.equal('http://localhost:3001/', data.uri);
						assert.equal(typeof data.error, 'object')
					});
			});
		});
		context('when the uri resolves with not 200', function () {
			beforeEach(function (done) {
				this.server = http.createServer(createHandleRequest(500));
				this.server.listen(3001, done);
			});
			afterEach(function (done) {
				this.server.close(done);
			});
			it('resolves with a message', function () {
				class Healthcheck extends CanQueryUri {
					get siteName () {
						return 'fake site name'
					}
					get uri () {
						return 'http://localhost:3001/'
					}
				}

				const healthcheck = new Healthcheck();
				return healthcheck
					.resolver()
					.catch(data => {
						console.log('catching the resolver');
						assert.equal(data.status, '500 Internal Server Error');
						assert.equal(data.uri, 'http://localhost:3001/')
					});
			});
		});
	});
});
