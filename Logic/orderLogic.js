const Order = require("../models/order");
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/products")

exports.postOrder = async (req, res) => {
    const user = req.userData;
    console.log(user);
    try {
        const order = new Order({
            adress: req.body.adress,
            userId: user.userId,
            cartId: req.body.cartId,
            hasPaid: true,
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
            let product = {
                productImage: null,
                title: null,
                price: 0,
                color: null,
            };

            if (order.userId) {
                user = await User.findOne({ _id: order.userId }, { password: 0, __v: 0, _id: 0 })
            }

            if (order.cartId) {
                const cart = await Cart.findOne({ _id: order.cartId })
                product = await Product.findOne({ _id: cart.productId }, { _id: 0, __v: 0 })
            }
            return {
                adress: order.adress,
                hasPaid: order.hasPaid,
                createdAt: order.createdAt,
                user,
                product,
            };
        });
        const data = await Promise.all(mappedOrders);
        res.status(200).json({
            message: "Orders retrieved successfully",
            count: orders.length,
            data,
        });
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
