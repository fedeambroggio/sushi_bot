const express = require("express");
const Order = require("../schemas/order.schema.js");

const router = express.Router();

// Create order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: "Error al crear el pedido" });
  }
});

// Get orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("products.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener los pedidos" });
  }
});

module.exports = router;
