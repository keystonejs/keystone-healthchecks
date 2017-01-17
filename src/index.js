module.exports = {
	createRoute: require('./createRoute'),
	Healthcheck: require('./Healthcheck'),
	healthchecks: {
		CanQueryList: require('./healthchecks/CanQueryList'),
		canQueryListFactory: require('./healthchecks/canQueryListFactory'),
	}
};
