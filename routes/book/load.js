const express = require('express');

const router = express.Router();

const { cookieJwtAuth } = require('../../controllers/jwtController');
const bookController = require('../../controllers/bookDataController');

router.use((req, res, next) => {
	console.log('router for load one book');
	next();
});

router.post('/', bookController.loadOneBookController);

module.exports = router;
