// services/openaiService.js
const { OpenAI } = require("openai");

const API_KEY = "my-key";
const openai = new OpenAI({
    apiKey: API_KEY,
});

const BASE_PROMPT = `Eres un bot de sushi llamado "SushiBot". Tu tarea es interpretar las solicitudes del usuario relacionadas con un restaurante de sushi y clasificar el mensaje en una de las siguientes acciones disponibles: SHOW_MENU, PLACE_ORDER, CHECK_OPEN_HOURS o UNKNOWN_INTENT.

1. Si el usuario pide ver el menú o consultar productos disponibles, responde con "SHOW_MENU".
2. Si el usuario quiere realizar un pedido con un formato como este:  
   "MI PEDIDO:  
   -3 Sushi Roll Clásico  
   -2 Nigiri de Salmón",  
   responde con "PLACE_ORDER" y extrae la lista de productos y cantidades en formato JSON como:  
   [{"quantity": 3, "name": "Sushi Roll Clásico"}, {"quantity": 2, "name": "Nigiri de Salmón"}].
3. Si el usuario pregunta por el horario del restaurante o menciona "abierto" o "horas", responde con "CHECK_OPEN_HOURS".
4. Si el mensaje no corresponde a ninguno de los casos anteriores, responde con "UNKNOWN_INTENT".

Tu respuesta debe incluir solamente dos cosas:
1. La intención como un string: "SHOW_MENU", "PLACE_ORDER", "CHECK_OPEN_HOURS" o "UNKNOWN_INTENT".
2. Si es necesario, los datos extraídos como un objeto JSON, como los productos y cantidades en caso de un pedido. Si no hay datos que extraer, solo responde con la intención.

Ejemplo de respuesta:  
{
    "intent": "PLACE_ORDER", 
    "data": [{"quantity": 3, "name": "Sushi Roll Clásico"}, {"quantity": 2, "name": "Nigiri de Salmón"}]
}`;


async function callGPT(promptContent, previousChat) {
    try {
        const messages = [];

        const systemPrompt = {
            role: "system",
            content: BASE_PROMPT,
        };
        messages.push(systemPrompt);

        if (previousChat) {
            const assistantPrompt = {
                role: "assistant",
                content: previousChat,
            };
            messages.push(assistantPrompt);
        }

        const userPrompt = {
            role: "user",
            content: promptContent,
        };
        messages.push(userPrompt);

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        return JSON.parse(response.choices[0].message.content.trim());;
    } catch (error) {
        return `An error occurred while processing the request: ${error.message}`;
    }
}

module.exports = { callGPT };
