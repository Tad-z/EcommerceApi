const {
  postProduct,
  getProducts,
  getProduct,
  patchProduct,
  deleteAllProducts,
} = require("../Logic/productLogic");

// CREATING A PRODUCT
exports.postProduct = async (req, res) => {
  await postProduct(req, res);
};

// FETCHES ALL PRODUCTS
exports.getProducts = async (req, res) => {
  await getProducts(req, res);
};

// FETCH ONE PRODUCT
exports.getProduct = async (req, res) => {
  await getProduct(req, res);
};

// UPDATE A PRODUCT
exports.patchProduct = async (req, res) => {
  await patchProduct(req, res);
};

// DELETES ALL PRODUCTS
exports.deleteAllProducts = async (req, res) => {
  await deleteAllProducts(req, res);
};
