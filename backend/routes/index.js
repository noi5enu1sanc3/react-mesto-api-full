const router = require('express').Router();

const auth = require('../middlewares/auth');

const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, login } = require('../controllers/users');

const NotFoundError = require('../helpers/errors/NotFoundError');
const { pageNotFoundMessage } = require('../helpers/constants');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use(userRouter);
router.use(cardRouter);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt')
    .send({ message: 'Logged out' });
});

router.use((req, res, next) => next(new NotFoundError(pageNotFoundMessage)));

module.exports = router;
