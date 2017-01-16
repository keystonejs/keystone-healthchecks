class Healthcheck {
	get name () {
		return this.constructor.displayName || this.constructor.name;
	}

	timeoutError (timeout) {
		return new Promise((resolve, reject) => {
			setTimeout(() => reject('Operation timed out'), timeout);
		});
	}

	onHealthy (data) {
		return Object.assign({}, { healthy: true, data, name: this.name });
	}

	onUnhealthy (data) {
		return Object.assign({}, { healthy: false, data, name: this.name });
	}

	run () {
		const promise = (this.timeout > 0)
			? Promise.race([this.resolver(), this.timeoutError(this.timeout)])
			: this.resolver();

		return promise
			.then(this.onHealthy.bind(this))
			.catch(this.onUnhealthy.bind(this));
	}
}

module.exports = Healthcheck;
