import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  const deleteAppointment = (id) => {
    const updated = appointments.filter(a => a.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  // Filtered & searched appointments
  const filteredAppointments = appointments.filter(a => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || a.service === filter;
    return matchesSearch && matchesFilter;
  });

  // Summary calculations
  const totalAppointments = appointments.length;
  const upcomingAppointments = appointments.filter(a => {
    const appointmentDate = new Date(`${a.date} ${a.time}`);
    return appointmentDate >= new Date();
  }).length;

  const popularService = appointments
    .reduce((acc, curr) => {
      acc[curr.service] = (acc[curr.service] || 0) + 1;
      return acc;
    }, {});
  const mostPopularService = Object.keys(popularService).reduce((a, b) => popularService[a] > popularService[b] ? a : b, "None");

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Admin Dashboard 🔒</h1>

        {/* Summary Section */}
        <div style={styles.summary}>
          <div style={styles.summaryCard}>
            <p style={styles.summaryNumber}>{totalAppointments}</p>
            <p>Total Appointments</p>
          </div>
          <div style={styles.summaryCard}>
            <p style={styles.summaryNumber}>{upcomingAppointments}</p>
            <p>Upcoming Appointments</p>
          </div>
          <div style={styles.summaryCard}>
            <p style={styles.summaryNumber}>{mostPopularService}</p>
            <p>Most Popular Service</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Search by name or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.select}
          >
            <option value="All">All Services</option>
            <option value="Nails">Nails</option>
            <option value="Hair">Hair</option>
            <option value="Makeup">Makeup</option>
            <option value="Spa">Spa</option>
          </select>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <p style={styles.empty}>No appointments found.</p>
        ) : (
          <AnimatePresence>
            {filteredAppointments.map((a) => (
              <motion.div
                key={a.id}
                style={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div style={styles.info}>
                  <p style={styles.service}><b>{a.service}</b> for <b>{a.name}</b></p>
                  <p style={styles.datetime}>{a.date} at {a.time}</p>
                </div>
                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteAppointment(a.id)}
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#fff0f6", paddingBottom: "40px" },
  container: { maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" },
  title: { textAlign: "center", fontSize: "32px", color: "#d63384", marginBottom: "30px", fontWeight: "700" },
  summary: { display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "20px", marginBottom: "30px" },
  summaryCard: { flex: "1 1 30%", background: "#fff", borderRadius: "18px", padding: "20px", textAlign: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" },
  summaryNumber: { fontSize: "28px", fontWeight: "700", color: "#d63384", marginBottom: "6px" },
  controls: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "30px" },
  searchInput: { flex: "1 1 200px", padding: "10px 14px", borderRadius: "14px", border: "1px solid #d63384", fontSize: "14px" },
  select: { flex: "0 0 150px", padding: "10px 14px", borderRadius: "14px", border: "1px solid #d63384", fontSize: "14px", cursor: "pointer" },
  empty: { textAlign: "center", color: "#777", fontSize: "16px" },
  card: { background: "#fff", borderRadius: "18px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 8px 20px rgba(0,0,0,0.1)", marginBottom: "20px" },
  info: { display: "flex", flexDirection: "column", gap: "4px" },
  service: { fontSize: "16px", color: "#333", margin: 0 },
  datetime: { fontSize: "14px", color: "#555", margin: 0 },
  deleteBtn: { backgroundColor: "#f54e5a", color: "#fff", border: "none", borderRadius: "14px", padding: "8px 16px", cursor: "pointer", fontWeight: "600", transition: "transform 0.2s ease, box-shadow 0.2s ease" }
};

export default Admin;
