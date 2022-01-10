const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
class User {
	// GET /
	index(_, res) {
		res.render('index');
	}
	day(_, res) {
		res.render('day', { name: 'Day' });
	}
	month(_, res) {
		res.render('month', { name: 'Month' });
	}
	hour(_, res) {
		res.render('hour', { name: 'Hour' });
	}
	setting(_, res) {
		res.render('setting');
	}
	login(_, res) {
		res.render('login');
	}
	// POST
	async confirm(req, res) {
		const { username, password } = req.body;
		const user = await UserModel.findOne({ username, password });

		if (username.trim() === '' || password.trim() === '') {
			return res.render('login', {
				message: 'Enter an username or password ',
			});
		}
		if (!user) {
			return res.render('login', {
				message: 'User or Password is wrong',
			});
		}
		const token = jwt.sign(
			{ username, password },
			process.env.ACCESS_TOKEN_SECRET
		);
		return res
			.cookie('token', token, { expires: new Date(Date.now() + 900000) })
			.redirect('/');
	}
	// GET /logout
	logout(req, res) {
		res.clearCookie('token').redirect('/login');
	}
}
module.exports = new User();
