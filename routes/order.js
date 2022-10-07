const express = require("express");
const router = express.Router();
const auth = require("../Authorization/auth");
const { postOrder } = require("../controllers/order.controller");
const { getOrders, clearOrders } = require("../Logic/orderLogic");

router.post('/',auth, postOrder);
router.get('/', auth, getOrders);
router.delete('/',auth, clearOrders);

module.exports = router;