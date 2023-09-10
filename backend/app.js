const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./errors/notFoundError');
const { login, createUser } = require('./controllers/users');
const { validateSignIn, validateSignUp } = require('./middlewares/validation');
const auth = require('./middlewares/auth');

const INTERNAL_SERVER_ERROR = 500;
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use(cookieParser());

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Неверный путь'));
});

app.use('/', errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }
  next();
});

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
});
