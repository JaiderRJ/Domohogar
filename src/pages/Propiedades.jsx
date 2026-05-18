import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, BedDouble, Bath, Square, Search, Filter, X } from "lucide-react";
import { supabase } from "../lib/supabase";

function Propiedades() {
  const [filter, setFilter] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar propiedades desde Supabase
  useEffect(() => {
    fetchPropiedades();
  }, []);

  async function fetchPropiedades() {
    setLoading(true);
    const { data, error } = await supabase
      .from("propiedades")
      .select("*")
      .neq("estado", "Vendida") // No mostrar vendidas en el catálogo público
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error cargando propiedades:", error);
    } else {
      setPropiedades(data || []);
    }
    setLoading(false);
  }

  const categorias = ["Todas", "Casas", "Apartamentos", "Lotes", "Proyectos"];

  const propiedadesFiltradas = propiedades.filter((p) => {
    const matchesFilter = filter === "Todas" || p.tipo === filter;
    const matchesSearch =
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Imagen principal de una propiedad
  const getMainImage = (p) =>
    p.imagenes && p.imagenes.length > 0
      ? p.imagenes[0]
      : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800";

  return (
    <div style={container}>

      {/* HERO */}
      <section style={heroSection}>
        <div style={heroOverlay}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={heroContent}
          >
            <h1 style={heroTitle}>Encuentra tu hogar ideal</h1>
            <p style={heroSubtitle}>Explora el catálogo de propiedades exclusivas con DOMOGAR Real Estate.</p>
          </motion.div>
        </div>
      </section>

      {/* FILTROS */}
      <section style={filterSection}>
        <div style={filterContainer}>
          <div style={searchContainer}>
            <div style={searchBar}>
              <Search color="#00bcd4" size={20} />
              <input
                type="text"
                placeholder="Buscar propiedades..."
                style={searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#aaa", marginRight: "20px" }}>
            <Filter size={20} /> <span style={{ fontWeight: "bold" }}>Filtros:</span>
          </div>
          <div style={filterButtons}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={filter === cat ? filterBtnActive : filterBtn}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section style={gridSection}>
        <h2 style={sectionTitle}>Propiedades Disponibles</h2>

        {loading ? (
          <div style={loadingState}>
            <p>Cargando propiedades...</p>
          </div>
        ) : (
          <motion.div style={grid} layout>
            {propiedadesFiltradas.map((p) => (
              <motion.div
                key={p.id}
                style={card}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                transition={{ duration: 0.3 }}
              >
                <div style={imageWrapper}>
                  <div style={badge}>{p.tipo}</div>
                  <div style={{ ...estadoBadge, background: p.estado === "En negociación" ? "#f59e0b" : "#10b981" }}>
                    {p.estado}
                  </div>
                  <img
                    src={getMainImage(p)}
                    alt={p.nombre}
                    style={cardImage}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                </div>

                <div style={cardContent}>
                  <h3 style={price}>{p.precio}</h3>
                  <h2 style={cardTitle}>{p.nombre}</h2>
                  <div style={location}>
                    <MapPin size={16} color="#00bcd4" />
                    <span>{p.ubicacion}</span>
                  </div>

                  {(p.habitaciones > 0 || p.area > 0) && (
                    <div style={amenities}>
                      {p.habitaciones > 0 && (
                        <div style={amenityItem}>
                          <BedDouble size={18} color="#aaa" />
                          <span>{p.habitaciones} Hab</span>
                        </div>
                      )}
                      {p.banos > 0 && (
                        <div style={amenityItem}>
                          <Bath size={18} color="#aaa" />
                          <span>{p.banos} Baños</span>
                        </div>
                      )}
                      {p.area > 0 && (
                        <div style={amenityItem}>
                          <Square size={18} color="#aaa" />
                          <span>{p.area} m²</span>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    style={contactBtn}
                    onClick={() => {
                      setSelectedProperty(p);
                      setActiveImage(null);
                    }}
                  >
                    Ver Detalles
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && propiedadesFiltradas.length === 0 && (
          <div style={emptyState}>
            <p>No se encontraron propiedades en esta categoría.</p>
          </div>
        )}
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            style={modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              style={modalContent}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button style={closeBtn} onClick={() => setSelectedProperty(null)}>
                <X size={24} color="#fff" />
              </button>

              <div style={modalImageWrapper}>
                <div style={badge}>{selectedProperty.tipo}</div>
                <img
                  src={activeImage || getMainImage(selectedProperty)}
                  alt={selectedProperty.nombre}
                  style={modalImage}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </div>

              <div style={modalDetails}>
                {selectedProperty.imagenes && selectedProperty.imagenes.length > 1 && (
                  <div style={galleryRail}>
                    {selectedProperty.imagenes.map((foto, index) => {
                      const isActive = (activeImage || getMainImage(selectedProperty)) === foto;
                      return (
                        <div
                          key={index}
                          style={isActive ? galleryThumbnailActive : galleryThumbnail}
                          onClick={() => setActiveImage(foto)}
                        >
                          <img
                            src={foto}
                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=200";
                            }}
                            alt={`Galeria ${index}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                <h3 style={modalPrice}>{selectedProperty.precio}</h3>
                <h2 style={modalTitle}>{selectedProperty.nombre}</h2>
                <div style={location}>
                  <MapPin size={18} color="#00bcd4" />
                  <span style={{ fontSize: "16px" }}>{selectedProperty.ubicacion}</span>
                </div>

                <p style={modalDescription}>
                  {selectedProperty.descripcion || "Hermosa propiedad ubicada en excelentes condiciones. Cuenta con amplios espacios, excelente iluminación natural y acabados modernos."}
                </p>

                {(selectedProperty.habitaciones > 0 || selectedProperty.area > 0) && (
                  <div style={modalAmenities}>
                    {selectedProperty.habitaciones > 0 && (
                      <div style={modalAmenityItem}>
                        <BedDouble size={24} color="#00bcd4" />
                        <span>{selectedProperty.habitaciones} Habitaciones</span>
                      </div>
                    )}
                    {selectedProperty.banos > 0 && (
                      <div style={modalAmenityItem}>
                        <Bath size={24} color="#00bcd4" />
                        <span>{selectedProperty.banos} Baños</span>
                      </div>
                    )}
                    {selectedProperty.area > 0 && (
                      <div style={modalAmenityItem}>
                        <Square size={24} color="#00bcd4" />
                        <span>{selectedProperty.area} m²</span>
                      </div>
                    )}
                  </div>
                )}

                <a
                  href="https://wa.me/573000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...modalContactBtn, textDecoration: "none", display: "inline-block", textAlign: "center" }}
                >
                  Contactar Asesor
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- STYLES ---
const container = { background: "#050505", minHeight: "100vh", paddingBottom: "80px", color: "#fff" };
const heroSection = { height: "60vh", minHeight: "400px", backgroundImage: "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80')", backgroundSize: "cover", backgroundPosition: "center", position: "relative", marginTop: 0 };
const heroOverlay = { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5), #050505)", display: "flex", justifyContent: "center", alignItems: "center", padding: "0 20px" };
const heroContent = { width: "100%", maxWidth: "800px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "30px", paddingBottom: "40px", paddingTop: "80px" };
const heroTitle = { fontSize: "clamp(32px, 5vw, 64px)", fontWeight: "800", marginBottom: "0", color: "#fff", textShadow: "0 4px 20px rgba(0,0,0,0.8)" };
const heroSubtitle = { fontSize: "18px", color: "#ccc", marginBottom: "0" };
const filterSection = { marginTop: "-30px", position: "relative", zIndex: 10, padding: "0 20px" };
const filterContainer = { maxWidth: "1200px", margin: "0 auto", background: "#111", padding: "20px 30px", borderRadius: "15px", border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" };
const searchContainer = { width: "100%", paddingBottom: "15px", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "5px" };
const searchBar = { display: "flex", alignItems: "center", background: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "8px 12px", border: "1px solid rgba(255,255,255,0.1)", width: "100%" };
const searchInput = { flex: 1, background: "transparent", border: "none", color: "white", fontSize: "15px", padding: "0 15px", outline: "none" };
const filterButtons = { display: "flex", gap: "10px", flexWrap: "wrap", flex: 1 };
const filterBtn = { background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#ccc", padding: "10px 20px", borderRadius: "30px", cursor: "pointer", transition: "all 0.3s ease", fontWeight: "500" };
const filterBtnActive = { ...filterBtn, background: "#00bcd4", color: "#000", borderColor: "#00bcd4", fontWeight: "bold" };
const gridSection = { maxWidth: "1200px", margin: "60px auto 0", padding: "0 20px" };
const sectionTitle = { fontSize: "32px", marginBottom: "40px", color: "#fff" };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "30px" };
const card = { background: "#0a0a0a", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s ease", display: "flex", flexDirection: "column", position: "relative" };
const imageWrapper = { position: "relative", height: "220px", overflow: "hidden" };
const cardImage = { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" };
const badge = { position: "absolute", top: "15px", left: "15px", background: "rgba(0,188,212,0.9)", color: "#000", padding: "5px 15px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", zIndex: 2, letterSpacing: "1px", textTransform: "uppercase" };
const estadoBadge = { position: "absolute", top: "15px", right: "15px", color: "#000", padding: "5px 15px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", zIndex: 2, letterSpacing: "1px" };
const cardContent = { padding: "25px", display: "flex", flexDirection: "column", flex: 1 };
const price = { color: "#00bcd4", fontSize: "24px", margin: "0 0 10px 0" };
const cardTitle = { fontSize: "20px", color: "#fff", margin: "0 0 10px 0", fontWeight: "600" };
const location = { display: "flex", alignItems: "center", gap: "8px", color: "#aaa", fontSize: "14px", marginBottom: "20px" };
const amenities = { display: "flex", justifyContent: "space-between", padding: "15px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "25px", marginTop: "auto" };
const amenityItem = { display: "flex", alignItems: "center", gap: "8px", color: "#ccc", fontSize: "14px" };
const contactBtn = { width: "100%", background: "transparent", border: "1px solid #00bcd4", color: "#00bcd4", padding: "12px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s ease" };
const loadingState = { textAlign: "center", padding: "60px 20px", color: "#aaa", fontSize: "18px" };
const emptyState = { textAlign: "center", padding: "60px 20px", color: "#aaa", fontSize: "18px", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px dashed rgba(255,255,255,0.1)" };
const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(5px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" };
const modalContent = { background: "#111", borderRadius: "20px", width: "100%", maxWidth: "900px", maxHeight: "90vh", overflowY: "auto", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", position: "relative", display: "flex", flexDirection: "column" };
const closeBtn = { position: "absolute", top: "20px", right: "20px", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", zIndex: 10 };
const modalImageWrapper = { width: "100%", height: "350px", position: "relative" };
const modalImage = { width: "100%", height: "100%", objectFit: "cover" };
const galleryRail = { display: "flex", gap: "10px", padding: "0 0 15px 0", overflowX: "auto", scrollbarWidth: "none", position: "relative" };
const galleryThumbnail = { minWidth: "80px", height: "60px", borderRadius: "10px", cursor: "pointer", border: "2px solid transparent", opacity: 0.6, transition: "all 0.2s ease" };
const galleryThumbnailActive = { ...galleryThumbnail, border: "2px solid #00bcd4", opacity: 1 };
const modalDetails = { padding: "20px 40px 40px 40px", display: "flex", flexDirection: "column", gap: "15px" };
const modalPrice = { color: "#00bcd4", fontSize: "32px", margin: "0", fontWeight: "bold" };
const modalTitle = { fontSize: "28px", color: "#fff", margin: "0" };
const modalDescription = { color: "#aaa", fontSize: "16px", lineHeight: "1.6", marginTop: "10px", marginBottom: "20px" };
const modalAmenities = { display: "flex", flexWrap: "wrap", gap: "30px", padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "30px" };
const modalAmenityItem = { display: "flex", alignItems: "center", gap: "10px", color: "#fff", fontSize: "16px", fontWeight: "500" };
const modalContactBtn = { background: "linear-gradient(45deg, #00bcd4, #008394)", color: "#fff", border: "none", padding: "15px 30px", borderRadius: "10px", fontSize: "18px", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s ease", alignSelf: "flex-start", boxShadow: "0 10px 20px rgba(0,188,212,0.3)" };

export default Propiedades;