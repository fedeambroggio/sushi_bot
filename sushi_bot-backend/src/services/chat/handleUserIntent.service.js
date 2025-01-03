const getProductsService = require('../../services/products/getProducts.service.js')
const placeOrderService = require('../../services/orders/placeOrder.service.js');

const handleUserIntent = async (intent, data) => {
    try {
        let responseMessage;

        switch (intent) {
            case "SHOW_MENU":
                const productsResponse = await getProductsService();
                responseMessage = productsResponse.map((product, index) => `${index + 1}. ${product.name}`)
                break;
            case "PLACE_ORDER":
                if (data.products.length === 0) return null
                const orderResponse = await placeOrderService(data.products);
                responseMessage = `Su orden ha sido confirmada. Codigo de seguimiento: ${orderResponse._id}`
                break;
            
            default:
                responseMessage =
                    "Lo siento, no entiendo tu solicitud. ¿Puedes intentarlo de otra forma?";
        }


        return responseMessage;
    } catch (error) {
        console.error("Error handling intent:", error);
        return null;
    }
};

module.exports = handleUserIntent;