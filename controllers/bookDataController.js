const Book = require('../models/book');
require('dotenv').config();

exports.addBookController = async (req, res) => {
	const bookName = req.body.bookName;
	const image = req.body.image;
	const category = req.body.category;

	const book = new Book(bookName, image, category);

	function callback_onAdd(object) {
		res.set('Content-Type', 'application/json');
		res.send({ result: object.result });
	}

	book.addBook(callback_onAdd);
};

exports.removeBookController = async (req, res) => {
	const username = req.body.username;

	function callback_onRemove(object) {
		res.set('Content-Type', 'application/json');
		res.send({ result: object.result });
	}

	if (username === 'CoMit') {
		const bookName = req.body.bookName;
		// const username = user.sername;

		Book.removeBook(bookName, callback_onRemove);
	}
};

exports.loadAllBookController = async (req, res) => {
	function callback_onLoadAll(object) {
		res.set('Content-Type', 'application/json');
		// const length = object.bookData.length();
		const bookList = object.bookData.map((item) => {
			return {
				bookName: item.bookName,
				category: item.category,
				image: item.image,
				description: item.description,
			};
		});
		res.send({ result: object.result, bookData: bookList });
	}

	Book.loadAllBook(callback_onLoadAll);
};

exports.loadOneBookController = async (req, res) => {
	const bookName = req.body.bookName;

	function callback_onLoadOne(object) {
		res.set('Content-Type', 'application/json');

		res.send({
			result: object.result,
			bookData: object.bookData,
			err: object.err,
		});
	}

	Book.loadOneBook(bookName, callback_onLoadOne);
};

exports.bookBorrowController = async (req, res) => {
	const borrower = req.body.username;
	const bookName = req.body.bookName;

	function callback_onBorrow(object) {
		res.set('Content-Type', 'application/json');

		res.send({ result: object.result });
	}

	Book.borrowBook(bookName, borrower, callback_onBorrow);
};

exports.returnBookController = async (req, res) => {
	const bookName = req.body.bookName;

	function callback_onReturn(object) {
		res.set('Content-Type', 'application/json');

		res.send({ result: object.result });
	}

	Book.returnBook(bookName, callback_onReturn);
};
