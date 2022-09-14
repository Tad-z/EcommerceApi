const { getOrders, getOrder, deleteAllOrders } = require("../Logic/orderLogic");
// Fetch orders
exports.getOrders = async (req, res) => {
  await getOrders(req, res);
};

// Fetch one order
exports.getOrder = async (req, res) => {
  await getOrder(req, res);
};

//   Delete all orders
exports.deleteAllOrders = async (req, res) => {
  await deleteAllOrders(req, res);
};
