const assert = require('assert');
const Formatter = require('../src/Formatter');

describe('Formatter', function () {
	describe('format', function () {
		context('at least one fail', function () {
			it('returns an object with healthy === false', function () {
				const formatter = new Formatter();
				const response = formatter.format([
					{ name: 'fail1', healthy: false, data: {} },
					{ name: 'pass1', healthy: true, data: {} },
				]);
				const expected = {
					healthy: false,
					data: [
						{ name: 'fail1', healthy: false, data: {} },
						{ name: 'pass1', healthy: true, data: {} },
					],
				};

				assert.deepEqual(response, expected);
			});
		});

		context('all pass', function () {
			it('returns an object with healthy === false', function () {
				const formatter = new Formatter();
				const response = formatter.format([
					{ name: 'pass1', healthy: true, data: {} },
					{ name: 'pass2', healthy: true, data: {} },
				]);
				const expected = {
					healthy: true,
					data: [
						{ name: 'pass1', healthy: true, data: {} },
						{ name: 'pass2', healthy: true, data: {} },
					],
				};

				assert.deepEqual(response, expected);
			});
		});
	});
});
