import { motion } from "framer-motion";
import { Lightbulb, Shield, Thermometer, Smartphone, Wifi, Camera, Lock, Zap } from "lucide-react";

const servicios = [
  {
    icon: <Lightbulb size={40} />,
    titulo: "Control de Iluminación",
    desc: "Automatiza todas las luces de tu hogar. Programa horarios, crea ambientes y controla todo desde tu celular o con comandos de voz."
  },
  {
    icon: <Shield size={40} />,
    titulo: "Seguridad Inteligente",
    desc: "Sistemas de alarma, sensores de movimiento y notificaciones en tiempo real para mantener tu hogar protegido las 24 horas."
  },
  {
    icon: <Camera size={40} />,
    titulo: "Cámaras y Vigilancia",
    desc: "Instalación de cámaras IP con acceso remoto desde cualquier lugar. Graba, monitorea y recibe alertas al instante."
  },
  {
    icon: <Thermometer size={40} />,
    titulo: "Climatización",
    desc: "Control inteligente de temperatura. Programa tu aire acondicionado o calefacción para que esté listo cuando llegues a casa."
  },
  {
    icon: <Lock size={40} />,
    titulo: "Cerraduras Inteligentes",
    desc: "Accede a tu hogar con huella digital, código o desde el celular. Olvídate de las llaves y controla quién entra y cuándo."
  },
  {
    icon: <Smartphone size={40} />,
    titulo: "Control Centralizado",
    desc: "Una sola app para controlar todo tu hogar. Iluminación, seguridad, clima y más desde la palma de tu mano."
  },
  {
    icon: <Wifi size={40} />,
    titulo: "Redes y Conectividad",
    desc: "Instalación de redes WiFi de alta velocidad, cobertura total en tu hogar y configuración de todos tus dispositivos inteligentes."
  },
  {
    icon: <Zap size={40} />,
    titulo: "Eficiencia Energética",
    desc: "Monitorea y optimiza el consumo eléctrico de tu hogar. Reduce tu factura con automatizaciones inteligentes."
  },
];

const pasos = [
  { num: "01", titulo: "Consulta Inicial", desc: "Analizamos tu espacio y necesidades para diseñar la solución ideal." },
  { num: "02", titulo: "Diseño del Sistema", desc: "Creamos un plan personalizado con los dispositivos y tecnologías más adecuadas." },
  { num: "03", titulo: "Instalación", desc: "Nuestro equipo instala y configura todos los sistemas de forma profesional." },
  { num: "04", titulo: "Capacitación", desc: "Te enseñamos a usar y sacar el máximo provecho de tu nuevo hogar inteligente." },
];

