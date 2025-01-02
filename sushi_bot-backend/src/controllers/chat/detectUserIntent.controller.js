const detectIntent = require('../../utils/detectIntent.js')
const handleUserIntent = require('../../controllers/chat/handleUserIntent.controller.js')

// Controller for detecting user intent
const detectUserIntent = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "El input del mensaje es requerido" });
        }

        // Detect intent
        const intent = detectIntent(message);

        // Perform action
        const messageResponse = await handleUserIntent(intent)
        if (!messageResponse) throw Error('No fue posible manejar el mensaje')

        // Respond with detected intent
        res.status(200).json({
            intent,
            message: messageResponse,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al procesar el mensaje del cliente" });
    }
};

module.exports = detectUserIntent;
