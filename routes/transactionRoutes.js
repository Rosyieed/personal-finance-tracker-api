const router = require('express').Router();
const { getTransaction, createTransaction, getTransactionById, updateTransaction, deleteTransaction, getSummary, exportCsv } = require('../controllers/transactionController');
const auth = require('../middlewares/authMiddleware');
const { validateTransaction } = require('../validators/transactionValidator');
const { validate } = require('../middlewares/validate');

router.get('/', auth, getTransaction);
router.get('/summary', auth, getSummary);
router.get('/:id', auth, getTransactionById);
router.post('/', auth, validateTransaction, validate, createTransaction);
router.put('/:id', auth, validateTransaction, validate, updateTransaction);
router.delete('/:id', auth, deleteTransaction);
router.get('/export/csv', auth, exportCsv);

module.exports = router;