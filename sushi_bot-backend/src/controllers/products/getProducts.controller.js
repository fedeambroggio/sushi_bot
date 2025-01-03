const getProductsService = require('../../services/products/getProducts.service.js');

const getProducts = async (req, res) => {
    try {
        console.log('A')
        const products = await getProductsService();
        console.log('products', products)
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: `Error al obtener los productos: ${err}` });
    }
};

module.exports = getProducts;