const router = require('express').Router();
const { register, login, logout } = require('../controllers/authController');
const { validateRegister } = require('../validators/authValidator');
const { validate } = require('../middlewares/validate');

router.post('/register', validateRegister, validate, register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;