const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Category = require('../models/Category');

// get Transaction User Auth
exports.getTransaction = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const transactions = await Transaction.find({ userId })
            .populate('categoryId', 'name type')
            .sort({ date: -1 });

        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for this user' });
        }

        res.status(200).json({
            message: 'Transactions retrieved successfully',
            transactions,
        });

    } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

// Get Transaction by ID User Auth
exports.getTransactionById = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactionId = req.params.id;

        const transaction = await Transaction.findOne({ _id: transactionId, userId })
            .populate('categoryId', 'name type');

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({
            message: 'Transaction retrieved successfully',
            transaction,
        });

    } catch (error) {
        console.error('Error retrieving transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// create Transaction User Auth
exports.createTransaction = async (req, res) => {
    try {
        const { amount, categoryId, date, note } = req.body;
        const userId = req.user.id;
        const category = await Category.findById(categoryId);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const transaction = new Transaction({
            userId,
            amount,
            categoryId,
            date: date ? new Date(date) : new Date(),
            note: note || '',
        });
        await transaction.save();

        res.status(201).json({
            message: 'Transaction created successfully',
            transaction,
        });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

// Update Transaction User Auth
exports.updateTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const { amount, categoryId, date, note } = req.body;
        const userId = req.user.id;

        const transaction = await Transaction.findOne({ _id: transactionId, userId });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        transaction.amount = amount;
        transaction.categoryId = categoryId;
        transaction.date = date ? new Date(date) : new Date();
        transaction.note = note || '';
        await transaction.save();

        res.status(200).json({
            message: 'Transaction updated successfully',
            transaction,
        });
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

exports.deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const userId = req.user.id;
        const transaction = await Transaction.findOneAndDelete({ _id: transactionId, userId });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({
            message: 'Transaction deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ message: 'Internal server error' });

    }
}