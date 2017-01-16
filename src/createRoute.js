const over = require('lodash/over');
const Runner = require('./Runner');

function formatters (res) {
	return function (results) {
		return {
			'text/plain': () => res.send(JSON.stringify(results, null, 2)),
			'application/json': () => res.json(results),
			'default': () => res.json(results),
		};
	};
};

function status (results) {
	return results.healthy
		? 200
		: 500;
}

function respond (responder) {
	return function ([status, formatters]) {
		return responder
			.status(status)
			.format(formatters);
	};
}

module.exports = function createRoute (healthchecks) {
	return function route (req, res, next) {
		const runner = new Runner(healthchecks);

		runner
			.run()
			.then(over([status, formatters(res)]))
			.then(respond(res))
			.catch(next);
	};
};
