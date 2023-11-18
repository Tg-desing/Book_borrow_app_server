const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.getUserHandler = async (req, res) => {
	let username = '';
	const studentId = req.body.student_id;
	const password = req.body.password;

	res.set('Content-Type', 'application/json');
	const userData = new User(username, studentId, password);

	function callback_onCheck(object) {
		console.log(object);
		if (object.isSuccess === 'no data') {
			res.send({
				message: 'You have to sign up first',
				userData: { username: object.username },
				result: 0,
			});
		} else if (object.isSuccess === 'error') {
			res.send({
				message: 'Database query failed',
				userData: { username: object.username },
				result: 0,
			});
		} else if (object.isSuccess === 'log in') {
			const token = jwt.sign(
				{ username: object.username, password: password },
				process.env.SECRET_KEY,
				{ expiresIn: '1h' }
			);
			res.cookie('token', token, { httpOnly: true });
			res.send({
				message: 'log in success',
				userData: { username: object.username },
				result: 0,
			});
		}
	}
	userData.checkUser(callback_onCheck);
};
