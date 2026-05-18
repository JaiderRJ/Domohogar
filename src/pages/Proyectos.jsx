import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { supabase } from "../lib/supabase";

function Proyectos() {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetchFotos();
  }, []);

  async function fetchFotos() {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("propiedades")
      .list("proyecto", { limit: 100, sortBy: { column: "created_at", order: "asc" } });

    if (!error && data) {
      const urls = data
        .filter(f => f.name !== ".emptyFolderPlaceholder")
        .map((f, i) => ({
          nombre: f.name,
          url: supabase.storage
            .from("propiedades")
            .getPublicUrl(`proyecto/${f.name}`).data.publicUrl,
          index: i,
        }));
      setFotos(urls);
    }
    setLoading(false);
  }

  function abrirFoto(index) { setSelectedIndex(index); }
  function cerrar() { setSelectedIndex(null); }
  function anterior() { setSelectedIndex(prev => (prev - 1 + fotos.length) % fotos.length); }
  function siguiente() { setSelectedIndex(prev => (prev + 1) % fotos.length); }

  useEffect(() => {
    function handleKey(e) {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") siguiente();
      if (e.key === "Escape") cerrar();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, fotos.length]);

  // Diseño masonry: algunas fotos ocupan más espacio
  function getCardStyle(index) {
    const patterns = [
      { gridColumn: "span 2", gridRow: "span 2" }, // grande
      { gridColumn: "span 1", gridRow: "span 1" }, // normal
      { gridColumn: "span 1", gridRow: "span 1" },
      { gridColumn: "span 1", gridRow: "span 2" }, // alto
      { gridColumn: "span 1", gridRow: "span 1" },
      { gridColumn: "span 2", gridRow: "span 1" }, // ancho
      { gridColumn: "span 1", gridRow: "span 1" },
      { gridColumn: "span 1", gridRow: "span 1" },
      { gridColumn: "span 1", gridRow: "span 1" },
    ];
    return patterns[index % patterns.length];
  }

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
            <span style={heroBadge}>Nuestro trabajo</span>
            <h1 style={heroTitle}>
              Proyectos <span style={{ color: "#00bcd4" }}>Realizados</span>
            </h1>
            <p style={heroSubtitle}>
              Cada espacio tiene una historia. Aquí te mostramos algunas de las transformaciones que hemos hecho realidad.
            </p>
            <div style={heroStats}>
              <div style={statItem}>
                <span style={statNum}>{fotos.length}+</span>
                <span style={statLabel}>Fotos</span>
              </div>
              <div style={statDivider} />
              <div style={statItem}>
                <span style={statNum}>100%</span>
                <span style={statLabel}>Satisfacción</span>
              </div>
              <div style={statDivider} />
              <div style={statItem}>
                <span style={statNum}>5★</span>
                <span style={statLabel}>Calidad</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALERÍA */}
      <section style={galeriaSection}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={sectionHeader}>
            <h2 style={sectionTitle}>Galería de <span style={{ color: "#00bcd4" }}>Proyectos</span></h2>
            <p style={sectionSubtitle}>Haz clic en cualquier foto para verla en detalle</p>
            <div style={titleLine} />
          </div>

          {loading ? (
            <div style={loadingState}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={spinner}
              />
              <p style={{ color: "#aaa", marginTop: "20px" }}>Cargando galería...</p>
            </div>
          ) : (
            <div style={galeriaGrid}>
              {fotos.map((foto, index) => (
                <motion.div
                  key={index}
                  style={{ ...fotoCard, ...getCardStyle(index) }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
                  onClick={() => abrirFoto(index)}
                  className="foto-card"
                >
                  <img
                    src={foto.url}
                    alt={`Proyecto ${index + 1}`}
                    style={fotoImg}
                    loading="lazy"
                    onError={(e) => e.target.parentElement.style.display = "none"}
                  />
                  {/* Overlay con efecto hover */}
                  <motion.div
                    style={fotoOverlay}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      style={fotoOverlayContent}
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <ZoomIn size={28} color="#fff" />
                      <span style={fotoOverlayText}>Ver foto</span>
                    </motion.div>
                  </motion.div>

                  {/* Borde glow en hover */}
                  <div style={fotoBorder} />
                </motion.div>
              ))}
            </div>
          )}

          {!loading && fotos.length === 0 && (
            <div style={emptyState}>No hay fotos disponibles aún.</div>
          )}
        </motion.div>
      </section>

      {/* CTA */}
      <section style={ctaSection}>
        <motion.div
          style={ctaContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={ctaTitle}>
            ¿Te gustó lo que viste?
          </h2>
          <p style={ctaSubtitle}>
            Contáctanos y hagamos realidad tu próximo proyecto.
          </p>
          <a
            href="https://wa.me/573236596646?text=Hola,%20vi%20sus%20proyectos%20y%20me%20gustaría%20más%20información"
            target="_blank"
            rel="noopener noreferrer"
            style={ctaBtn}
          >
            Quiero mi proyecto
          </a>
        </motion.div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            style={lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cerrar}
          >
            {/* Imagen */}
            <motion.div
              style={lightboxImgWrapper}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={fotos[selectedIndex]?.url}
                alt={`Proyecto ${selectedIndex + 1}`}
                style={lightboxImg}
              />
            </motion.div>

            {/* Contador */}
            <div style={lightboxCounter}>
              {selectedIndex + 1} / {fotos.length}
            </div>

            {/* Cerrar */}
            <button style={lightboxClose} onClick={cerrar}>
              <X size={20} />
            </button>

            {/* Anterior */}
            <button style={lightboxPrev} onClick={e => { e.stopPropagation(); anterior(); }}>
              <ChevronLeft size={30} />
            </button>

            {/* Siguiente */}
            <button style={lightboxNext} onClick={e => { e.stopPropagation(); siguiente(); }}>
              <ChevronRight size={30} />
            </button>

            {/* Miniaturas */}
            <div style={thumbsContainer} onClick={e => e.stopPropagation()}>
              {fotos.map((f, i) => (
                <div
                  key={i}
                  style={{
                    ...thumb,
                    border: i === selectedIndex ? "2px solid #00bcd4" : "2px solid transparent",
                    opacity: i === selectedIndex ? 1 : 0.5,
                  }}
                  onClick={() => setSelectedIndex(i)}
                >
                  <img src={f.url} style={thumbImg} alt="" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// STYLES
const container = { background: "#050505", minHeight: "100vh", color: "#fff" };

const hero = {
  height: "70vh", minHeight: "500px",
  backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80')",
  backgroundSize: "cover", backgroundPosition: "center",
  position: "relative", marginTop: 0,
};

const heroOverlay = {
  position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
  background: "linear-gradient(to bottom, rgba(0,0,0,0.55), #050505)",
  display: "flex", justifyContent: "center", alignItems: "center",
  padding: "0 20px", textAlign: "center",
};

const heroContent = {
  maxWidth: "900px", display: "flex", flexDirection: "column",
  alignItems: "center", gap: "25px", paddingTop: "60px",
};

const heroBadge = {
  background: "rgba(0,188,212,0.15)", border: "1px solid rgba(0,188,212,0.3)",
  color: "#00bcd4", padding: "8px 20px", borderRadius: "30px",
  fontSize: "13px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase",
};

const heroTitle = {
  fontSize: "clamp(38px, 5vw, 68px)", fontWeight: "800",
  margin: 0, lineHeight: "1.1", color: "#fff",
  textShadow: "0 4px 20px rgba(0,0,0,0.5)",
};

const heroSubtitle = {
  fontSize: "clamp(16px, 2vw, 19px)", color: "#ccc",
  lineHeight: "1.7", margin: 0, maxWidth: "600px",
};

const heroStats = {
  display: "flex", alignItems: "center", gap: "30px",
  background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "15px", padding: "20px 40px", marginTop: "10px",
};

const statItem = { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" };
const statNum = { fontSize: "26px", fontWeight: "800", color: "#00bcd4" };
const statLabel = { fontSize: "12px", color: "#aaa", textTransform: "uppercase", letterSpacing: "1px" };
const statDivider = { width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" };

const galeriaSection = { padding: "80px 20px 100px", background: "#0a0a0a" };

const sectionHeader = { textAlign: "center", marginBottom: "50px" };

const sectionTitle = {
  fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "800",
  marginBottom: "12px", color: "#fff",
};

const sectionSubtitle = { color: "#aaa", fontSize: "16px", marginBottom: "20px" };

const titleLine = {
  width: "60px", height: "3px",
  background: "linear-gradient(90deg, #00bcd4, #008394)",
  borderRadius: "2px", margin: "0 auto",
};

const galeriaGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridAutoRows: "200px",
  gap: "12px",
  maxWidth: "1300px",
  margin: "0 auto",
};

const fotoCard = {
  position: "relative", borderRadius: "12px", overflow: "hidden",
  cursor: "pointer", background: "#111",
};

const fotoImg = {
  width: "100%", height: "100%", objectFit: "cover",
  display: "block", transition: "transform 0.5s ease",
};

const fotoOverlay = {
  position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
  background: "linear-gradient(135deg, rgba(0,188,212,0.7), rgba(0,50,60,0.8))",
  display: "flex", alignItems: "center", justifyContent: "center",
};

const fotoOverlayContent = {
  display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
};

const fotoOverlayText = {
  color: "#fff", fontSize: "14px", fontWeight: "600",
  letterSpacing: "2px", textTransform: "uppercase",
};

const fotoBorder = {
  position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
  borderRadius: "12px", border: "1px solid rgba(0,188,212,0)",
  transition: "border-color 0.3s ease", pointerEvents: "none",
};

const loadingState = {
  textAlign: "center", padding: "80px", display: "flex",
  flexDirection: "column", alignItems: "center",
};

const spinner = {
  width: "40px", height: "40px", border: "3px solid rgba(0,188,212,0.2)",
  borderTop: "3px solid #00bcd4", borderRadius: "50%",
};

const emptyState = { textAlign: "center", padding: "60px", color: "#aaa", fontSize: "18px" };

const ctaSection = {
  padding: "100px 20px",
  background: "linear-gradient(135deg, rgba(0,188,212,0.08), rgba(0,0,0,0))",
  borderTop: "1px solid rgba(0,188,212,0.1)",
};

const ctaContent = { maxWidth: "700px", margin: "0 auto", textAlign: "center" };

const ctaTitle = {
  fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800",
  marginBottom: "20px", color: "#fff",
};

const ctaSubtitle = {
  color: "#ccc", fontSize: "18px",
  marginBottom: "40px", lineHeight: "1.6",
};

const ctaBtn = {
  background: "linear-gradient(45deg, #00bcd4, #008394)",
  color: "#fff", padding: "18px 50px", borderRadius: "50px",
  fontSize: "18px", fontWeight: "bold", textDecoration: "none",
  display: "inline-block", boxShadow: "0 4px 20px rgba(0,188,212,0.4)",
  letterSpacing: "1px",
};

// LIGHTBOX
const lightboxOverlay = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.97)", zIndex: 2000,
  display: "flex", alignItems: "center", justifyContent: "center",
  flexDirection: "column", padding: "60px 20px 120px",
};

const lightboxImgWrapper = {
  flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
  maxWidth: "100%",
};

const lightboxImg = {
  maxWidth: "85vw", maxHeight: "70vh",
  objectFit: "contain", borderRadius: "10px",
  boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
};

const lightboxClose = {
  position: "fixed", top: "20px", right: "20px",
  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
  color: "#fff", width: "44px", height: "44px",
  borderRadius: "50%", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  backdropFilter: "blur(5px)",
};

const lightboxPrev = {
  position: "fixed", left: "15px", top: "45%",
  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
  color: "#fff", width: "54px", height: "54px",
  borderRadius: "50%", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  backdropFilter: "blur(5px)",
};

const lightboxNext = {
  position: "fixed", right: "15px", top: "45%",
  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
  color: "#fff", width: "54px", height: "54px",
  borderRadius: "50%", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  backdropFilter: "blur(5px)",
};

const lightboxCounter = {
  position: "fixed", top: "22px", left: "50%", transform: "translateX(-50%)",
  background: "rgba(0,0,0,0.6)", color: "#fff",
  padding: "8px 20px", borderRadius: "20px",
  fontSize: "14px", fontWeight: "600",
  border: "1px solid rgba(255,255,255,0.1)",
};

const thumbsContainer = {
  position: "fixed", bottom: "15px", left: "50%", transform: "translateX(-50%)",
  display: "flex", gap: "8px", overflowX: "auto",
  maxWidth: "80vw", padding: "8px",
  background: "rgba(0,0,0,0.6)", borderRadius: "15px",
  backdropFilter: "blur(10px)",
  scrollbarWidth: "none",
};

const thumb = {
  minWidth: "55px", height: "42px", borderRadius: "7px",
  overflow: "hidden", cursor: "pointer",
  transition: "all 0.2s ease", flexShrink: 0,
};

const thumbImg = { width: "100%", height: "100%", objectFit: "cover" };

export default Proyectos;