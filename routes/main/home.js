const express = require('express');

const router = express.Router();

const { cookieJwtAuth } = require('../../controllers/jwtController');
const bookController = require('../../controllers/bookDataController');

router.use((req, res, next) => {
	console.log('router for main database');
	next();
});

router.get('/', bookController.loadAllBookController);

module.exports = router;
