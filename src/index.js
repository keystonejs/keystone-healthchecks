module.exports = {
	createRoute: require('./createRoute'),
	Healthcheck: require('./Healthcheck'),
	healthchecks: {
		canQueryMongo: require('./healthchecks/canQueryMongo'),
	}
};
