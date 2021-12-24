const solarRoute = require('./solar');
const userRoute = require('./user');
function route(app) {
	app.use('/api', solarRoute);
	app.use('/', userRoute);
}

module.exports = route;
