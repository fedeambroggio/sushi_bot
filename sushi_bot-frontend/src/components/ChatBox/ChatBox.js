import React from "react";
import Message from "../Message/Message";
import "./ChatBox.css"

const ChatBox = ({ messages, onButtonClick }) => {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} buttons={msg.buttons} onButtonClick={onButtonClick} />      
      ))}
    </div>
  );
};


export default ChatBox;