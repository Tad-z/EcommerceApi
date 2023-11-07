const Order = require("../models/order");
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/products");
const { mappedProductss } = require("../services/cart.services");
const { mappedOrders } = require("../services/orders.service");
const { sendOrderConfirmationEmail } = require("../services/email.service");

exports._postOrder = async (req, res) => {
    const user = req.userData;
    console.log(user);
    const cart = await Cart.find({ userId: user.userId }).exec();
    const cartItems = await mappedProductss(cart);
    try {
        const order = new Order({
            fullname: req.body.fullname,
            city: req.body.city,
            adress: req.body.adress,
            phoneNumber: req.body.phoneNumber,
            createdAt: new Date(),
            userId: user.userId,
            cartItems: cartItems,
        })
        const result = await order.save()
        res.status(200).json(result);
        console.log(result);
    } catch (err) {
        console.log(err.message);
        res.send("erorr")
    }
}

exports._getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userData.userId }).exec();

        if (!orders.length) return res.json([]);
        const order = await mappedOrders(orders); 
        res.status(200).json({
            message: "Orders retrieved successfully",
            count: orders.length,
            order,
        })
    } catch (err) {
        console.log(err.message);
        res.send("error");
    }
};

exports._sendMail = async (req, res) => {
    if (req.method === 'POST') {
        try {
          const orderData = req.body; 
          await sendOrderConfirmationEmail(orderData);
          res.status(200).json({ message: 'Order placed and email sent.' });
        } catch (error) {
          res.status(500).json({ error });
        }
      } else {
        res.status(405).end();
      }
};

exports._clearOrders = async (req, res) => {
    try {
        await Order.deleteMany({}).then((data) => {
            res.json({
                message: `${data.deletedCount} Orders were deleted successfully!`,
            });
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            message:
                err.message || "Some error occurred while removing all Orders.",
        });
    }
}
