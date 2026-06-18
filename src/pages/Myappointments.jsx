import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [phone, setPhone] = useState(localStorage.getItem("lastBookingPhone") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadAppointments = async (phoneValue = phone) => {
    setLoading(true);
    setError("");

    try {
      const data = await api.appointments(phoneValue);
      setAppointments(data);
      if (phoneValue) {
        localStorage.setItem("lastBookingPhone", phoneValue);
      }
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments(phone);
  }, []);

  const cancelAppointment = async (id) => {
    try {
      await api.deleteAppointment(id);
      setAppointments((current) => current.filter((appointment) => appointment.id !== id));
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>My Appointments</h1>

        <div style={styles.lookup}>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Enter your phone number"
            style={styles.lookupInput}
          />
          <button onClick={() => loadAppointments(phone)} style={styles.lookupBtn}>
            Search
          </button>
        </div>

        {loading && <p style={styles.empty}>Loading appointments...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {!loading && appointments.length === 0 ? (
          <div style={styles.emptyContainer}>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={styles.illustration}
            >
              *
            </motion.div>
            <p style={styles.emptyText}>
              You have no appointments yet.<br />
              Book your first beauty session now!
            </p>
          </div>
        ) : !loading && (
          <div style={styles.list}>
            {appointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                style={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div style={styles.info}>
                  <p style={styles.service}>
                    <b>{appointment.service}</b> for <b>{appointment.name}</b>
                  </p>
                  <p style={styles.datetime}>
                    {appointment.date} at {appointment.time}
                  </p>
                  <p style={styles.meta}>
                    {appointment.serviceCategory || "Beauty service"} - {appointment.status || "Planned"} - {appointment.phone || "No phone"}
                  </p>
                </div>
                <button
                  style={styles.cancelBtn}
                  onClick={() => cancelAppointment(appointment.id)}
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
  lookup: {
    display: "flex",
    gap: "10px",
    margin: "0 auto 24px",
    maxWidth: "520px",
    flexWrap: "wrap"
  },
  lookupInput: {
    flex: "1 1 260px",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "12px 14px",
    fontSize: "15px"
  },
  lookupBtn: {
    border: "none",
    borderRadius: "14px",
    padding: "12px 18px",
    background: "#d63384",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer"
  },
  error: {
    color: "#be123c",
    textAlign: "center",
    marginBottom: "18px",
    fontWeight: "700"
  },
  empty: {
    textAlign: "center",
    color: "#777",
    fontSize: "16px",
    marginBottom: "18px"
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
    gap: "16px",
    flexWrap: "wrap",
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
  meta: {
    fontSize: "13px",
    color: "#777",
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
