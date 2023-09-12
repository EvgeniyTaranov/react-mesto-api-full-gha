const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../errors/notFoundError');

const {
  createUser,
  login,
  logout,
} = require('../controllers/users');

const {
  validationEmailAndPassword,
} = require('../middlewares/validation');

router.post('/signin', validationEmailAndPassword, login);
router.post('/signup', validationEmailAndPassword, createUser);
router.get('/signout', logout);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Неверный путь'));
});

module.exports = router;
