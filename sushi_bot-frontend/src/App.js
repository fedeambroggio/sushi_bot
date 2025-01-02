import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ChatBox from "./components/ChatBox/ChatBox";
import Input from "./components/Input/Input";
import FloatingButton from "./components/FloatingButton/FloatingButton";

const App = () => {
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "¡Hola! Soy Yuang Lu, tu bot de sushi. ¿En qué puedo ayudarte?. Puedes empezar rápidamente con alguna de las siguientes acciones:",
            buttons: [
                { text: "Ver Menú", intent: "SHOW_MENU" },
                { text: "Hacer Pedido", intent: "PLACE_ORDER" },
                { text: "Otras consultas", intent: "ASK_QUESTION" },
            ],
        },
    ]);
    const [input, setInput] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        // Logic for response
        const response = await axios.post(`http://localhost:5000/api/chat`, {
            message: input,
        });

        const botResponse = {
            sender: "bot",
            text: response.data.message,
        };
        setMessages((prev) => [...prev, botResponse]);

        setInput("");
    };

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev);
    };

    const handleButtonClick = async (intent) => {
        let response = "";
        let intentMessage = "";
        let botResponse = "";

        switch (intent) {
            case "SHOW_MENU":
                try {
                    /* response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`); */
                    response = await axios.get(
                        `http://localhost:5000/api/products`
                    );
                    intentMessage = "Quisiera conocer el menú";
                    botResponse = `Aquí tienes el menú:
            \n\n${response.data
                .map((product, index) => `${index + 1}. ${product.name}`)
                .join("\n")}`;
                } catch (error) {
                    botResponse =
                        "Lo siento, hubo un problema al obtener el menú.";
                }
                break;

            case "PLACE_ORDER":
                intentMessage = "Quiero hacer un pedido";
                botResponse =
                    "¡Perfecto! Por favor, indícame los productos que deseas pedir.";
                break;

            case "ASK_QUESTION":
                intentMessage = "Tengo otra consulta";
                botResponse =
                    "Claro, dime tu consulta y te ayudaré en lo que pueda.";
                break;
        }

        setMessages((prev) => [
            ...prev,
            { sender: "user", text: intentMessage },
            { sender: "bot", text: botResponse },
        ]);
    };

    return (
        <div className="chat-container">
            {isChatOpen && (
                <>
                    <ChatBox
                        messages={messages}
                        onButtonClick={handleButtonClick}
                    />
                    <Input
                        input={input}
                        setInput={setInput}
                        handleSend={handleSend}
                    />
                </>
            )}
            <FloatingButton toggleChat={toggleChat} />
        </div>
    );
};

export default App;
