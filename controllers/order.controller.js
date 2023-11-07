const { _postOrder, _getOrders, _clearOrders, _sendMail } = require("../Logic/orderLogic");

exports.postOrder = async(req, res) => {
    await _postOrder(req, res);
}

exports.getOrders = async(req, res) => {
    await _getOrders(req, res);
}

exports.sendMail = async(req, res) => {
    await _sendMail(req, res);
}

exports.clearOrders = async(req, res) => {
    await _clearOrders(req, res);
}