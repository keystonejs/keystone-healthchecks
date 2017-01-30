const Healthcheck = require('../Healthcheck');
const http = require('http');
const https = require('https');


module.exports = class canQueryUri extends Healthcheck {
	get name () {
		return `Can Query site: ${this.siteName}`;
	}

	get timeout () {
		return 500;
	}

	resolver () {
		const client = /^https:\/\//.test(this.uri) ? https : http;

		return new Promise((resolve, reject) => {
			client.get(this.uri, res => {
				if (res.statusCode === 200) return resolve(`${this.siteName} is available`);
				return reject({
					status: res.status,
					data: res.data,
					uri: this.uri,
				});
			})
			// http and https treat an inability to hit the server or timeouts
			// differently so they throw an error instead of being passed to
			// the callback. This hook handles this.
			.on('error', (err) => {
				return reject({
					error: err,
					uri: this.uri,
				});
			});
		});
	}
};
