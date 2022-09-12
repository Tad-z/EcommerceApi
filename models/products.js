const { date } = require('joi');
const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders'
    }
});


module.exports = mongoose.model("Products", productsSchema);

