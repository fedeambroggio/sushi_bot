import React from "react";
import "./FloatingButton.css";
import chatIcon from "../../assets/chat-icon.png";

const FloatingButton = ({ toggleChat }) => {
  return (
      <img
          src={chatIcon}
          onClick={toggleChat}
          alt="ChatFloatingButton"
          className="floating-button floating-button-icon" />
  );
};

export default FloatingButton;