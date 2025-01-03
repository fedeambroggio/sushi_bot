const detectIntent = require('../../services/chat/detectIntent.service.js')
const handleUserIntent = require('../../services/chat/handleUserIntent.service.js')

// Controller for detecting user intent
const userInteraction = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "El input del mensaje es requerido" });
        }

        // Detect intent
        const processedMessage = detectIntent(message);

        // Perform action
        const messageResponse = await handleUserIntent(processedMessage.intent, processedMessage.data)
        if (!messageResponse) throw Error(`'No fue posible manejar el mensaje`)

        // Respond with detected intent
        res.status(200).json({
            message: messageResponse,
        });
    } catch (error) {
        res.status(500).json({ message: `Error al procesar el mensaje del cliente: ${error}` });
    }
};

module.exports = userInteraction;
