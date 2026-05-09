import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import Inicio from "./pages/Inicio"
import Propiedades from "./pages/Propiedades"
import Proyectos from "./pages/Proyectos"
import Domotica from "./pages/Domotica"
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/573000000000"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "#25D366",
          color: "white",
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
          fontSize: "30px"
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="white">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-9.672-.272-.099-.47-.149-.669-.149-.198 0-.42.001-.643.001-.223 0-.583.085-.89.421-.306.336-1.196 1.166-1.196 2.844 0 1.678 1.222 3.297 1.396 3.53.174.234 2.405 3.672 5.827 5.15 2.296.992 2.76.794 3.256.744.496-.05 1.758-.718 2.006-1.412.248-.694.248-1.289.173-1.413z" />
        </svg>
      </a>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/domotica" element={<Domotica />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
