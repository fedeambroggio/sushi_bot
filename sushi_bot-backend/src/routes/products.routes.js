const express = require("express");
const Product = require("../schemas/product.schema.js");

const router = express.Router();

// Get products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
});

// Create products
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: "Error al crear el producto" });
  }
});

module.exports = router;
