const express = require("express");
const router = express.Router();
const { postProduct,getProducts,patchProduct,getProduct,deleteAllProducts,} = require("../controllers/product.controller");
// const auth = require("../Authorization/auth");
const Products = require("../models/products")
const { upload }= require("../controllers/uploads");
const paginatedResults = require("../Pagination/paginatedResults");
const { getProductsPaginated } = require("../Logic/productLogic");


router.post("/", upload.single("productImage"), postProduct);
router.get("/page",paginatedResults(Products), getProductsPaginated);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.patch("/:id",  patchProduct);
router.delete("/", deleteAllProducts); 

module.exports = router;
