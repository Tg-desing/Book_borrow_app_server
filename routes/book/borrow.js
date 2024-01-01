const express = require('express');

const router = express.Router();

const { cookieJwtAuth } = require('../../controllers/jwtController');
const bookController = require('../../controllers/bookDataController');

router.use((req, res, next) => {
	console.log('router for borrow book');
	next();
});

router.post('/', bookController.bookBorrowController);

module.exports = router;
