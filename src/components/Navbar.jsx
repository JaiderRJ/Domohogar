import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={nav}>
      <div style={logoContainer}>
        <img src="/img/logo.png" alt="DOMOGAR" style={logo} />
      </div>

      <div style={links}>
        <Link to="/" style={linkStyle}>Inicio</Link>
        <Link to="/propiedades" style={linkStyle}>Compra y Venta</Link>
        <Link to="/proyectos" style={linkStyle}>Proyectos</Link>
        <Link to="/domotica" style={linkStyle}>Domótica</Link>
      </div>
    </nav>
  );
}

const nav = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 25px",
  background: "rgba(0,0,0,0.6)", // Mayor contraste
  backdropFilter: "blur(10px)",
  zIndex: 1000,
  boxSizing: "border-box", // Evita el desbordamiento horizontal
  boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const logo = {
  height: "50px", // Altura controlada para no deformar la barra
  width: "auto",  // Mantiene la proporción
  objectFit: "contain",
  filter: "drop-shadow(0 0 5px rgba(0,188,212,0.5))" // Un toque "glow" sutil
};

const links = {
  display: "flex",
  gap: "20px",
  alignItems: "center"
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
  transition: "color 0.3s ease",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

export default Navbar;
