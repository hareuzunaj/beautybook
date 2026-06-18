import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { services as fallbackServices } from "../data/services";
import { api } from "../api";
import Confetti from "react-confetti";

function Book() {
  const location = useLocation();
  const selectedService = location.state?.service || null;
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: selectedService?.name || "",
    serviceId: selectedService?.id || "",
    date: "",
    time: ""
  });

  const [success, setSuccess] = useState(false);
  const [services, setServices] = useState(fallbackServices);
  const [error, setError] = useState("");
  const [hover, setHover] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    api.services()
      .then(setServices)
      .catch(() => setServices(fallbackServices));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "service") {
      const service = services.find((item) => item.name === value);
      setForm((prev) => ({
        ...prev,
        service: value,
        serviceId: service?.id || ""
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const service = services.find((item) => item.id === Number(form.serviceId));
    if (!service) {
      setError("Please choose a valid service.");
      return;
    }

    try {
      const appointment = await api.createAppointment({
        ...form,
        serviceId: service.id
      });

      const bookedServices = JSON.parse(localStorage.getItem("bookedServices")) || [];
      const nextBookedServices = Array.from(new Set([...bookedServices, appointment.serviceId]));
      localStorage.setItem("bookedServices", JSON.stringify(nextBookedServices));
      localStorage.setItem("lastBookingPhone", appointment.phone || form.phone);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      setForm({ name: "", phone: "", service: "", serviceId: "", date: "", time: "" });
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <div style={styles.page}>
      {success && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={150}
          recycle={false}
        />
      )}

      <section style={styles.container}>
        <p style={styles.eyebrow}>BeautyBook</p>
        <h1 style={styles.title}>Book an Appointment</h1>
        <p style={styles.subtitle}>
          Choose a service, pick your time, and your appointment will appear in My Appointments and Admin.
        </p>

        {success && <div style={styles.success}>Appointment booked successfully.</div>}
        {error && <div style={styles.error}>{error}</div>}

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
            type="tel"
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
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name} - {service.category} - EUR {service.price}
              </option>
            ))}
          </select>
          <div style={styles.row}>
            <input
              type="date"
              name="date"
              min={today}
              value={form.date}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              style={styles.input}
            />
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
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "48px 20px",
    background: "linear-gradient(180deg, #fff7fb 0%, #ffffff 100%)"
  },
  container: {
    maxWidth: "540px",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 14px 35px rgba(15,23,42,0.12)",
    padding: "34px 28px"
  },
  eyebrow: {
    textAlign: "center",
    color: "#c22573",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: "8px"
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    color: "#1f2937",
    marginBottom: "10px"
  },
  subtitle: {
    textAlign: "center",
    color: "#64748b",
    lineHeight: 1.6,
    marginBottom: "24px"
  },
  success: {
    textAlign: "center",
    backgroundColor: "#ecfdf5",
    color: "#047857",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "18px",
    fontWeight: "700"
  },
  error: {
    textAlign: "center",
    backgroundColor: "#fff1f2",
    color: "#be123c",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "18px",
    fontWeight: "700"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    width: "100%",
    padding: "13px 15px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "16px",
    background: "#fff"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "12px"
  },
  button: {
    padding: "14px 0",
    backgroundColor: "#c22573",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.25s ease"
  },
  buttonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 22px rgba(194,37,115,0.28)"
  }
};

export default Book;
