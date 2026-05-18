import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, LogOut, Home, CheckCircle, Clock, XCircle, X, ImagePlus } from "lucide-react";
import { supabase } from "../lib/supabase";

const ESTADO_CONFIG = {
  "Disponible":     { color: "#10b981" },
  "En negociación": { color: "#f59e0b" },
  "Vendida":        { color: "#ef4444" },
};

const TIPOS = ["Casas", "Apartamentos", "Lotes", "Proyectos"];
const ESTADOS = ["Disponible", "En negociación", "Vendida"];

const formInicial = {
  nombre: "", tipo: "Casas", ubicacion: "", precio: "",
  habitaciones: 0, banos: 0, area: 0,
  descripcion: "", estado: "Disponible", destacada: false,
};

function Admin() {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(formInicial);
  const [guardando, setGuardando] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [imagenesActuales, setImagenesActuales] = useState([]);
  const [imagenesNuevas, setImagenesNuevas] = useState([]);
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    verificarSesion();
    fetchPropiedades();
  }, []);

  async function verificarSesion() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate("/login");
  }

  async function fetchPropiedades() {
    setLoading(true);
    const { data, error } = await supabase
      .from("propiedades")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setPropiedades(data || []);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  function abrirNueva() {
    setEditando(null);
    setForm(formInicial);
    setImagenesActuales([]);
    setImagenesNuevas([]);
    setPreviews([]);
    setShowModal(true);
  }

  function abrirEditar(propiedad) {
    setEditando(propiedad.id);
    setForm({
      nombre:       propiedad.nombre,
      tipo:         propiedad.tipo,
      ubicacion:    propiedad.ubicacion,
      precio:       propiedad.precio,
      habitaciones: propiedad.habitaciones,
      banos:        propiedad.banos,
      area:         propiedad.area,
      descripcion:  propiedad.descripcion || "",
      estado:       propiedad.estado,
      destacada:    propiedad.destacada,
    });
    setImagenesActuales(propiedad.imagenes || []);
    setImagenesNuevas([]);
    setPreviews([]);
    setShowModal(true);
  }

  function handleSeleccionarImagenes(e) {
    const archivos = Array.from(e.target.files);
    setImagenesNuevas(prev => [...prev, ...archivos]);
    const nuevasPreviews = archivos.map(f => URL.createObjectURL(f));
    setPreviews(prev => [...prev, ...nuevasPreviews]);
  }

  function eliminarImagenActual(url) {
    setImagenesActuales(prev => prev.filter(u => u !== url));
  }

  function eliminarImagenNueva(index) {
    setImagenesNuevas(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  }

  async function subirImagenes() {
    const urls = [];
    for (const archivo of imagenesNuevas) {
      const nombreArchivo = `${Date.now()}_${archivo.name.replace(/\s/g, "_")}`;
      const { error } = await supabase.storage
        .from("propiedades")
        .upload(nombreArchivo, archivo);
      if (!error) {
        const { data } = supabase.storage
          .from("propiedades")
          .getPublicUrl(nombreArchivo);
        urls.push(data.publicUrl);
      }
    }
    return urls;
  }

  async function handleGuardar() {
    if (!form.nombre || !form.ubicacion || !form.precio) {
      alert("Por favor completa los campos obligatorios: nombre, ubicación y precio.");
      return;
    }
    setGuardando(true);

    const urlsNuevas = await subirImagenes();
    const todasLasImagenes = [...imagenesActuales, ...urlsNuevas];

    const payload = {
      nombre:       form.nombre,
      tipo:         form.tipo,
      ubicacion:    form.ubicacion,
      precio:       form.precio,
      habitaciones: Number(form.habitaciones),
      banos:        Number(form.banos),
      area:         Number(form.area),
      descripcion:  form.descripcion,
      estado:       form.estado,
      destacada:    form.destacada,
      imagenes:     todasLasImagenes,
    };

    let error;
    if (editando) {
      ({ error } = await supabase.from("propiedades").update(payload).eq("id", editando));
    } else {
      ({ error } = await supabase.from("propiedades").insert([payload]));
    }

    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      setShowModal(false);
      fetchPropiedades();
    }
    setGuardando(false);
  }

  async function handleEliminar(id) {
    const { error } = await supabase.from("propiedades").delete().eq("id", id);
    if (error) {
      alert("Error al eliminar: " + error.message);
    } else {
      setConfirmDelete(null);
      fetchPropiedades();
    }
  }

  async function cambiarEstado(id, nuevoEstado) {
    await supabase.from("propiedades").update({ estado: nuevoEstado }).eq("id", id);
    fetchPropiedades();
  }

  const contadores = ESTADOS.reduce((acc, e) => {
    acc[e] = propiedades.filter(p => p.estado === e).length;
    return acc;
  }, {});

  return (
    <div style={pageContainer}>

      {/* NAVBAR */}
      <nav style={navbar}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Home size={22} color="#00bcd4" />
          <span style={{ fontSize: "18px", fontWeight: "700", color: "#fff" }}>DOMOGAR Admin</span>
        </div>
        <button style={logoutBtn} onClick={handleLogout}>
          <LogOut size={18} /> Cerrar sesión
        </button>
      </nav>

      <div style={content}>

        {/* ENCABEZADO */}
        <div style={header}>
          <div>
            <h1 style={pageTitle}>Gestión de Propiedades</h1>
            <p style={pageSubtitle}>Administra el catálogo completo de propiedades</p>
          </div>
          <button style={addBtn} onClick={abrirNueva}>
            <Plus size={20} /> Nueva Propiedad
          </button>
        </div>

        {/* ESTADÍSTICAS */}
        <div style={statsGrid}>
          <div style={statCard}>
            <span style={{ fontSize: "32px", fontWeight: "800", color: "#00bcd4" }}>{propiedades.length}</span>
            <span style={{ color: "#aaa", fontSize: "14px" }}>Total propiedades</span>
          </div>
          {ESTADOS.map(e => (
            <div key={e} style={statCard}>
              <span style={{ fontSize: "32px", fontWeight: "800", color: ESTADO_CONFIG[e].color }}>{contadores[e]}</span>
              <span style={{ color: "#aaa", fontSize: "14px" }}>{e}</span>
            </div>
          ))}
        </div>

        {/* TABLA */}
        {loading ? (
          <div style={loadingState}>Cargando propiedades...</div>
        ) : (
          <div style={tableWrapper}>
            <table style={table}>
              <thead>
                <tr style={tableHead}>
                  <th style={th}>Propiedad</th>
                  <th style={th}>Tipo</th>
                  <th style={th}>Ubicación</th>
                  <th style={th}>Precio</th>
                  <th style={th}>Estado</th>
                  <th style={th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {propiedades.map(p => (
                  <tr key={p.id} style={tableRow}>
                    <td style={td}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {p.imagenes && p.imagenes.length > 0 ? (
                          <img src={p.imagenes[0]} style={thumbImg}
                            onError={(e) => e.target.style.display = "none"} alt="" />
                        ) : (
                          <div style={thumbPlaceholder}><ImagePlus size={16} color="#555" /></div>
                        )}
                        <div>
                          <div style={{ fontWeight: "600", color: "#fff" }}>{p.nombre}</div>
                          {p.destacada && <span style={destacadaBadge}>Destacada</span>}
                        </div>
                      </div>
                    </td>
                    <td style={td}><span style={tipoBadge}>{p.tipo}</span></td>
                    <td style={{ ...td, color: "#aaa" }}>{p.ubicacion}</td>
                    <td style={{ ...td, color: "#00bcd4", fontWeight: "600" }}>{p.precio}</td>
                    <td style={td}>
                      <select
                        value={p.estado}
                        onChange={(e) => cambiarEstado(p.id, e.target.value)}
                        style={{ ...estadoSelect, color: ESTADO_CONFIG[p.estado].color, borderColor: ESTADO_CONFIG[p.estado].color }}
                      >
                        {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
                      </select>
                    </td>
                    <td style={td}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button style={editBtn} onClick={() => abrirEditar(p)} title="Editar">
                          <Pencil size={16} />
                        </button>
                        <button style={deleteBtn} onClick={() => setConfirmDelete(p)} title="Eliminar">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {propiedades.length === 0 && (
              <div style={emptyState}>No hay propiedades registradas aún.</div>
            )}
          </div>
        )}
      </div>

      {/* MODAL AGREGAR / EDITAR */}
      <AnimatePresence>
        {showModal && (
          <motion.div style={modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}>
            <motion.div style={modalBox}
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <h2 style={modalTitle}>{editando ? "Editar Propiedad" : "Nueva Propiedad"}</h2>

              <div style={formGrid}>
                <div style={formGroup}>
                  <label style={formLabel}>Nombre *</label>
                  <input style={formInput} value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} placeholder="Ej: Villa Contemporánea" />
                </div>

                <div style={formGroup}>
                  <label style={formLabel}>Tipo *</label>
                  <select style={formInput} value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})}>
                    {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div style={{ ...formGroup, gridColumn: "1 / -1" }}>
                  <label style={formLabel}>Ubicación *</label>
                  <input style={formInput} value={form.ubicacion} onChange={e => setForm({...form, ubicacion: e.target.value})} placeholder="Ej: Sector Norte, Barranquilla" />
                </div>

                <div style={formGroup}>
                  <label style={formLabel}>Precio *</label>
                  <input style={formInput} value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} placeholder="Ej: $850.000.000" />
                </div>

                <div style={formGroup}>
                  <label style={formLabel}>Estado</label>
                  <select style={formInput} value={form.estado} onChange={e => setForm({...form, estado: e.target.value})}>
                    {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>

                <div style={formGroup}>
                  <label style={formLabel}>Habitaciones</label>
                  <input style={formInput} type="number" min="0" value={form.habitaciones} onChange={e => setForm({...form, habitaciones: e.target.value})} />
                </div>

                <div style={formGroup}>
                  <label style={formLabel}>Baños</label>
                  <input style={formInput} type="number" min="0" value={form.banos} onChange={e => setForm({...form, banos: e.target.value})} />
                </div>

                <div style={formGroup}>
                  <label style={formLabel}>Área (m²)</label>
                  <input style={formInput} type="number" min="0" value={form.area} onChange={e => setForm({...form, area: e.target.value})} />
                </div>

                <div style={formGroup}>
                  <label style={formLabel}>Destacada</label>
                  <select style={formInput} value={form.destacada} onChange={e => setForm({...form, destacada: e.target.value === "true"})}>
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                  </select>
                </div>

                <div style={{ ...formGroup, gridColumn: "1 / -1" }}>
                  <label style={formLabel}>Descripción</label>
                  <textarea style={{ ...formInput, height: "100px", resize: "vertical" }}
                    value={form.descripcion}
                    onChange={e => setForm({...form, descripcion: e.target.value})}
                    placeholder="Describe la propiedad..."
                  />
                </div>

                {/* IMÁGENES */}
                <div style={{ ...formGroup, gridColumn: "1 / -1" }}>
                  <label style={formLabel}>Imágenes</label>

                  {/* Imágenes actuales (al editar) */}
                  {imagenesActuales.length > 0 && (
                    <div style={imageGrid}>
                      {imagenesActuales.map((url, i) => (
                        <div key={i} style={imageThumbWrapper}>
                          <img src={url} style={imageThumb} alt={`img-${i}`} />
                          <button style={removeImgBtn} onClick={() => eliminarImagenActual(url)}>
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Previews de imágenes nuevas */}
                  {previews.length > 0 && (
                    <div style={imageGrid}>
                      {previews.map((url, i) => (
                        <div key={i} style={imageThumbWrapper}>
                          <img src={url} style={imageThumb} alt={`preview-${i}`} />
                          <button style={removeImgBtn} onClick={() => eliminarImagenNueva(i)}>
                            <X size={12} />
                          </button>
                          <span style={newBadge}>Nueva</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Botón subir */}
                  <label style={uploadBtn}>
                    <ImagePlus size={18} />
                    Seleccionar imágenes
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleSeleccionarImagenes}
                    />
                  </label>
                  <p style={{ color: "#666", fontSize: "12px", margin: "6px 0 0 0" }}>
                    Puedes subir varias imágenes a la vez. Formatos: JPG, PNG, WEBP.
                  </p>
                </div>

              </div>

              <div style={modalActions}>
                <button style={cancelBtn} onClick={() => setShowModal(false)}>Cancelar</button>
                <button style={saveBtn} onClick={handleGuardar} disabled={guardando}>
                  {guardando ? "Guardando..." : editando ? "Guardar Cambios" : "Agregar Propiedad"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL CONFIRMAR ELIMINACIÓN */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div style={modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setConfirmDelete(null)}>
            <motion.div style={{ ...modalBox, maxWidth: "420px" }}
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h2 style={{ ...modalTitle, color: "#ef4444" }}>¿Eliminar propiedad?</h2>
              <p style={{ color: "#aaa", marginBottom: "30px", textAlign: "center" }}>
                Estás a punto de eliminar <strong style={{ color: "#fff" }}>{confirmDelete.nombre}</strong>. Esta acción no se puede deshacer.
              </p>
              <div style={modalActions}>
                <button style={cancelBtn} onClick={() => setConfirmDelete(null)}>Cancelar</button>
                <button style={{ ...saveBtn, background: "#ef4444" }} onClick={() => handleEliminar(confirmDelete.id)}>
                  Sí, eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// STYLES
const pageContainer = { minHeight: "100vh", background: "#080808", color: "#fff" };
const navbar = { position: "sticky", top: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(10px)", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", zIndex: 100 };
const logoutBtn = { display: "flex", alignItems: "center", gap: "8px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#ccc", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" };
const content = { maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" };
const header = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px", flexWrap: "wrap", gap: "20px" };
const pageTitle = { fontSize: "32px", fontWeight: "800", margin: "0 0 8px 0", color: "#fff" };
const pageSubtitle = { color: "#aaa", margin: 0, fontSize: "16px" };
const addBtn = { display: "flex", alignItems: "center", gap: "8px", background: "linear-gradient(45deg, #00bcd4, #008394)", border: "none", color: "#fff", padding: "12px 24px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "15px" };
const statsGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "20px", marginBottom: "40px" };
const statCard = { background: "#111", borderRadius: "15px", padding: "25px", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "8px" };
const tableWrapper = { background: "#111", borderRadius: "15px", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" };
const table = { width: "100%", borderCollapse: "collapse" };
const tableHead = { background: "rgba(255,255,255,0.03)" };
const th = { padding: "16px 20px", textAlign: "left", color: "#aaa", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid rgba(255,255,255,0.06)" };
const tableRow = { borderBottom: "1px solid rgba(255,255,255,0.04)" };
const td = { padding: "16px 20px", fontSize: "14px", verticalAlign: "middle" };
const thumbImg = { width: "50px", height: "40px", objectFit: "cover", borderRadius: "6px" };
const thumbPlaceholder = { width: "50px", height: "40px", background: "rgba(255,255,255,0.05)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" };
const destacadaBadge = { background: "rgba(0,188,212,0.15)", color: "#00bcd4", padding: "2px 8px", borderRadius: "10px", fontSize: "11px", marginLeft: "8px" };
const tipoBadge = { background: "rgba(255,255,255,0.08)", color: "#ccc", padding: "4px 10px", borderRadius: "10px", fontSize: "12px" };
const estadoSelect = { background: "transparent", border: "1px solid", borderRadius: "8px", padding: "6px 10px", fontSize: "13px", fontWeight: "600", cursor: "pointer", outline: "none" };
const editBtn = { background: "rgba(0,188,212,0.15)", border: "none", color: "#00bcd4", padding: "8px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center" };
const deleteBtn = { background: "rgba(239,68,68,0.15)", border: "none", color: "#ef4444", padding: "8px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center" };
const loadingState = { textAlign: "center", padding: "60px", color: "#aaa" };
const emptyState = { textAlign: "center", padding: "60px", color: "#aaa" };
const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(5px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" };
const modalBox = { background: "#111", borderRadius: "20px", padding: "40px", width: "100%", maxWidth: "700px", maxHeight: "90vh", overflowY: "auto", border: "1px solid rgba(255,255,255,0.1)" };
const modalTitle = { fontSize: "24px", fontWeight: "700", color: "#fff", margin: "0 0 30px 0" };
const formGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" };
const formGroup = { display: "flex", flexDirection: "column", gap: "8px" };
const formLabel = { fontSize: "13px", color: "#aaa", fontWeight: "500" };
const formInput = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "12px 14px", color: "white", fontSize: "14px", outline: "none", width: "100%", boxSizing: "border-box" };
const modalActions = { display: "flex", justifyContent: "flex-end", gap: "15px" };
const cancelBtn = { background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#ccc", padding: "12px 24px", borderRadius: "10px", cursor: "pointer", fontSize: "15px" };
const saveBtn = { background: "linear-gradient(45deg, #00bcd4, #008394)", border: "none", color: "#fff", padding: "12px 24px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "15px" };
const imageGrid = { display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "12px" };
const imageThumbWrapper = { position: "relative", width: "80px", height: "70px" };
const imageThumb = { width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" };
const removeImgBtn = { position: "absolute", top: "-6px", right: "-6px", background: "#ef4444", border: "none", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" };
const newBadge = { position: "absolute", bottom: "2px", left: "2px", background: "#10b981", color: "#fff", fontSize: "9px", padding: "1px 5px", borderRadius: "4px", fontWeight: "bold" };
const uploadBtn = { display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", border: "1px dashed rgba(255,255,255,0.2)", borderRadius: "10px", padding: "12px 20px", color: "#aaa", cursor: "pointer", fontSize: "14px", transition: "all 0.2s ease" };

export default Admin;