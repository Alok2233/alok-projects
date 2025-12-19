const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const {
  getSubscribers,
  subscribe
} = require('../controllers/newsletterController');

router.get('/', auth, getSubscribers);
router.post('/', subscribe);

module.exports = router;
