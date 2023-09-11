require('dotenv').config();
const validationError = require('mongoose').Error.ValidationError;
const castError = require('mongoose').Error.CastError;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
// const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(((data) => res.send(data)))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError('Пользователь с таким id не найден'));
      }
    }))
    .catch((err) => {
      if (err instanceof castError) {
        next(new BadRequestError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hashedPassword) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hashedPassword,
      })
        .then(((user) => {
          const userWithoutPassword = user.toObject();
          delete userWithoutPassword.password;
          res.send({ data: userWithoutPassword });
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Данный email уже используется'));
          }
          if (err instanceof validationError) {
            next(new BadRequestError('Ошибка при валидации'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then(((user) => res.send({ data: user })))
    .catch((err) => {
      if (err instanceof validationError) {
        next(new BadRequestError('Ошибка при валидации'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then(((user) => res.send({ data: user })))
    .catch((err) => {
      if (err instanceof validationError) {
        next(new BadRequestError('Ошибка при валидации'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'key-secret',
        { expiresIn: '7d' },
      );
      const userAgent = req.get('User-Agent');
      const regEx = /Chrome\/(\d+)/;
      const isChrome = userAgent.match(regEx);

      const cookieOptions = {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      };

      if (!isChrome || (isChrome && parseInt(isChrome[1], 10) <= 80)) {
        cookieOptions.sameSite = 'Strict';
      }

      res.cookie('jwt', token, cookieOptions);

      res.send({ jwt: token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.logout = (req, res) => {
  const userAgent = req.get('User-Agent');
  const regEx = /Chrome\/\d+/;
  if (userAgent.match(regEx) && userAgent.match(regEx).toString().replace('Chrome/', '') > 80) {
    res.clearCookie('jwt', {
      sameSite: 'None',
      secure: true,
    });
  } else {
    res.clearCookie('jwt', {
      sameSite: 'Strict',
    });
  }
  res.send({ message: 'Выход' });
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then(((data) => res.send(data)))
    .catch(next);
};
