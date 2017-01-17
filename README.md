# keystone-healthchecks

Healthchecks Framework for KeystoneJS (or any Express app)

Enable the default healthchecks for Keystone by adding this package to your
project and setting the following option:

```js
keystone.set('healthchecks', true)
```

Or, you can define your own healthchecks and import them like this:

```js
// this will import all javascript files in the ./healthchecks directory
keystone.set('healthchecks', keystone.import('healthchecks'));
```

## Custom Integration

For more control, you can create the healthcheck route handler and plug it into
any express app or router by using the `createRoute` method, e.g

```js
const checks = { MyHealthCheck }; // see below
app.use('/is-everything-ok', require('keystone-healthchecks').createRoute(checks));
```

## Creating Healthchecks

Each healthcheck should export a Class that extends `Healthcheck`, e.g

```js
const healthchecks = require('keystone-healthchecks');
const Healthcheck = healthchecks.Healthcheck;

module.exports = class MyHealthCheck extends Healthcheck {
	// optional, will default to the name of the Class
	get name () {
		return `My Health Check`;
	}
	// optional, defines a timeout for the check in ms
	get timeout () {
		return 500;
	}
	// required, must return a Promise or Promise.resolve for pass or
	// Promise.reject for fail. The argument passed to the resolve / reject
	// will be returned by the healthcheck endpoint, along with the status
	resolver () {
		return keepCalmAndCarryOn()
			.then(() => Promise.resolve('This is Fine'))
			.catch(() => Promise.reject('OMG THIS IS NOT OK'));
	}
};
```

## License

MIT Licensed. Copyright (c) 2017 Thinkmill Pty Ltd
