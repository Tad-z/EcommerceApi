const express = require("express");
const router = express.Router();
const { postProduct,getProducts,patchProduct,getProduct,deleteAllProducts,} = require("../controllers/productcon");
const auth = require("../Authorization/auth");
const { upload }= require("../controllers/uploads");


router.post("/", auth, upload.single("productImage"), postProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.patch("/:id", auth, patchProduct);
router.delete("/", auth, deleteAllProducts); 

module.exports = router;
