const express = require("express");
const router = express.Router();
const { postProduct, getProducts, getProduct, deleteAllProducts, deleteProduct} = require("../controllers/cart.controller");
const auth = require("../Authorization/auth");

router.post('/', auth, postProduct);
router.get('/', auth, getProducts);
router.get('/:id',auth, getProduct);
router.delete('/', auth, deleteAllProducts);
router.delete('/:id', auth, deleteProduct);

module.exports = router;