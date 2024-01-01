require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.cookieJwtAuth = (req, res) => {
	const token = req.body.authentication;
	console.log(token);
	console.log(token);
	try {
		const user = jwt.verify(token, process.env.SECRET_KEY);
		res.send({
			result: true,
			username: user.username,
		});
	} catch (err) {
		res.clearCookie('token');
		res.send({
			result: false,
			username: '',
		});
	}
};
