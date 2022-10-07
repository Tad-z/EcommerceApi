const express = require("express");
const router = express.Router();
const { postProduct, getProducts, getProduct, deleteAllProducts, deleteProduct} = require("../controllers/cart.controller");
const auth = require("../Authorization/auth");
const { patchQuantity } = require("../Logic/cartLogic");

router.post('/', postProduct);
router.get('/',auth, getProducts);
router.get('/:id', getProduct);
router.patch('/:id', patchQuantity);
router.delete('/', deleteAllProducts);
router.delete('/:id', deleteProduct);

module.exports = router;