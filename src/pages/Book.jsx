import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { services } from "../data/services";
import Confetti from "react-confetti";

function Book() {
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: location.state?.service || "",
    date: "",
    time: ""
  });

  const [success, setSuccess] = useState(false);
  const [hover, setHover] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push({ ...form, id: Date.now() });
    localStorage.setItem("appointments", JSON.stringify(appointments));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000); // show confetti for 4s
    setForm({ name: "", phone: "", service: "", date: "", time: "" });
  };

  return (
    <div style={styles.container}>
      {success && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={150} />}
      <h1 style={styles.title}>Book an Appointment 💖</h1>
      
      {success && <div style={styles.success}>🎉 Appointment booked successfully! ✨</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Select service</option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name} ({s.category})
            </option>
          ))}
        </select>
        <div style={styles.row}>
          <input type="date" name="date" value={form.date} onChange={handleChange} required style={styles.input} />
          <input type="time" name="time" value={form.time} onChange={handleChange} required style={styles.input} />
        </div>
        <button
          type="submit"
          style={{ ...styles.button, ...(hover ? styles.buttonHover : {}) }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Book Now
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "500px",
    margin: "40px auto",
    backgroundColor: "#fff0f6",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease"
  },

  title: {
    textAlign: "center",
    fontSize: "32px",
    color: "#d63384",
    marginBottom: "20px"
  },

  success: {
    textAlign: "center",
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "20px",
    fontWeight: "600",
    animation: "fadeIn 0.5s ease"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  input: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },

  row: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },

  button: {
    padding: "14px 0",
    backgroundColor: "#d63384",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.25s ease"
  },

  buttonHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 20px rgba(214,51,132,0.4)"
  }
};

export default Book;  