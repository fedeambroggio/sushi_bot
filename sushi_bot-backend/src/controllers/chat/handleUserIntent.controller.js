const Product = require("../../schemas/product.schema.js");

const handleUserIntent = async (intent) => {
    try {
        let responseMessage;

        switch (intent) {
            case "SHOW_MENU":
                const response = await Product.find();
                responseMessage = response.map((product, index) => `${index + 1}. ${product.name}`)
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
