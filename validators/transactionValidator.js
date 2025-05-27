const { body } = require('express-validator');

exports.validateTransaction = [
    body('amount')
        .notEmpty()
        .withMessage('Amount is required')
        .isNumeric()
        .withMessage('Amount must be a number'),
    body('categoryId')
        .notEmpty()
        .withMessage('Category ID is required')
        .isMongoId()
        .withMessage('Invalid Category ID format'),
    body('date')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Date must be a valid date format (YYYY-MM-DD)'),
    body('note')
        .optional()
        .isString()
        .trim()
]