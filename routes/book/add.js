const express = require('express');

const router = express.Router();

const { cookieJwtAuth } = require('../../controllers/jwtController');
const bookController = require('../../controllers/bookDataController');

router.use((req, res, next) => {
	console.log('router for add one book');
	next();
});

router.post('/', bookController.addBookController);

module.exports = router;
