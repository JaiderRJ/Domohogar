import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Correo o contraseña incorrectos.");
    } else {
      navigate("/admin");
    }
    setLoading(false);
  }

  return (
    <div style={container}>
      <motion.div
        style={card}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src="/img/logo.png" alt="DOMOGAR" style={logo} onError={(e) => e.target.style.display = "none"} />
        <h1 style={title}>Panel de Administración</h1>
        <p style={subtitle}>Acceso exclusivo para administradores</p>

        <form onSubmit={handleLogin} style={form}>
          <div style={inputGroup}>
            <label style={label}>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@domogar.com"
              style={input}
              required
            />
          </div>

          <div style={inputGroup}>
            <label style={label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={input}
              required
            />
          </div>

          {error && <p style={errorMsg}>{error}</p>}

          <button type="submit" style={btn} disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "#0a0a0a",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const card = {
  background: "#111",
  borderRadius: "20px",
  padding: "50px 40px",
  width: "100%",
  maxWidth: "440px",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const logo = {
  height: "60px",
  marginBottom: "20px",
  objectFit: "contain",
};

const title = {
  fontSize: "24px",
  fontWeight: "800",
  color: "#fff",
  margin: "0 0 8px 0",
  textAlign: "center",
};

const subtitle = {
  fontSize: "14px",
  color: "#aaa",
  marginBottom: "35px",
  textAlign: "center",
};

const form = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const label = {
  fontSize: "14px",
  color: "#ccc",
  fontWeight: "500",
};

const input = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  padding: "14px 16px",
  color: "white",
  fontSize: "15px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

const errorMsg = {
  color: "#f87171",
  fontSize: "14px",
  textAlign: "center",
  margin: 0,
};

const btn = {
  background: "linear-gradient(45deg, #00bcd4, #008394)",
  border: "none",
  borderRadius: "10px",
  padding: "15px",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
  transition: "opacity 0.3s ease",
};

export default Login;