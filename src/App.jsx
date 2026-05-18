import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Inicio from "./pages/Inicio"
import Propiedades from "./pages/Propiedades"
import Proyectos from "./pages/Proyectos"
import Domotica from "./pages/Domotica"
import Login from "./pages/Login"
import Admin from "./pages/Admin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar /><WhatsAppBtn /><Inicio /><Footer /></>} />
        <Route path="/propiedades" element={<><Navbar /><WhatsAppBtn /><Propiedades /><Footer /></>} />
        <Route path="/proyectos" element={<><Navbar /><WhatsAppBtn /><Proyectos /><Footer /></>} />
        <Route path="/domotica" element={<><Navbar /><WhatsAppBtn /><Domotica /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

function WhatsAppBtn() {
  return (
    <a
      href="https://wa.me/573236596646"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        zIndex: 1000,
        transition: "transform 0.3s ease",
        cursor: "pointer",
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        style={{ width: "60px", height: "60px" }}
      />
    </a>
  )
}

export default App