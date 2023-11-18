const db = require('../db');
const User = require('../models/user');

exports.addUserHandler = async (req, res) => {
	const userName = req.body.user;
	const studentId = req.body.student_id;
	const password = req.body.password;

	const userData = new User(userName, studentId, password);

	function callback_onAdd(object) {
		res.set('Content-Type', 'application/json');
		if (!object.result) {
			res.send({ message: 'Database failed', result: 0 });
		} else {
			res.send({ message: 'Sign up success', result: 1 });
		}
	}

	function callback_onCheck(object) {
		res.set('Content-Type', 'application/json');
		if (object.isSuccess === 'no data') {
			userData.addUser(callback_onAdd);
		} else if (object.isSuccess === 'log in') {
			res.send({ message: 'You already have account', result: 0 });
		}
	}

	userData.checkUser(callback_onCheck);
};
