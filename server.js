const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const loginRouter = require('./routes/auth/login');
const signUpRouter = require('./routes/auth/signup');
const authRouter = require('./routes/auth/auth');
const secretGenerator = require('./secret');
const addBookRouter = require('./routes/book/add');
const borrowBookRouter = require('./routes/book/borrow');
const removeBookRouter = require('./routes/book/remove');
const loadBookRouter = require('./routes/book/load');
const loadHomeRouter = require('./routes/main/home');
const returnBookRouter = require('./routes/book/return');

const app = express();
const port = 3001;

secretGenerator.updateSecretKey();

// 주기적으로 실행 (예: 24시간마다)
const interval = 2 * 60 * 60 * 1000; // 24시간
setInterval(secretGenerator.updateSecretKey, interval);

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.post('/auth/login', login.getUserHandler);
app.use('/auth/login', loginRouter);
app.use('/auth/signup', signUpRouter);
app.use('/auth/auth', authRouter);
app.use('/book/add', addBookRouter);
app.use('/book/remove', removeBookRouter);
app.use('/home', loadHomeRouter);
app.use('/book/load', loadBookRouter);
app.use('/book/borrow', borrowBookRouter);
app.use('/book/return', returnBookRouter);

app.listen(port, () => {
	console.log('Server port: ', port);
});
