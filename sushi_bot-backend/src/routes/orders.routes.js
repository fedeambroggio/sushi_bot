const express = require("express");
const { createOrder } = require("../controllers/orders")

const router = express.Router();

// Create order
router.post("/", createOrder);

module.exports = router;
