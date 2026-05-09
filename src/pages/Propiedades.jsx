import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, BedDouble, Bath, Square, Search, Filter, X } from "lucide-react";

function Propiedades() {
  const [filter, setFilter] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(null); // Imagen principal mostrada en el modal

  // Mock data para las propiedades
  const propiedades = [
    { 
      id: 1, nombre: "Villa Contemporánea", tipo: "Casas", ubicacion: "Sector Norte, Barranquilla", precio: "$850.000.000", 
      img: "/img/casa1.jpg", 
      galeria: ["/img/casa1.jpg", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500"],
      hab: 4, banos: 3, area: 250 
    },
    { 
      id: 2, nombre: "Apartamento Vista Mar", tipo: "Apartamentos", ubicacion: "Puerto Colombia", precio: "$420.000.000", 
      img: "/img/casa2.jpg", 
      galeria: ["/img/casa2.jpg", "https://images.unsplash.com/photo-1502672260266-1c1de2d93688?w=500", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500"],
      hab: 2, banos: 2, area: 95 
    },
    { 
      id: 3, nombre: "Casa Campestre", tipo: "Casas", ubicacion: "Sabanilla", precio: "$1.200.000.000", 
      img: "/img/casa3.jpg", 
      galeria: ["/img/casa3.jpg", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500"],
      hab: 5, banos: 4, area: 400 
    },
    { 
      id: 4, nombre: "Lote Comercial", tipo: "Lotes", ubicacion: "Vía al Mar", precio: "$600.000.000", 
      img: "/img/casa1.jpg", 
      galeria: ["/img/casa1.jpg", "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500"],
      hab: 0, banos: 0, area: 1000 
    },
    { 
      id: 5, nombre: "Penthouse Exclusivo", tipo: "Apartamentos", ubicacion: "Alto Prado, Barranquilla", precio: "$1.500.000.000", 
      img: "/img/casa2.jpg", 
      galeria: ["/img/casa2.jpg", "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=500", "https://images.unsplash.com/photo-1600585154526-990dced4ea0d?w=500"],
      hab: 3, banos: 4, area: 320 
    },
    { 
      id: 6, nombre: "Proyecto Residencial", tipo: "Proyectos", ubicacion: "Ciudad Mallorquín", precio: "Desde $250.000.000", 
      img: "/img/casa3.jpg", 
      galeria: ["/img/casa3.jpg", "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd9b?w=500"],
      hab: 3, banos: 2, area: 78 
    },
  ];

  const categorias = ["Todas", "Casas", "Apartamentos", "Lotes", "Proyectos"];

  const propiedadesFiltradas = propiedades.filter(p => {
    const matchesFilter = filter === "Todas" || p.tipo === filter;
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={container}>
      
      {/* HERO SECTION */}
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

      {/* FILTROS Y BÚSQUEDA SECTION */}
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
            {categorias.map(cat => (
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

      {/* GRID DE PROPIEDADES */}
      <section style={gridSection}>
        <h2 style={sectionTitle}>Propiedades Destacadas</h2>
        
        <motion.div 
          style={grid}
          layout
        >
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
                {/* Fallback en caso de que las imagenes img/casa1.jpg etc no existan todavía, usamos degradado */}
                <img src={p.img} alt={p.nombre} style={cardImage} 
                     onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800"; }} />
              </div>
              
              <div style={cardContent}>
                <h3 style={price}>{p.precio}</h3>
                <h2 style={cardTitle}>{p.nombre}</h2>
                <div style={location}>
                  <MapPin size={16} color="#00bcd4" />
                  <span>{p.ubicacion}</span>
                </div>
                
                {/* AMENIDADES (Solo mostrar si la propiedad las tiene, ej: lotes no tienen hab) */}
                {(p.hab > 0 || p.area > 0) && (
                  <div style={amenities}>
                    {p.hab > 0 && (
                      <div style={amenityItem}>
                        <BedDouble size={18} color="#aaa" />
                        <span>{p.hab} Hab</span>
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
                
                <button style={contactBtn} onClick={() => {
                  setSelectedProperty(p);
                  setActiveImage(null); // Reset active image upon opening new modal
                }}>Ver Detalles</button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {propiedadesFiltradas.length === 0 && (
          <div style={emptyState}>
            <p>No se encontraron propiedades en esta categoría.</p>
          </div>
        )}
      </section>

      {/* MODAL DE PROPIEDAD */}
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
                  src={activeImage || selectedProperty.img} 
                  alt={selectedProperty.nombre} 
                  style={modalImage} 
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800"; }} 
                />
              </div>

              
              <div style={modalDetails}>
              {/* MINI GALERIA DE FOTOS MOVIDA AQUI */}
              {selectedProperty.galeria && selectedProperty.galeria.length > 1 && (
                <div style={galleryRail}>
                  {selectedProperty.galeria.map((foto, index) => {
                    const isActive = (activeImage || selectedProperty.img) === foto;
                    return (
                      <div 
                        key={index} 
                        style={isActive ? galleryThumbnailActive : galleryThumbnail}
                        onClick={() => setActiveImage(foto)}
                      >
                        <img 
                          src={foto} 
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=200"; }}
                          alt={`Galeria ${index}`}
                        />
                      </div>
                    )
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
                  Hermosa propiedad ubicada en excelentes condiciones. Cuenta con amplios espacios, excelente iluminación natural y acabados modernos. Perfecta para quienes buscan confort y funcionalidad.
                </p>

                {(selectedProperty.hab > 0 || selectedProperty.area > 0) && (
                  <div style={modalAmenities}>
                    {selectedProperty.hab > 0 && (
                      <div style={modalAmenityItem}>
                        <BedDouble size={24} color="#00bcd4" />
                        <span>{selectedProperty.hab} Habitaciones</span>
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

const container = {
  background: "#050505",
  minHeight: "100vh",
  paddingBottom: "80px",
  color: "#fff",
};

const heroSection = {
  height: "60vh",
  minHeight: "400px",
  backgroundImage: "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  marginTop: 0, // Reset margin top from global section rule
};

const heroOverlay = {
  position: "absolute",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "linear-gradient(to bottom, rgba(0,0,0,0.5), #050505)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 20px"
};

const heroContent = {
  width: "100%",
  maxWidth: "800px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "30px", // Separates the text from the search bar
  paddingBottom: "40px", // Adds breathing room at the bottom before filters
  paddingTop: "80px" // Clears the transparent navbar space when text wraps
};

const heroTitle = {
  fontSize: "clamp(32px, 5vw, 64px)",
  fontWeight: "800",
  marginBottom: "0", // Changed from 15px since we use gap now
  color: "#fff",
  textShadow: "0 4px 20px rgba(0,0,0,0.8)"
};

const heroSubtitle = {
  fontSize: "18px",
  color: "#ccc",
  marginBottom: "0" // Changed from 40px since we use gap now
};


const filterSection = {
  marginTop: "-30px",
  position: "relative",
  zIndex: 10,
  padding: "0 20px",
};

const filterContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
  background: "#111",
  padding: "20px 30px",
  borderRadius: "15px",
  border: "1px solid rgba(255,255,255,0.05)",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
};

const searchContainer = {
  width: "100%",
  paddingBottom: "15px",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  marginBottom: "5px"
};

const searchBar = {
  display: "flex",
  alignItems: "center",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "10px",
  padding: "8px 12px",
  border: "1px solid rgba(255,255,255,0.1)",
  width: "100%"
};

const searchInput = {
  flex: 1,
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "15px",
  padding: "0 15px",
  outline: "none"
};

const searchBtn = {
  background: "#00bcd4",
  color: "#050505",
  padding: "8px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "14px",
  transition: "all 0.3s ease",
  cursor: "pointer"
};

const filterRow = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "15px"
};

const filterButtons = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  flex: 1
};

const filterBtn = {
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#ccc",
  padding: "10px 20px",
  borderRadius: "30px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  fontWeight: "500",
};

const filterBtnActive = {
  ...filterBtn,
  background: "#00bcd4",
  color: "#000",
  borderColor: "#00bcd4",
  fontWeight: "bold"
};

const gridSection = {
  maxWidth: "1200px",
  margin: "60px auto 0",
  padding: "0 20px",
};

const sectionTitle = {
  fontSize: "32px",
  marginBottom: "40px",
  color: "#fff"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "30px"
};

const card = {
  background: "#0a0a0a",
  borderRadius: "20px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.05)",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  position: "relative",
};

const imageWrapper = {
  position: "relative",
  height: "220px",
  overflow: "hidden"
};

const cardImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.5s ease",
};

const badge = {
  position: "absolute",
  top: "15px",
  left: "15px",
  background: "rgba(0,188,212,0.9)",
  color: "#000",
  padding: "5px 15px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
  zIndex: 2,
  letterSpacing: "1px",
  textTransform: "uppercase"
};

const cardContent = {
  padding: "25px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const price = {
  color: "#00bcd4",
  fontSize: "24px",
  margin: "0 0 10px 0",
};

const cardTitle = {
  fontSize: "20px",
  color: "#fff",
  margin: "0 0 10px 0",
  fontWeight: "600"
};

const location = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#aaa",
  fontSize: "14px",
  marginBottom: "20px"
};

const amenities = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 0",
  borderTop: "1px solid rgba(255,255,255,0.05)",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  marginBottom: "25px",
  marginTop: "auto"
};

const amenityItem = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#ccc",
  fontSize: "14px"
};

const contactBtn = {
  width: "100%",
  background: "transparent",
  border: "1px solid #00bcd4",
  color: "#00bcd4",
  padding: "12px",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const emptyState = {
  textAlign: "center",
  padding: "60px 20px",
  color: "#aaa",
  fontSize: "18px",
  background: "rgba(255,255,255,0.02)",
  borderRadius: "20px",
  border: "1px dashed rgba(255,255,255,0.1)"
};

// MODAL STYLES
const modalOverlay = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.8)",
  backdropFilter: "blur(5px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  padding: "20px"
};

const modalContent = {
  background: "#111",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "900px",
  maxHeight: "90vh",
  overflowY: "auto",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
  position: "relative",
  display: "flex",
  flexDirection: "column",
};

const closeBtn = {
  position: "absolute",
  top: "20px",
  right: "20px",
  background: "rgba(0,0,0,0.5)",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  zIndex: 10,
  transition: "background 0.3s ease"
};

const modalImageWrapper = {
  width: "100%",
  height: "350px",
  position: "relative"
};

const modalImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const galleryRail = {
  display: "flex",
  gap: "10px",
  padding: "0 0 15px 0",
  overflowX: "auto",
  scrollbarWidth: "none", // Hide scrollbar for a cleaner look when inside the text block
  position: "relative",
};

const galleryThumbnail = {
  minWidth: "80px",
  height: "60px",
  borderRadius: "10px",
  cursor: "pointer",
  border: "2px solid transparent",
  opacity: 0.6,
  transition: "all 0.2s ease"
};

const galleryThumbnailActive = {
  ...galleryThumbnail,
  border: "2px solid #00bcd4",
  opacity: 1
};

const modalDetails = {
  padding: "20px 40px 40px 40px",
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const modalPrice = {
  color: "#00bcd4",
  fontSize: "32px",
  margin: "0",
  fontWeight: "bold"
};

const modalTitle = {
  fontSize: "28px",
  color: "#fff",
  margin: "0"
};

const modalDescription = {
  color: "#aaa",
  fontSize: "16px",
  lineHeight: "1.6",
  marginTop: "10px",
  marginBottom: "20px"
};

const modalAmenities = {
  display: "flex",
  flexWrap: "wrap",
  gap: "30px",
  padding: "20px 0",
  borderTop: "1px solid rgba(255,255,255,0.05)",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  marginBottom: "30px"
};

const modalAmenityItem = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "500"
};

const modalContactBtn = {
  background: "linear-gradient(45deg, #00bcd4, #008394)",
  color: "#fff",
  border: "none",
  padding: "15px 30px",
  borderRadius: "10px",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.3s ease",
  alignSelf: "flex-start",
  boxShadow: "0 10px 20px rgba(0,188,212,0.3)"
};

export default Propiedades;
