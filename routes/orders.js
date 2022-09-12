const express = require("express");
const router = express.Router();
const { getOrders, getOrder, deleteAllOrders} = require("../controllers/pro_ord.con");
const auth = require("../Authentication/auth")

router.get('/', auth,getOrders);
router.get('/:order',auth, getOrder);
router.delete('/', auth, deleteAllOrders);

module.exports = router;