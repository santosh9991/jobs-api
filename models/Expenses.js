const mongoose = require('mongoose');
const expenseSchema = mongoose.Schema({
    amount:{
        type: Number,
        require:[true, 'Please provide the expense amount']
    },
    category: {
        type: String,
        require: [true, 'Please provide the category']
    },
    merchant: {
        type: String,
        require: [true, 'Please provide the merchant details']
    },
    purchaseDate: {
        type: Date,
        required: [true, 'Please provide the purchase date']
    },
    description:{
        type: String,
        default: ''
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
      }
}, { timestamps: true });


module.exports = mongoose.model('Expense', expenseSchema);