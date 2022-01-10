const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
	const { token } = req.cookies;
	if (!token) {
		return res.redirect('login');
	}
	try {
		const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		if (user) {
			next();
		} else {
			res.sendStatus(403);
		}
	} catch (error) {
		return res.sendStatus(403);
	}
}
module.exports = verifyToken;
