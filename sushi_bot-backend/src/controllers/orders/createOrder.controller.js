const placeOrder = require("../../services/orders/placeOrder.service");

const createOrder = async (req, res) => {
    const {  products } = req.body;

    // Perform validations
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Datos inválidos. Se requieren productos." });
    }
    for (let item of products) {
        if (!item.productId || !item.quantity || item.quantity <= 0) {
            return res.status(400).json({ message: "Cada producto debe tener un productId válido y una cantidad mayor que 0." });
        }
    }

    try {
        const newOrder = await placeOrder(userId, products);

        return res.status(201).json({
            message: "Orden creada con éxito",
            order: newOrder,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Hubo un problema al crear la orden." });
    }
};

module.exports = createOrder;