function Domotica() {
  return (
    <div style={container}>

      {/* HERO */}
      <section style={hero}>
        <div style={heroOverlay}>
          <motion.div
            style={heroContent}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span style={heroBadge}>Tecnología del futuro, hoy</span>
            <h1 style={heroTitle}>Hogares <span style={{ color: "#00bcd4" }}>Inteligentes</span></h1>
            <p style={heroSubtitle}>
              Transformamos tu hogar en un espacio automatizado, seguro y eficiente.
              Controla todo desde tu celular, estés donde estés.
            </p>
            <a
              href="https://wa.me/573236596646?text=Hola,%20me%20interesa%20información%20sobre%20domótica"
              target="_blank"
              rel="noopener noreferrer"
              style={heroBtn}
            >
              Solicitar Asesoría Gratis
            </a>
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section style={section}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={sectionTitle}>Nuestros <span style={{ color: "#00bcd4" }}>Servicios</span></h2>
          <p style={sectionSubtitle}>Todo lo que necesitas para convertir tu hogar en un espacio inteligente</p>

          <div style={serviciosGrid}>
            {servicios.map((s, i) => (
              <motion.div
                key={i}
                style={servicioCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, borderColor: "#00bcd4" }}
              >
                <div style={iconWrapper}>{s.icon}</div>
                <h3 style={servicioTitle}>{s.titulo}</h3>
                <p style={servicioDesc}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={procesSection}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          <h2 style={sectionTitle}>¿Cómo <span style={{ color: "#00bcd4" }}>Funciona?</span></h2>
          <p style={sectionSubtitle}>Un proceso simple para transformar tu hogar</p>

          <div style={pasosGrid}>
            {pasos.map((p, i) => (
              <motion.div
                key={i}
                style={pasoCard}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <span style={pasoNum}>{p.num}</span>
                <h3 style={pasoTitle}>{p.titulo}</h3>
                <p style={pasoDesc}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section style={ctaSection}>
        <motion.div
          style={ctaContent}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: "800", marginBottom: "20px", color: "#fff" }}>
            ¿Listo para tener un hogar <span style={{ color: "#00bcd4" }}>inteligente?</span>
          </h2>
          <p style={{ color: "#ccc", fontSize: "18px", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
            Contáctanos hoy y recibe una asesoría gratuita. Te ayudamos a diseñar la solución perfecta para tu hogar.
          </p>
          <a
            href="https://wa.me/573236596646?text=Hola,%20quiero%20una%20asesoría%20gratuita%20sobre%20domótica"
            target="_blank"
            rel="noopener noreferrer"
            style={ctaBtn}
          >
            Hablar con un Asesor
          </a>
        </motion.div>
      </section>

    </div>
  );
}

const container = { background: "#050505", minHeight: "100vh", color: "#fff" };

const hero = {
  height: "70vh",
  minHeight: "500px",
  backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  marginTop: 0,
};

const heroOverlay = {
  position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
  background: "linear-gradient(to bottom, rgba(0,0,0,0.6), #050505)",
  display: "flex", justifyContent: "center", alignItems: "center",
  padding: "0 20px", textAlign: "center",
};

const heroContent = {
  maxWidth: "800px", display: "flex", flexDirection: "column",
  alignItems: "center", gap: "20px", paddingTop: "60px",
};

const heroBadge = {
  background: "rgba(0,188,212,0.15)", border: "1px solid rgba(0,188,212,0.3)",
  color: "#00bcd4", padding: "8px 20px", borderRadius: "30px",
  fontSize: "14px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase",
};

const heroTitle = {
  fontSize: "clamp(40px, 6vw, 72px)", fontWeight: "800",
  margin: 0, lineHeight: "1.1", color: "#fff",
  textShadow: "0 4px 20px rgba(0,0,0,0.5)",
};

const heroSubtitle = {
  fontSize: "clamp(16px, 2vw, 20px)", color: "#ccc",
  lineHeight: "1.7", margin: 0, maxWidth: "600px",
};

const heroBtn = {
  background: "linear-gradient(45deg, #00bcd4, #008394)",
  color: "#fff", padding: "16px 45px", borderRadius: "50px",
  fontSize: "17px", fontWeight: "bold", textDecoration: "none",
  boxShadow: "0 4px 20px rgba(0,188,212,0.4)",
  letterSpacing: "1px", textTransform: "uppercase",
};

const section = { padding: "100px 20px", background: "#0a0a0a" };
const procesSection = { padding: "100px 20px", background: "#080808" };

const sectionTitle = {
  fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "800",
  textAlign: "center", marginBottom: "15px", color: "#fff",
};

const sectionSubtitle = {
  textAlign: "center", color: "#aaa", fontSize: "17px",
  marginBottom: "60px", maxWidth: "600px", margin: "0 auto 60px",
};

const serviciosGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "25px", maxWidth: "1200px", margin: "0 auto",
};

const servicioCard = {
  background: "rgba(255,255,255,0.03)", borderRadius: "20px",
  padding: "35px 25px", border: "1px solid rgba(255,255,255,0.06)",
  transition: "all 0.3s ease", cursor: "default",
};

const iconWrapper = {
  color: "#00bcd4", marginBottom: "20px",
  background: "rgba(0,188,212,0.1)", width: "70px", height: "70px",
  borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center",
};

const servicioTitle = { fontSize: "18px", fontWeight: "700", color: "#fff", margin: "0 0 12px 0" };
const servicioDesc = { fontSize: "14px", color: "#aaa", lineHeight: "1.7", margin: 0 };

const pasosGrid = {
  display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "30px", marginTop: "20px",
};

const pasoCard = {
  background: "rgba(255,255,255,0.02)", borderRadius: "20px",
  padding: "35px 25px", border: "1px solid rgba(255,255,255,0.05)",
  position: "relative",
};

const pasoNum = {
  fontSize: "52px", fontWeight: "900", color: "rgba(0,188,212,0.2)",
  display: "block", lineHeight: "1", marginBottom: "15px",
};

const pasoTitle = { fontSize: "18px", fontWeight: "700", color: "#fff", margin: "0 0 12px 0" };
const pasoDesc = { fontSize: "14px", color: "#aaa", lineHeight: "1.7", margin: 0 };

const ctaSection = {
  padding: "100px 20px",
  background: "linear-gradient(135deg, rgba(0,188,212,0.1), rgba(0,0,0,0))",
  borderTop: "1px solid rgba(0,188,212,0.1)",
};

const ctaContent = { maxWidth: "800px", margin: "0 auto", textAlign: "center" };

const ctaBtn = {
  background: "linear-gradient(45deg, #00bcd4, #008394)",
  color: "#fff", padding: "18px 50px", borderRadius: "50px",
  fontSize: "18px", fontWeight: "bold", textDecoration: "none",
  display: "inline-block", boxShadow: "0 4px 20px rgba(0,188,212,0.4)",
  letterSpacing: "1px",
};

export default Domotica;