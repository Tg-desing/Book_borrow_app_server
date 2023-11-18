require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.cookieJwtAuth = (req, res, next) => {
	const { token } = req.cookies;
	try {
		const user = jwt.verify(token, process.env.SECRET_KEY);
		req.userdata = user;
		next();
	} catch (err) {
		res.clearCookie('token');
	}
};
