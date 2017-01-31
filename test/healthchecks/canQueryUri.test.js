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
		it('has a timeout of 1000ms', function () {
			const healthcheck = new CanQueryUri();
			assert.equal(healthcheck.timeout, 1000);
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
			.catch(msg => {
				assert.equal(typeof msg.data, 'object')
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
				.catch(msg => {
					assert.equal(msg.status, 500);
					assert.equal(typeof msg.data, 'object')
				});
			});
		});
	});
});
