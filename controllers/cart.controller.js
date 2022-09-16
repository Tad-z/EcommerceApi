const { postOrderstoCart, getOrdersfromCart, getOrderfromCart } = require("../Logic/cartLogic");
const { deleteAllOrdersfromCart, deleteOrderfromCart } = require("../Logic/cartLogic");
// Create an order
exports.postOrders = async (req, res) => {
  await postOrderstoCart(req, res);
};

// Fetch orders
exports.getOrders = async (req, res) => {
  await getOrdersfromCart(req, res);
};

// Fetch one order
exports.getOrder = async (req, res) => {
  await getOrderfromCart(req, res);
};

//   Delete all orders
exports.deleteAllOrders = async (req, res) => {
  await deleteAllOrdersfromCart(req, res);
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  await deleteOrderfromCart(req, res);
};
