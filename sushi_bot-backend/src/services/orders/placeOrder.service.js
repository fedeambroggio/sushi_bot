const Order = require("../../schemas/order.schema.js");
const Product = require("../../schemas/product.schema.js");

const placeOrderService = async (products) => {
    try {
        // Step 1: Get & Check products
        const productNames = products.map(item => item.name);
        const existingProducts = await Product.find({ 'name': { $in: productNames } });

        if (existingProducts.length !== products.length) {
            throw new Error("Algunos productos no existen.");
        }

        // Step 2: Calculate price
        let totalPrice = 0;
        for (let item of products) {
            const product = existingProducts.find(p => p.name === item.name);
            totalPrice += product.price * item.quantity;
            item.productId = product._id;
        }

        // Step 3: Create order
        const newOrder = new Order({
            products,
            total: totalPrice,
            status: "PENDING", 
        });

        // Guardar la orden en la base de datos
        await newOrder.save();

        return newOrder;
    } catch (error) {
        throw new Error(`No se pudo procesar la orden: ${error}`);
    }
};

module.exports =  placeOrderService;
