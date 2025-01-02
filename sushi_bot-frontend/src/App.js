import React, { useState } from "react";
import "./App.css";
import ChatBox from "./components/ChatBox/ChatBox";
import Input from "./components/Input/Input";
import FloatingButton from "./components/FloatingButton/FloatingButton";

const App = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "¡Hola! Soy tu bot de sushi. ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botResponse = { sender: "bot", text: "Respuesta automática." };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInput("");
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div className="chat-container">
      {isChatOpen && (
        <>
          <ChatBox messages={messages} />
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
