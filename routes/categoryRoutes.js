const router = require('express').Router();
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory } = require('../controllers/categoryController');
const { validateCategory } = require('../validators/categoryValidator');
const { validate } = require('../middlewares/validate');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, getAllCategories);
router.get('/:id', auth, getCategoryById);
router.post('/', auth, validateCategory, validate, createCategory);
router.put('/:id', auth, validateCategory, validate, updateCategory);
router.delete('/:id', auth, deleteCategory);

module.exports = router;
