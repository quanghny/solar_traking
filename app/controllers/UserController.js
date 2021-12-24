class User {
	// GET /
	index(_, res) {
		res.render('index');
	}
	day(_, res) {
		res.render('day');
	}
	month(_, res) {
		res.render('month');
	}
	hour(_, res) {
		res.render('hour');
	}
}
module.exports = new User();
