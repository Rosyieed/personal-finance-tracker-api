const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    note: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);