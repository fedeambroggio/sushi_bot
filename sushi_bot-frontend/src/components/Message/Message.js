import React from "react";
import "./Message.css"

const Message = ({ sender, text }) => {
  return (
    <div className={`message ${sender === "bot" ? "bot" : "user"}`}>
      {text}
    </div>
  );
};

export default Message;