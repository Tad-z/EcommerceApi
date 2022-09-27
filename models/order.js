const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',    
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    adress: {
        type: String,
        required: true,
    }, 
    hasPaid: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model("Order", orderSchema);
