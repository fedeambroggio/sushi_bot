const express = require("express");
const { getProducts, createProduct } = require("../controllers/products")


const router = express.Router();

// Get products
router.get("/", getProducts);
router.post("/", createProduct);

module.exports = router;