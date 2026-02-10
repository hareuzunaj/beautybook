import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  const cancelAppointment = (id) => {
    const updated = appointments.filter(a => a.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>My Appointments 💖</h1>

        {appointments.length === 0 ? (
          <div style={styles.emptyContainer}>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={styles.illustration}
            >
              ✨
            </motion.div>
            <p style={styles.emptyText}>
              You have no appointments yet.<br />
              Book your first beauty session now!
            </p>
          </div>
        ) : (
          <div style={styles.list}>
            {appointments.map((a) => (
              <motion.div
                key={a.id}
                style={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div style={styles.info}>
                  <p style={styles.service}>
                    <b>{a.service}</b> for <b>{a.name}</b>
                  </p>
                  <p style={styles.datetime}>
                    {a.date} at {a.time}
                  </p>
                </div>
                <button
                  style={styles.cancelBtn}
                  onClick={() => cancelAppointment(a.id)}
                >
                  Cancel
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #fff0f6 0%, #ffffff 100%)",
    paddingBottom: "40px"
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 20px"
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    color: "#d63384",
    marginBottom: "30px",
    fontWeight: "700"
  },
  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
    gap: "20px"
  },
  illustration: {
    fontSize: "60px",
    color: "#d63384"
  },
  emptyText: {
    fontSize: "18px",
    color: "#555",
    textAlign: "center",
    lineHeight: "1.5"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  service: {
    fontSize: "16px",
    color: "#333",
    margin: 0
  },
  datetime: {
    fontSize: "14px",
    color: "#555",
    margin: 0
  },
  cancelBtn: {
    backgroundColor: "#f54e5a",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  }
};

export default MyAppointments;
