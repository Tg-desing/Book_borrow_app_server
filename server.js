const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const cors = require('cors');

const loginRouter = require('./routes/auth/login');
const signUpRouter = require('./routes/auth/signup');
const secretGenerator = require('./secret');

const app = express();
const port = 3001;

secretGenerator.updateSecretKey();

// 주기적으로 실행 (예: 24시간마다)
const interval = 2 * 60 * 60 * 1000; // 24시간
setInterval(secretGenerator.updateSecretKey, interval);

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.post('/auth/login', login.getUserHandler);
app.use('/auth/login', loginRouter);
app.use('/auth/signup', signUpRouter);

app.listen(port, () => {
	console.log('Server port: ', port);
});
