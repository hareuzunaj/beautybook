import { useState, useEffect } from "react";
import { services } from "../data/services";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Services() {
  const location = useLocation();

  const [category, setCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [displayed, setDisplayed] = useState(services);
  const [ratings, setRatings] = useState({});
  const [bookedServices, setBookedServices] = useState([]);

  // Load ratings from localStorage
  useEffect(() => {
    const savedRatings = localStorage.getItem("ratings");
    if (savedRatings) setRatings(JSON.parse(savedRatings));

    const booked = localStorage.getItem("bookedServices");
    if (booked) setBookedServices(JSON.parse(booked));
  }, []);

  // Save ratings
  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  // Category from navigation
  useEffect(() => {
    if (location.state?.category) {
      setCategory(location.state.category);
    }
  }, [location.state]);

  const filtered =
    category === "All"
      ? services
      : services.filter(s => s.category === category);

  useEffect(() => {
    setDisplayed(filtered);
  }, [category]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Rate only if booked
  const rateService = (id, value) => {
    if (!bookedServices.includes(id)) {
      alert("You can only rate services you booked!");
      return;
    }
    setRatings(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Motion variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Explore Beauty Services</h1>
        <p style={styles.subtitle}>
          Choose your glow ✨ Nails, Hair, Makeup & Spa
        </p>

        {/* Category Filters */}
        <div style={styles.filters}>
          {["All", "Nails", "Hair", "Makeup", "Spa"].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                ...styles.filterBtn,
                ...(category === cat ? styles.active : {})
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <motion.div
          style={styles.swipeContainer}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {displayed.map(service => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                layout
                style={{
                  ...styles.card,
                  ...(hoveredId === service.id ? styles.cardHover : {})
                }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {service.popular && (
                  <span style={styles.popular}>POPULAR</span>
                )}

                <span
                  style={{
                    ...styles.favorite,
                    color: favorites.includes(service.id) ? "red" : "#ccc"
                  }}
                  onClick={() => toggleFavorite(service.id)}
                >
                  ❤️
                </span>

                <h3 style={styles.name}>{service.name}</h3>
                <p style={styles.desc}>{service.description}</p>

                {/* Rating (click only if booked) */}
                <div style={styles.rating}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <motion.span
                      key={star}
                      whileHover={
                        bookedServices.includes(service.id)
                          ? { scale: 1.3 }
                          : {}
                      }
                      whileTap={
                        bookedServices.includes(service.id)
                          ? { scale: 0.9 }
                          : {}
                      }
                      onClick={() => rateService(service.id, star)}
                      style={{
                        ...styles.star,
                        color:
                          (ratings[service.id] || 0) >= star
                            ? "#f5b301"
                            : "#ddd",
                        cursor: bookedServices.includes(service.id)
                          ? "pointer"
                          : "not-allowed",
                        opacity: bookedServices.includes(service.id) ? 1 : 0.5
                      }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                <div style={styles.meta}>
                  <span>⏱ {service.duration}</span>
                  <span style={styles.price}>€{service.price}</span>
                </div>

                <span style={styles.level}>{service.level}</span>

                <Link
                  to="/book"
                  state={{ service }}
                  style={styles.btn}
                >
                  Book Now
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(180deg, #fff0f6 0%, #ffffff 100%)",
    minHeight: "100vh",
    paddingBottom: "40px"
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "60px 20px"
  },
  title: {
    textAlign: "center",
    fontSize: "36px",
    color: "#c22573",
    fontWeight: "700"
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "35px"
  },
  filters: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "30px"
  },
  filterBtn: {
    padding: "10px 22px",
    borderRadius: "30px",
    border: "1px solid #c22573",
    background: "#fff",
    color: "#c22573",
    fontWeight: "600",
    cursor: "pointer"
  },
  active: {
    background: "#c22573",
    color: "#fff",
    boxShadow: "0 6px 14px rgba(194,37,115,0.3)"
  },
  swipeContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "26px"
  },
  card: {
    background: "#fff",
    borderRadius: "22px",
    padding: "26px",
    boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  cardHover: {
    transform: "translateY(-8px)"
  },
  popular: {
    position: "absolute",
    top: "14px",
    right: "14px",
    background: "#c22573",
    color: "#fff",
    fontSize: "11px",
    padding: "6px 10px",
    borderRadius: "14px",
    fontWeight: "700"
  },
  favorite: {
    position: "absolute",
    top: "14px",
    left: "14px",
    fontSize: "16px",
    cursor: "pointer"
  },
  name: { fontSize: "20px" },
  desc: { fontSize: "14px", color: "#777", marginBottom: "10px" },
  rating: {
    display: "flex",
    gap: "6px",
    marginBottom: "12px"
  },
  star: {
    fontSize: "18px"
  },
  meta: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "600"
  },
  price: { color: "#c22573", fontSize: "18px" },
  level: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#c22573",
    marginBottom: "16px"
  },
  btn: {
    marginTop: "auto",
    background: "#c22573",
    color: "#fff",
    padding: "12px",
    borderRadius: "18px",
    textAlign: "center",
    textDecoration: "none",
    fontWeight: "600"
  }
};

export default Services;
