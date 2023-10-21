const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')
const Cart = require("../models/cart");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    fullname: {
        type: String,
        required: true,
    }, 
    city: {
        type: String,
        required: true,
    }, 
    adress: {
        type: String,
        required: true,
    }, 
    phoneNumber: {
        type: Number,
        required: true,
    },
    cartItems: {
        type: Array,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model("Order", orderSchema);
