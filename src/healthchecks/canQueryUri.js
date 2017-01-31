const Healthcheck = require('../Healthcheck');
const http = require('http');
const https = require('https');
const url = require('url');


module.exports = class canQueryUri extends Healthcheck {
	get name () {
		return `Can Query site: ${this.siteName}`;
	}

	get timeout () {
		return 3000;
	}

	resolver () {
		const client = (url.parse(this.uri).protocol === 'https:') ? https : http;

		return new Promise((resolve, reject) => {
			client.get(this.uri, res => {
				if (res.statusCode === 200) return resolve(`${this.siteName} is available`);
				
				var body = '';
		        res.on('data', (chunk) => body += chunk);
				res.on('end', () => {
					return reject({
						status: `${res.statusCode} ${res.statusMessage}`,
						body: body,
						uri: this.uri,
					});
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
