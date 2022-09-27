const { postProducttoCart, getProductsfromCart, getProductfromCart } = require("../Logic/cartLogic");
const { deleteAllProductsfromCart, deleteProductfromCart } = require("../Logic/cartLogic");
// Create an order
exports.postProduct = async (req, res) => {
  await postProducttoCart(req, res);
};

// Fetch orders
exports.getProducts = async (req, res) => {
  await getProductsfromCart(req, res);
};

// Fetch one order
exports.getProduct = async (req, res) => {
  await getProductfromCart(req, res);
};

//   Delete all orders
exports.deleteAllProducts = async (req, res) => {
  await deleteAllProductsfromCart(req, res);
};

// Delete an order
exports.deleteProduct = async (req, res) => {
  await deleteProductfromCart(req, res);
};
