require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./errors/notFoundError');
const { login, createUser, logout } = require('./controllers/users');
const { validateSignIn, validateSignUp } = require('./middlewares/validation');
const auth = require('./middlewares/auth');

const INTERNAL_SERVER_ERROR = 500;
// const { PORT = 3000 } = process.env;
const { PORT = 4000 } = process.env;

const corsOptions = {
  origin: ['http://localhost:3000',
    'http://localhost:4000',
    'https://api.evgeniytaranov.nomoredomainsicu.ru',
    'http://api.evgeniytaranov.nomoredomainsicu.ru'],
  credentials: true,
};

const app = express();

app.use(cors());

app.use(express.json());

app.use(cors(corsOptions));

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.get('signout', logout);

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
