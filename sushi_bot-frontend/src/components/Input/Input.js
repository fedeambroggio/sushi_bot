import React from "react";
import "./Input.css"

const Input = ({ input, setInput, handleSend }) => {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
};

export default Input;