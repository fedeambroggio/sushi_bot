const detectIntent = (message) => {
    const lowerCaseMessage = message.toLowerCase();

    // Init
    let result = {
        intent: "UNKNOWN_INTENT",
        data: {}
    };

    console.log('lowerCaseMessage', lowerCaseMessage)

    // Basic keyword matching for intent detection
    if (lowerCaseMessage.includes("menu")) {
        result.intent = "SHOW_MENU";
    } else if (lowerCaseMessage.includes("pedido")) {
        result.intent = "PLACE_ORDER";
        // Regex para capturar productos y cantidades
        const orderRegex = /-(\d+)\s+([A-Za-z0-9\s]+(?:[^\n-]*))/g;
        const products = [];
        
        let match;
        while ((match = orderRegex.exec(message)) !== null) {
            const quantity = parseInt(match[1], 10); 
            const productName = match[2].trim(); 
        
            products.push({ quantity, name: productName });
        }
        
        result.data = { products };
    } else if (lowerCaseMessage.includes("abierto") || lowerCaseMessage.includes("horas")) {
        result.intent = "CHECK_OPEN_HOURS";
    } else {
        result.intent = "UNKNOWN_INTENT";
    }


    return result;
};

module.exports = detectIntent;