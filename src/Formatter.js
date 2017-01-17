class Formatter {
	defaultResponse () {
		return {
			healthy: true,
			healthchecks: [],
		};
	}

	constructCheckResult (check) {
		const result = {
			name: check.name,
			healthy: check.healthy,
			data: check.data,
		};

		return result;
	}

	constructResponse (response, check) {
		const result = this.constructCheckResult(check);
		response.healthy = response.healthy && check.healthy;
		response.healthchecks.push(result);

		return response;
	}

	format (checks) {
		const response = this.defaultResponse();

		return checks
			.reduce(this.constructResponse.bind(this), response);
	}
}

module.exports = Formatter;
