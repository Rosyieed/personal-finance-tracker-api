const router = require('express').Router();
const { getAllUsers, getUserById } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserById); // Assuming you want to use the same controller for both routes

module.exports = router;