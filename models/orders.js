const mongoose = require('mongoose')


const ordersSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        default: 0
        
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model("Orders", ordersSchema);
