const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../utils/multer');
const {
  getClients,
  createClient,
  deleteClient
} = require('../controllers/clientController');

router.get('/', getClients);
router.post('/', upload.single('image'), createClient);
router.delete('/:id', auth, deleteClient);

module.exports = router;
