import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>BeautyBook</h2>

      {/* Desktop */}
      {!isMobile && (
        <div style={styles.linksDesktop}>
          <NavLink to="/" label="Home" path={location.pathname} />
          <NavLink to="/services" label="Services" path={location.pathname} />
          <NavLink to="/appointments" label="My Appointments" path={location.pathname} />
          <NavLink to="/admin" label="Admin" path={location.pathname} />
    
          <Link to="/book" style={styles.bookBtn}>Book Now</Link>
       
        </div>
      )}

      {/* Mobile */}
      {isMobile && (
        <>
          <div style={styles.hamburger} onClick={() => setOpen(!open)}>☰</div>
          {open && (
            <div style={styles.mobileMenu}>
              <NavLink to="/" label="Home" path={location.pathname} mobile />
              <NavLink to="/services" label="Services" path={location.pathname} mobile />
              
              <NavLink to="/appointments" label="My Appointments" path={location.pathname} mobile />
              <NavLink to="/admin" label="Admin" path={location.pathname} mobile />
              <Link to="/book" style={styles.bookBtnMobile}>Book Now</Link>
            </div>
          )}
        </>
      )}
    </nav>
  );
}

function NavLink({ to, label, path, mobile }) {
  const active = path === to;
  const [hover, setHover] = useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.link,
        ...(active ? styles.activeLink : {}),
        ...(hover ? styles.hoverLink : {}),
        ...(mobile ? styles.mobileLink : {})
      }}
    >
      {label}
    </Link>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: "#fff",
    padding: "18px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
  },
  logo: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#d63384",
    letterSpacing: "0.5px"
  },
  linksDesktop: {
    display: "flex",
    gap: "22px",
    alignItems: "center"
  },
  link: {
    textDecoration: "none",
    color: "#555",
    fontSize: "15px",
    padding: "8px 14px",
    borderRadius: "10px",
    transition: "all 0.25s ease"
  },
  hoverLink: {
    backgroundColor: "#fff0f7",
    color: "#d63384",
    transform: "translateY(-2px)"
  },
  activeLink: {
    backgroundColor: "#ffe6f0",
    color: "#d63384",
    fontWeight: "600"
  },
  bookBtn: {
    backgroundColor: "#d63384",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "22px",
    textDecoration: "none",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(214,51,132,0.35)"
  },
  hamburger: {
    fontSize: "28px",
    cursor: "pointer"
  },
  mobileMenu: {
    position: "absolute",
    top: "70px",
    right: "20px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    minWidth: "220px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)"
  },
  mobileLink: {
    fontSize: "16px",
    padding: "10px"
  },
  bookBtnMobile: {
    backgroundColor: "#d63384",
    color: "#fff",
    padding: "12px",
    borderRadius: "16px",
    textAlign: "center",
    textDecoration: "none",
    fontWeight: "600"
  }
};

export default Navbar;
