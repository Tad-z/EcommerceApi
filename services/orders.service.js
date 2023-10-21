const User = require("../models/user");


async function mappedOrders(orders) {
    const mappedOrders = orders.map(async (order) => {
        let user = {
            email: null
        };

        if (order.userId) {
            user = await User.findOne({ _id: order.userId }, { password: 0, __v: 0, _id: 0 })
        }
        return {
            fullname: order.fullname,
            phoneNumber: order.phoneNumber,
            city: order.city,
            adress: order.adress,
            createdAt: order.createdAt,
            user,
            cartItems: order.cartItems,
        };
    });
    const order = await Promise.all(mappedOrders);
    return order;
}

module.exports = {
    mappedOrders
}