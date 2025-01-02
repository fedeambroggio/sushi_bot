const Product = require("../../schemas/product.schema.js");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los productos" });
    }
};

module.exports = getProducts;