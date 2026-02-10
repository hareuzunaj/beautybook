import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Book from "./pages/Book";
import MyAppointments from "./pages/Myappointments";
import AdminLogin from "./pages/AdminLogin"; // <-- login wrapper

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book" element={<Book />} />
        <Route path="/appointments" element={<MyAppointments />} />
        <Route path="/admin" element={<AdminLogin />} /> {/* now goes through login */}
      </Routes>
    </>
  );
}

export default App;
