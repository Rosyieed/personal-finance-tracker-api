const { body } = require('express-validator');

exports.validateCategory = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),
    body('type')
        .notEmpty()
        .withMessage('Type is required')
        .isIn(['income', 'expense'])
        .withMessage('Type must be either "income" or "expense"')
];