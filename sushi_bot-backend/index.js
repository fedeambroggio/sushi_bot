const express = require("express");
const cors = require("cors");
const productRoutes = require("./src/routes/products.routes.js")
const orderRoutes = require("./src/routes/orders.routes.js")
const chatRoutes = require("./src/routes/chat.routes.js")

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas base
app.get("/", (req, res) => {
  res.send("¡Bienvenido al Chatbot de Sushi! 🍣");
});

// Rutas de API
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);

module.exports = app;
