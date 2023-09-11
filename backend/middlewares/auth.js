// const jwt = require('jsonwebtoken');
// const UnauthorizedError = require('../errors/unauthorizedError');

// // eslint-disable-next-line consistent-return
// module.exports = (req, res, next) => {
//   if (!req.cookies.jwt) {
//     return next(new UnauthorizedError('Требуется авторизация'));
//   }
//   const token = req.cookies.jwt;
//   let payload;
//   try {
//     payload = jwt.verify(token, 'big-daddy-caddy');
//   } catch (err) {
//     return next(new UnauthorizedError('Требуется авторизация'));
//   }
//   req.user = payload;
//   next();
// };

// const jwt = require('jsonwebtoken');
// const UnauthorizedError = require('../errors/unauthorizedError');

// require('dotenv').config(); // Load environment variables

// // eslint-disable-next-line consistent-return
// module.exports = (req, res, next) => {
//   if (!req.cookies.jwt) {
//     return next(new UnauthorizedError('Требуется авторизация'));
//   }
//   const token = req.cookies.jwt;
//   let payload;
//   try {
//     const jwtSecret = process.env.JWT_SECRET; // Use the JWT secret from the environment variable
//     payload = jwt.verify(token, jwtSecret);
//   } catch (err) {
//     return next(new UnauthorizedError('Требуется авторизация'));
//   }
//   req.user = payload;
//   next();
// };

const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  console.log(res.cookies);
  if (!req.cookies.jwt) {
    next(new UnauthorizedError('Требуется авторизация'));
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'key-secret');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
