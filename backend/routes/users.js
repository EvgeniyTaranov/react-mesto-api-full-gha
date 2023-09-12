const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validationUserAvatar,
  validationUserId,
  validationUserInfo,
} = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');

userRouter.use(auth);
userRouter.get('/', getUsers);
userRouter.get('/me', getUserMe);
userRouter.get('/:id', validationUserId, getUserById);
userRouter.patch('/me', validationUserInfo, updateUser);
userRouter.patch('/me/avatar', validationUserAvatar, updateAvatar);

module.exports = userRouter;
