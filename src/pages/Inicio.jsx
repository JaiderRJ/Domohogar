import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Hammer, PaintBucket, Briefcase, Cpu, Home, Send, Phone, Mail, MapPin } from "lucide-react";

function Inicio() {
  const contactRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>

      {/* HERO */}
      <section style={hero}>
        <div style={overlay}>
          <motion.div
            style={heroContent}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 style={title}>DOMOTICA Y HOGARES <span style={{ color: "#00bcd4" }}>INTELIGENTES</span></h1>
            <p style={subtitle}>Transformamos tu espacio en un hogar del futuro. Confort, seguridad y eficiencia al alcance de tu mano.</p>

            <div style={{ marginTop: "40px" }}>
              <motion.button
                style={btn}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,188,212,0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
              >
                Solicitar Cotización
              </motion.button>
            </div>

          </motion.div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section style={section}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{ textAlign: "center", fontSize: "36px", marginBottom: "60px", color: "#fff" }}>
            Nuestros <span style={{ color: "#00bcd4" }}>Servicios</span>
          </h2>

          <div style={grid}>
            {servicios.map((s, i) => (
              <Link to={s.link} key={i} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <motion.div
                  style={card}
                  whileHover={{ scale: 1.05, borderColor: "#00bcd4", backgroundColor: "rgba(255,255,255,0.08)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div style={{ marginBottom: "20px", color: "#00bcd4" }}>
                    {s.icon}
                  </div>
                  <h3 style={{ margin: "0 0 10px 0", color: "#fff" }}>{s.title}</h3>
                  <p style={{ fontSize: "14px", color: "#aaa", margin: 0 }}>{s.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* NOSOTROS */}
      <section style={about}>
        <div style={aboutContainer}>
          <motion.div
            style={aboutImageWrapper}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="/img/about.jpg" alt="Sobre Nosotros" style={aboutImage} />
          </motion.div>

          <motion.div
            style={aboutContent}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 style={{ fontSize: "42px", marginBottom: "30px", color: "#fff" }}>Sobre <span style={{ color: "#00bcd4" }}>Nosotros</span></h2>

            <p style={aboutText}>
              <span style={{ color: "#00bcd4", fontWeight: "bold" }}>DOMOGAR</span> es líder en la transformación de espacios residenciales y comerciales.
            </p>
            <p style={aboutText}>
              Nos especializamos en integrar <strong>diseño arquitectónico de vanguardia</strong> con soluciones de <strong>automatización inteligente</strong>. Nuestro objetivo es crear ambientes que no solo sean visualmente impactantes, sino que también mejoren tu calidad de vida a través de la tecnología.
            </p>
            <p style={aboutText}>
              Desde la conceptualización hasta la ejecución, nuestro equipo de expertos te acompaña en cada paso para asegurar que tu visión se haga realidad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACTO */}
      <section style={contactSection} ref={contactRef}>
        <div style={contactContainer}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            <h2 style={{ fontSize: "36px", marginBottom: "20px", color: "#fff" }}>Contáctanos</h2>
            <p style={{ color: "#aaa", fontSize: "18px" }}>¿Listo para transformar tu hogar? Escríbenos.</p>
          </motion.div>

          <div style={contactGrid}>

            {/* Información */}
            <motion.div
              style={contactInfo}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div style={infoItem}>
                <Phone size={24} color="#00bcd4" />
                <span>+57 300 123 4567</span>
              </div>
              <div style={infoItem}>
                <Mail size={24} color="#00bcd4" />
                <span>contacto@domogar.com</span>
              </div>
              <div style={infoItem}>
                <MapPin size={24} color="#00bcd4" />
                <span>Calle 123 # 45 - 67, Barranquilla</span>
              </div>
            </motion.div>

            {/* Formulario */}
            <motion.form
              style={form}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div style={inputGroup}>
                <input type="text" placeholder="Tu Nombre" style={input} />
              </div>
              <div style={inputGroup}>
                <input type="email" placeholder="Tu Correo" style={input} />
              </div>
              <div style={inputGroup}>
                <textarea placeholder="¿En qué podemos ayudarte?" style={{ ...input, height: "120px", resize: "none" }}></textarea>
              </div>
              <button style={submitBtn}>
                Enviar Mensaje <Send size={18} style={{ marginLeft: "10px" }} />
              </button>
            </motion.form>

          </div>
        </div>
      </section>

    </div>
  );
}

const servicios = [
  { title: "Remodelaciones", icon: <Hammer size={48} />, link: "/proyectos", desc: "Damos nueva vida a tus espacios con acabados modernos y funcionales." },
  { title: "Diseño Interior", icon: <PaintBucket size={48} />, link: "/proyectos", desc: "Creamos ambientes únicos que reflejan tu estilo y personalidad." },
  { title: "Construcción", icon: <Briefcase size={48} />, link: "/proyectos", desc: "Ejecutamos obras civiles con los más altos estándares de calidad." },
  { title: "Compra y Venta", icon: <Home size={48} />, link: "/propiedades", desc: "Asesoría experta en el mercado inmobiliario para tu mejor inversión." },
  { title: "Domótica", icon: <Cpu size={48} />, link: "/domotica", desc: "Automatizamos tu hogar para mayor confort, seguridad y eficiencia energética." },
];

const hero = {
  height: "100vh",
  backgroundImage: "url('/img/hero.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
};

const overlay = {
  background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "0 20px"
};

const heroContent = {
  maxWidth: "1000px",
  color: "white",
  zIndex: 10,
  width: "100%",
  marginTop: "50px"
};

const title = {
  fontSize: "clamp(40px, 6vw, 80px)",
  marginBottom: "20px",
  letterSpacing: "2px",
  fontWeight: "800",
  textShadow: "0 4px 10px rgba(0,0,0,0.5)",
  lineHeight: "1.1"
};

const subtitle = {
  fontSize: "clamp(18px, 3vw, 24px)",
  marginBottom: "40px",
  lineHeight: "1.6",
  color: "#e0e0e0",
  maxWidth: "800px",
  margin: "0 auto 40px"
};

const btn = {
  background: "linear-gradient(45deg, #00bcd4, #008394)",
  border: "none",
  padding: "18px 50px",
  fontSize: "18px",
  fontWeight: "bold",
  color: "white",
  borderRadius: "50px",
  cursor: "pointer",
  boxShadow: "0 4px 20px rgba(0,188,212,0.4)",
  textTransform: "uppercase",
  letterSpacing: "2px",
};

const section = {
  padding: "120px 20px",
  background: "#0a0a0a"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "30px",
  marginTop: "20px",
  maxWidth: "1200px",
  margin: "0 auto"
};

const card = {
  background: "rgba(255,255,255,0.03)",
  padding: "50px 30px",
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.05)",
  textAlign: "center",
  cursor: "pointer", // Changed to pointer
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  minHeight: "280px",
  height: "100%", // Ensure full height anchor
  boxSizing: "border-box"
};

const about = {
  padding: "120px 20px",
  background: "linear-gradient(to top, #050505, #111)",
  overflow: "hidden"
};

const aboutContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "60px",
  flexWrap: "wrap",
};

