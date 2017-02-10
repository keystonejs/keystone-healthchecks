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

## Using Existing Health Checks

There are several health checks of kinds often used in a keystone application provided, a List health check to check on a keystone model and ensure database connectivity, and a uri health check that can check a generic external dependency.

These both have a class that extends `HealthCheck` as well as a factory function to create them.

These can be required at:

```js
const { healthchecks } = require('keystone-healthchecks');
```

# canQueryListFactory

This function takes in a keystone List object, and returns a health check that will perform a `findOne` operation on the list. You can set one up as follows:

```js
const User = require('keystone').List('User');
const canQueryListFactory = require('keystone-healthchecks').healthchecks.canQueryListFactory

const check = canQueryListFactory(User);
```

# canQueryUriFactory

This is a standard health check for an external uri which does not require any form of authorisation. It makes a http request to the endpoint, and treats a 200 response as a valid status, while treating all other responses as an error. It can be set up as follows.

It has one required parameters, a `uri`, and then two optional parameters, `siteName` and `timeout`.

If no `siteName` is provided, the check's name is defaulted to the uri. If no `timeout` is provided, the `timeout` is defaulted to 3 seconds.

```js
const canQueryUriFactory = require('keystone-healthchecks').healthchecks.canQueryUriFactory.

const check = canQueryUriFactory('http://aplaceontheinternet.com'
```

## License

MIT Licensed. Copyright (c) 2017 Thinkmill Pty Ltd
