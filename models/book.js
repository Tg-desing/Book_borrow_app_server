const mysql = require('mysql2');

//connection 생성
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'taegon1212',
	database: 'login_data',
});

class Book {
	constructor(book, img, category, description) {
		this.book = book;
		this.img = img;
		this.category = category;
		this.description = description;
	}

	addBook(cb) {
		let sql = `INSERT INTO book (bookName, image, category, borrower, start_date, end_date ) VALUES (?, ?, ?, ?, ?, ?)`;

		db.query(
			sql,
			[this.book, this.img, this.category, '', null, null],
			(err, rows) => {
				if (err) {
					cb({ result: false, err: err });
				} else {
					cb({ result: true });
				}
			}
		);
	}

	static removeBook(bookName, cb) {
		let sql = `DELETE FROM Book WHERE bookName = ?`;

		db.query(sql, [bookName], (err, rows) => {
			if (err) {
				cb({ result: false });
			} else {
				cb({ result: true });
			}
		});
	}

	static loadAllBook(cb) {
		let sql = `SELECT * FROM book`;

		db.query(sql, (err, rows) => {
			if (err) {
				cb({ result: false, bookData: {} });
			} else {
				console.log(rows);
				cb({ result: true, bookData: rows });
			}
		});
	}

	static loadOneBook(bookName, cb) {
		let sql = `SELECT * FROM book WHERE bookName = '${bookName}'`;

		db.query(sql, (err, rows) => {
			if (err) {
				cb({ result: false, bookData: {}, err: err });
			} else {
				cb({ result: true, bookData: rows[0], err: '' });
			}
		});
	}

	static borrowBook(bookName, username, cb) {
		let sql = `UPDATE book SET borrower = '${username}', start_date = NOW(), end_date = DATE_ADD(NOW(), INTERVAL 7 DAY) WHERE bookName = '${bookName}'`;

		db.query(sql, (err, rows) => {
			if (err) {
				cb({ result: false });
			} else {
				cb({ result: true });
			}
		});
	}

	static returnBook(bookName, cb) {
		let sql = `UPDATE book SET borrower = '', start_date = null, end_date = null WHERE bookName = '${bookName}'`;

		db.query(sql, (err, rows) => {
			if (err) {
				cb({ result: false });
			} else {
				cb({ result: true });
			}
		});
	}
}

module.exports = Book;
