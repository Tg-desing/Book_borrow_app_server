const mysql = require('mysql2');

//connection 생성
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'taegon1212',
	database: 'login_data',
});

class User {
	constructor(username, student_id, password) {
		this.username = username;
		this.student_id = student_id;
		this.password = password;
	}

	checkUser(cb) {
		let sql = `SELECT * FROM login_data WHERE student_id='${this.student_id}' AND password='${this.password}'`;

		db.query(sql, (err, rows) => {
			if (err) {
				console.log('Error occured during checking user data', err);
				cb({ isSuccess: 'error', id: -1, username: '' });
			} else if (rows.length >= 1) {
				console.log('You log in!');
				cb({
					isSuccess: 'log in',
					id: rows[0].id,
					username: rows[0].user_name,
				});
			} else if (rows.length === 0) {
				console.log('no data please make an account');
				cb({ isSuccess: 'no data', id: -1, username: '' });
			}
		});
	}

	addUser(cb) {
		let sql = `INSERT INTO login_data (user_name, student_id, password) VALUES (?, ?, ?)`;

		db.query(
			sql,
			[this.username, this.student_id, this.password],
			(err, results) => {
				if (err) {
					cb({
						message: 'Error occured during adding user data',
						result: 0,
					});
				} else {
					cb({ message: 'Adding account success', result: 1 });
				}
			}
		);
	}
}

module.exports = User;
