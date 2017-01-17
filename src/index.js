module.exports = {
	createRoute: require('./createRoute'),
	Healthcheck: require('./Healthcheck'),
	healthchecks: {
		canQueryList: require('./healthchecks/canQueryList'),
	}
};
