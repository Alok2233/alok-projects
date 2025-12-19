const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const {
  getContacts,
  createContact
} = require('../controllers/contactController');

router.get('/',  getContacts);
router.post('/', createContact);

module.exports = router;
