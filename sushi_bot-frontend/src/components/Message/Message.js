import React from "react";
import "./Message.css";

const Message = ({ sender, text, buttons, onButtonClick, ...props }) => {
    return (
        <div className={`message ${sender === "bot" ? "bot" : "user"}`} {...props}>
            {text}
            {buttons && (
                <div className="button-group">
                    {buttons.map((button, i) => (
                        <button
                            key={i}
                            onClick={() => onButtonClick(button.intent)}
                            className="chat-button"
                        >
                            {button.text}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Message;
