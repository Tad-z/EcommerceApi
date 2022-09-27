const { postOrder, getOrders, clearOrders } = require("../Logic/orderLogic");

exports.postOrder = async(req, res) => {
    await postOrder(req, res);
}

exports.getOrders = async(req, res) => {
    await getOrders(req, res);
}

exports.clearOrders = async(req, res) => {
    await clearOrders(req, res);
}