const aboutImageWrapper = {
  flex: "1 1 500px",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
  border: "1px solid rgba(255,255,255,0.1)"
};

const aboutImage = {
  width: "100%",
  height: "auto",
  display: "block",
  objectFit: "cover"
};

const aboutContent = {
  flex: "1 1 500px",
  textAlign: "left"
};

const aboutText = {
  fontSize: "18px",
  lineHeight: "1.8",
  color: "#ccc",
  marginBottom: "20px"
};

// CONTACT STYLES
const contactSection = {
  padding: "100px 20px",
  background: "#080808",
  borderTop: "1px solid rgba(255,255,255,0.05)"
};

const contactContainer = {
  maxWidth: "1000px",
  margin: "0 auto"
};

const contactGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "50px",
  alignItems: "start"
};

const contactInfo = {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  padding: "20px",
  background: "rgba(255,255,255,0.02)",
  borderRadius: "15px",
  border: "1px solid rgba(255,255,255,0.05)"
};

const infoItem = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  color: "#eee",
  fontSize: "18px"
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const inputGroup = {
  width: "100%"
};

const input = {
  width: "100%",
  padding: "15px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "white",
  fontSize: "16px",
  outline: "none",
  transition: "border 0.3s ease",
};

const submitBtn = {
  background: "#00bcd4",
  color: "white",
  padding: "15px",
  border: "none",
  borderRadius: "10px",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.3s ease"
};

export default Inicio;
