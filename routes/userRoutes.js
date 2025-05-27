const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const { getAllUsers, getUserById } = require('../controllers/userController');

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById); // Assuming you want to use the same controller for both routes

module.exports = router;