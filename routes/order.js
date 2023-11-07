const express = require("express");
const router = express.Router();
const auth = require("../Authorization/auth");
const { postOrder, sendMail, getOrders, clearOrders } = require("../controllers/order.controller");

router.post('/',auth, postOrder);
router.get('/', auth, getOrders);
router.post('/sendMail', sendMail);
router.delete('/',auth, clearOrders);

module.exports = router;