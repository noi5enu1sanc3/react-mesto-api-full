const router = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateCreateCard, validateGetCardById } = require('../middlewares/validation');

router.get('/cards/', getCards);
router.post('/cards/', validateCreateCard, createCard);
router.delete('/cards/:cardId', validateGetCardById, deleteCard);
router.put('/cards/:cardId/likes', validateGetCardById, likeCard);
router.delete('/cards/:cardId/likes', validateGetCardById, dislikeCard);

module.exports = router;
