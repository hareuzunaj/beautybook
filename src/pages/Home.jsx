import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { services } from "../data/services";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const categories = [
  { name: "Nails", emoji: "💅" },
  { name: "Hair", emoji: "💇‍♀️" },
  { name: "Makeup", emoji: "💄" },
  { name: "Spa", emoji: "💆" }
];

const testimonials = [
  { name: "Sara K.", text: "Absolutely loved my manicure! 💖" },
  { name: "Lina R.", text: "The hair coloring was perfect, so natural!" },
  { name: "Mila P.", text: "Bridal makeup exceeded my expectations!" },
];

function Home() {
  const navigate = useNavigate();
  const [tip, setTip] = useState("");
  const [trending, setTrending] = useState([]);

  const fetchTip = () => {
    fetch("https://type.fit/api/quotes")
      .then(res => res.json())
      .then(data => {
        const randomTip = data[Math.floor(Math.random() * data.length)];
        setTip(randomTip.text || "Remember to pamper yourself today! ✨");
      })
      .catch(() => {
        setTip("Remember to pamper yourself today! ✨");
      });
  };

  useEffect(() => {
    fetchTip();
    const popularServices = services.filter(s => s.popular);
    setTrending(popularServices);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Hero */}
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>Welcome to BeautyBook !</h1>
          <p style={styles.heroSubtitle}>
            Book all your beauty appointments in one place: nails, hair, makeup, spa, and more!
          </p>
          <button
            style={styles.bookBtn}
            onClick={() => navigate("/services")}
          >
            Book Now
          </button>
        </div>

        {/*Daily Inspiration */}
        {tip && (
          <div style={styles.tipBox} className="tip-animation">
            💡 <strong>Daily Inspiration:</strong>{" "}
            <span style={styles.tipText}>{tip}</span>
            <button onClick={fetchTip} style={styles.refreshTip}>🔄</button>
          </div>
        )}

        {/* Categories */}
        <h2 style={styles.sectionTitle}>Explore Our Categories 🌸</h2>
        <div style={styles.categories}>
         {categories.map(c => (
  <div
    key={c.name}
    style={styles.categoryCard}
    className="card-hover"
    onClick={() => navigate("/services", { state: { category: c.name } })}
  >
    <span style={styles.categoryEmoji}>{c.emoji}</span>
    <h3>{c.name}</h3>
  </div>
))}

        
        </div>

        {/* Trending Services */}
        <h2 style={styles.sectionTitle}>Trending Services 💖</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 900: { slidesPerView: 3 } }}
        >
          {trending.map(service => (
            <SwiperSlide key={service.id}>
              <div style={styles.card} className="card-hover">
                <h3 style={styles.cardTitle}>{service.name}</h3>
                <p style={styles.cardCategory}>{service.category}</p>
                <p style={styles.cardDesc}>{service.description}</p>
                <p style={styles.cardInfo}>
                  ⏱ {service.duration} | 💶 ${service.price}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Testimonials */}
        <h2 style={styles.sectionTitle}>What Our Clients Say ✨</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div style={styles.testimonialCard} className="card-hover">
                <p style={{ fontStyle: "italic" }}>"{t.text}"</p>
                <p style={{ fontWeight: "600", marginTop: "10px" }}>
                  - {t.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#fff0f6", padding: "40px 20px" },
  container: { maxWidth: "1000px", margin: "0 auto", textAlign: "center" },
  hero: { marginBottom: "40px" },
  heroTitle: { fontSize: "36px", color: "#d63384", fontWeight: "700", marginBottom: "10px" },
  heroSubtitle: { fontSize: "18px", color: "#555", marginBottom: "20px" },
  bookBtn: {
    backgroundColor: "#d63384",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "25px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  tipBox: {
    background: "linear-gradient(135deg, #ffe6f0, #ffd1e6)",
    padding: "18px 24px",
    borderRadius: "16px",
    marginBottom: "30px",
    fontWeight: "600",
    color: "#d63384",
    boxShadow: "0 8px 20px rgba(214,51,132,0.2)",
    maxWidth: "600px",
    margin: "0 auto 30px auto",
    textAlign: "center",
    position: "relative",
  },
  tipText: { fontStyle: "italic" },
  refreshTip: {
    marginLeft: "12px",
    padding: "4px 8px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#d63384",
    color: "#fff",
    fontWeight: "600",
  },
  sectionTitle: { fontSize: "28px", color: "#d63384", marginBottom: "20px", marginTop: "40px" },
  categories: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", marginBottom: "40px" },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: "14px",
    padding: "20px",
    width: "140px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    cursor: "pointer",
    textAlign: "center",
  },
  categoryEmoji: { fontSize: "28px", marginBottom: "8px" },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    textAlign: "center",
  },
  cardTitle: { fontSize: "18px", fontWeight: "600", marginBottom: "6px" },
  cardCategory: { color: "#777", fontSize: "14px", marginBottom: "10px" },
  cardDesc: { fontSize: "14px", color: "#555", marginBottom: "12px" },
  cardInfo: { fontWeight: "600", color: "#d63384" },
  testimonialCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    maxWidth: "500px",
    margin: "0 auto",
  },
};

export default Home;
