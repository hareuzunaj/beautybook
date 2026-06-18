import { useState, useRef, useEffect } from "react";
import { services } from "../data/services";
import { Link } from "react-router-dom";

function BeautyChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi beautiful 💖 I’m BeautyBook Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chatMessages")) || [];
    if (saved.length) setMessages(saved);
  }, []);

  // Save chat history whenever messages change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Generate bot reply
  const generateReply = (text) => {
    const lower = text.toLowerCase().trim();

    // --- Price checks first (more specific) ---
    if (lower.includes("nail prices")) return "Our nail prices range from 15$ to 40$ depending on the service 💰";
    if (lower.includes("hair prices")) return "Our hair service prices range from 40$ to 100$ depending on the treatment 💰";
    if (lower.includes("makeup prices")) return "Our makeup prices range from 25$ to 60$ depending on the service 💰";
    if (lower.includes("spa prices")) return "Our spa prices range from 30$ to 70$ depending on the treatment 💰";

    // --- General service info ---
    if (lower.includes("nail")) {
      const nails = services.filter(s => s.category === "Nails");
      return `We offer ${nails.length} nail services including gel, manicure & nail art 💖`;
    }
    if (lower.includes("hair")) return "Hair glow-up? We offer coloring, styling & treatments 💇‍♀️✨";
    if (lower.includes("makeup")) return "Our makeup services are perfect for events & bridal looks 💄👑";
    if (lower.includes("spa")) return "Relax queen 💆‍♀️ Our spa treatments will refresh your energy ✨";

    // --- Booking ---
    if (lower.includes("book") || lower.includes("appointment") || lower.includes("schedule")) {
      return <Link to="/book" style={{ color: "#c22573", textDecoration: "underline" }}>Click here to schedule your appointment ✨</Link>;
    }

    // --- Prices general ---
    if (lower.includes("price") || lower.includes("prices")) {
      return "You can see all prices in the Services page 💅";
    }

    // --- Rating ---
    if (lower.includes("rate")) return "Please rate your last service! ⭐ Click a star below.";

    // --- Hours / Open times ---
    if (lower.includes("hours") || lower.includes("open")) return "We’re open Mon-Sat from 9:00 AM to 8:00 PM and Sun from 10:00 AM to 6:00 PM 🕘";

    // --- Location / Address ---
    if (lower.includes("location") || lower.includes("address")) return "You can find us at 123 Beauty St, Glamour City ✨";

    // --- Contact ---
    if (lower.includes("contact") || lower.includes("phone") || lower.includes("email")) return "You can contact us at +123 456 7890 or beautybook@example.com 💌";

    // --- Promotions / Discounts ---
    if (lower.includes("promotion") || lower.includes("discount")) return "We currently have a 10% discount on all nail services 💅 Use code: GLOW10";

    // --- Cancellation / Reschedule ---
    if (lower.includes("cancellation") || lower.includes("reschedule")) return "No worries! You can cancel or reschedule your appointment via the My Appointments page 🔄";

    // --- Services overview ---
    if (lower.includes("services") || lower.includes("what do you offer")) return "We offer Nails, Hair, Makeup & Spa treatments! 💖 Ask me about prices for each service!";

    // --- Gift cards ---
    if (lower.includes("gift card") || lower.includes("gift")) return "Looking for a gift? 🎁 We offer gift cards that are perfect for any beauty lover!";

    // --- FAQ prompt ---
    if (lower.includes("faq") || lower.includes("questions")) return "Feel free to ask me anything about our services, prices, hours, or booking ✨";

    // --- Fallback ---
    return "Tell me what service you're interested in and I’ll guide you 💕";
  };

  const sendMessage = (customInput) => {
    const msgText = customInput || input;
    if (!msgText.trim()) return;

    const userMessage = { role: "user", text: msgText };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setTyping(true);
    setTimeout(() => {
      const botMessage = { role: "bot", text: generateReply(msgText) };
      setMessages(prev => [...prev, botMessage]);
      setTyping(false);
    }, 800);
  };

  const quickReplies = [
    "Book Service",
    "Prices",
    "Nails",
    "Hair",
    "Makeup",
    "Spa",
    "Rate Service",
    "Hours",
    "Location",
    "Contact",
    "Discounts",
    "Gift Cards"
  ];

  const handleRating = (stars) => {
    setMessages(prev => [
      ...prev,
      { role: "user", text: `Rated ${stars} stars` },
      { role: "bot", text: `Thanks for your ${stars}-star rating! 💖` }
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      <div style={styles.floatingBtn} onClick={() => setOpen(!open)}>
        {open ? "✖" : "💬"}
      </div>

      {/* Chat Window */}
      {open && (
        <div style={styles.chatContainer}>
          <div style={styles.header}>BeautyBook Assistant ✨</div>

          <div style={styles.chatBody}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  background: msg.role === "user" ? "#c22573" : "#f1f3f5",
                  color: msg.role === "user" ? "#fff" : "#222"
                }}
              >
                {msg.text}
              </div>
            ))}
            {typing && <div style={{ ...styles.message, background: "#f1f3f5" }}>BeautyBook Assistant is typing...</div>}

            {/* Rating stars after booking */}
            {messages.some(m => m.text.toLowerCase().includes("book")) && !messages.some(m => m.text.toLowerCase().includes("rated")) && (
              <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} style={styles.starBtn} onClick={() => handleRating(star)}>⭐</button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick reply buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: "10px", borderTop: "1px solid #eee" }}>
            {quickReplies.map(option => (
              <button
                key={option}
                style={styles.quickBtn}
                onClick={() => sendMessage(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Input area */}
          <div style={styles.inputArea}>
            <input
              style={styles.input}
              placeholder="Ask about services..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button style={styles.sendBtn} onClick={() => sendMessage()}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  floatingBtn: { position: "fixed", bottom: "20px", right: "20px", background: "#c22573", color: "#fff", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", cursor: "pointer", boxShadow: "0 10px 25px rgba(0,0,0,0.25)", zIndex: 1000 },
  chatContainer: { position: "fixed", bottom: "90px", right: "20px", width: "350px", maxWidth: "90vw", height: "500px", maxHeight: "80vh", background: "#ffffff", borderRadius: "20px", boxShadow: "0 20px 40px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 1000 },
  header: { padding: "15px", background: "#c22573", color: "#fff", fontWeight: "600", textAlign: "center" },
  chatBody: { flex: 1, padding: "15px", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto", background: "#fafafa" },
  message: { padding: "10px 14px", borderRadius: "18px", maxWidth: "75%", fontSize: "14px", lineHeight: "1.4" },
  inputArea: { display: "flex", borderTop: "1px solid #eee" },
  input: { flex: 1, padding: "12px", border: "none", outline: "none", fontSize: "14px" },
  sendBtn: { background: "#c22573", color: "#fff", border: "none", padding: "0 18px", cursor: "pointer", fontSize: "16px" },
  quickBtn: { padding: "6px 12px", borderRadius: "12px", background: "#c22573", color: "#fff", border: "none", cursor: "pointer", fontSize: "12px" },
  starBtn: { background: "transparent", border: "none", cursor: "pointer", fontSize: "18px" }
};

export default BeautyChatBot;
