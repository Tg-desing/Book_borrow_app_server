const express = require('express');

const AuthController = require('../../controllers/jwtController');

const router = express.Router();

router.use((req, res, next) => {
	console.log('Auth Checking');
	next();
});

router.post('/', AuthController.cookieJwtAuth);

module.exports = router;
