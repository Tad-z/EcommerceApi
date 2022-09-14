const express = require("express");
const router = express.Router();
const { getOrders, getOrder, deleteAllOrders} = require("../controllers/order.controller");
const auth = require("../Authorization/auth")

router.get('/', auth,getOrders);
router.get('/:order',auth, getOrder);
router.delete('/', auth, deleteAllOrders);

module.exports = router;