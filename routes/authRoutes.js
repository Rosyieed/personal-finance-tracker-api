const router = require('express').Router();
const { register } = require('../controllers/authController');
const { validateRegister } = require('../validators/authValidator');
const { validate } = require('../middlewares/validate');

router.post('/register', validateRegister, validate, register);

module.exports = router;