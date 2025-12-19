const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../utils/multer');
const {
  getProjects,
  createProject,
  deleteProject
} = require('../controllers/projectController');

router.get('/', getProjects);
router.post('/', auth, upload.single('image'), createProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
