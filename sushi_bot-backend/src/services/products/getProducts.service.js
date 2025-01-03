const Product = require("../../schemas/product.schema.js");

const getProductsService = async () => {
    return Product.find();
}

module.exports = getProductsService;