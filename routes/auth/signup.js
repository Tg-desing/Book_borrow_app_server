const express = require('express');

const signUpController = require('../../controllers/userSignupController');

const router = express.Router();

router.use((req, res, next) => {
	console.log('sign up process');
	next();
});

router.post('/', signUpController.addUserHandler);

module.exports = router;
