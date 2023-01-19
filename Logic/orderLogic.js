const Order = require("../models/order");
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/products")

exports.postOrder = async (req, res) => {
    const user = req.userData;
    console.log(req.body);
    try {
        const order = new Order({
            fullname: req.body.fullname,
            city: req.body.city,
            adress: req.body.adress,
            userId: user.userId, 
            cart: req.body.data,
            createdAt: new Date()
        })
        const result = await order.save()
        res.status(200).json(result);
    } catch (err) {
        console.log(err.message);
        res.send("erorr")
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userData.userId }).exec();

        if (!orders.length) return res.json([]);
        const mappedOrders = orders.map(async (order) => {
            let user = {
                username: null,
                email: null
            };

            if (order.userId) {
                user = await User.findOne({ _id: order.userId }, { password: 0, __v: 0, _id: 0 })
            }
            return {
                fullname: order.fullname,
                city: order.city,
                adress: order.adress,
                createdAt: order.createdAt,
                user,
                cart: order.cart,
            };
        });
        const data = await Promise.all(mappedOrders);
        res.status(200).json({
            message: "Orders retrieved successfully",
            count: orders.length,
            data,
        })
    } catch (err) {
        console.log(err.message);
        res.send("error");
    }
};

exports.clearOrders = async (req, res) => {
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
