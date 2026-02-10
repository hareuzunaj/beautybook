import { useState } from "react";
import Admin from "./Admin";
import MyLogo from "../assets/my-logo.jpg"; // your local logo

function AdminLogin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_PASSWORD = "admin123";

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Wrong password! Try again 🔒");
    }
  };

  if (loggedIn) {
    return <Admin />;
  }

  return (
    <div style={styles.container}>
      {/* Logo */}
      <img
        src={MyLogo}
        alt="Admin Logo"
        style={styles.logo}
      />

      <h1 style={styles.title}>Admin Login 🔐</h1>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff0f6",
    padding: "20px",
    gap: "20px"
  },
  logo: {
    width: "30vw",        // responsive width
    maxWidth: "200px",    // won't get too big
    height: "auto",       // maintain aspect ratio
    borderRadius: "50%",  // make it round
    objectFit: "cover"    // cover the circle nicely
  },
  title: {
    fontSize: "6vw",      // scales on mobile
    maxFontSize: "32px",
    color: "#d63384",
    fontWeight: "700",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "80%",          // responsive width
    maxWidth: "300px"
  },
  input: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #d63384",
    fontSize: "16px"
  },
  button: {
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#d63384",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600"
  },
  error: {
    color: "#f54e5a",
    fontSize: "14px",
    marginTop: "-4px"
  }
};

export default AdminLogin;
