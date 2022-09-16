const mongoose = require('mongoose')


const ordersSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1
        
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model("Orders", ordersSchema);
