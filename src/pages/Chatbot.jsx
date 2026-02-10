import { useState } from "react";

const responses = {
  nails: "We offer manicure, gel nails, and nail art 💅",
  hair: "We provide haircuts, coloring, styling & treatments 💇‍♀️",
  makeup: "Professional makeup for events & bridal looks 💄",
  spa: "Relaxing spa & massage services 💆",
  book: "Click the 'Book Now' button to schedule an appointment ✨",
};

function Chatbot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today? 💖" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    const userMsg = { from: "user", text: input };
    let botReply = "Sorry, I can help with nails, hair, makeup, spa or booking 😊";

    Object.keys(responses).forEach(key => {
      if (input.toLowerCase().includes(key)) {
        botReply = responses[key];
      }
    });

    setMessages([...messages, userMsg, { from: "bot", text: botReply }]);
    setInput("");
  };

  return (
    <div style={styles.chatbox}>
      <div style={styles.messages}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.from === "bot" ? "left" : "right",
              marginBottom: "8px"
            }}
          >
            <span style={m.from === "bot" ? styles.bot : styles.user}>
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me something..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendBtn}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  chatbox: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "280px",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    padding: "12px",
    zIndex: 1000
  },
  messages: { maxHeight: "220px", overflowY: "auto", marginBottom: "10px" },
  bot: {
    background: "#ffe6f0",
    padding: "8px 12px",
    borderRadius: "12px",
    display: "inline-block"
  },
  user: {
    background: "#d63384",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "12px",
    display: "inline-block"
  },
  inputBox: { display: "flex", gap: "6px" },
  input: {
    flex: 1,
    padding: "6px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  sendBtn: {
    background: "#d63384",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "6px 10px",
    cursor: "pointer"
  }
};

export default Chatbot;
