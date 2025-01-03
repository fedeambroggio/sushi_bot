const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "PENDING", enum: ['PENDING', 'CANCELED', 'DELIVERED'] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
