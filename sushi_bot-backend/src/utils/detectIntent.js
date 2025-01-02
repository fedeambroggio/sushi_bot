const detectIntent = (message) => {
    const lowerCaseMessage = message.toLowerCase();

    // Basic keyword matching for intent detection
    if (lowerCaseMessage.includes("menu")) {
        return "SHOW_MENU";
    } else if (lowerCaseMessage.includes("pedido")) {
        return "PLACE_ORDER";
    } else if (lowerCaseMessage.includes("abierto") || lowerCaseMessage.includes("horas")) {
        return "CHECK_OPEN_HOURS";
    } else {
        return "UNKNOWN_INTENT";
    }
};

module.exports = detectIntent;