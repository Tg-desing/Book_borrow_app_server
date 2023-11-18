const express = require('express');

const loginController = require('../../controllers/userLoginController');

const router = express.Router();

router.use((req, res, next) => {
	console.log('middleware for login');
	next();
});

router.post('/', loginController.getUserHandler);

module.exports = router;
