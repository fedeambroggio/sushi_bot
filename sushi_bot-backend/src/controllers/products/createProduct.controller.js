const Product = require("../../schemas/product.schema.js");

const createProduct = async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (err) {
      res.status(400).json({ message: "Error al crear el producto" });
    }
}

module.exports = createProduct;