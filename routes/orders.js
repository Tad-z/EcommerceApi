const express = require("express");
const router = express.Router();
const { postOrders, getOrders, getOrder, deleteAllOrders, deleteOrder} = require("../controllers/cart.controller");
const auth = require("../Authorization/auth")

router.post('/', auth, postOrders);
router.get('/', auth, getOrders);
router.get('/:order',auth, getOrder);
router.delete('/', auth, deleteAllOrders);
router.delete('/:id', auth, deleteOrder);

module.exports = router;