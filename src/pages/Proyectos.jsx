function Proyectos() {
  const proyectos = [
    { id: 1, img: "/img/casa1.jpg", nombre: "Remodelación sala" },
    { id: 2, img: "/img/casa2.jpg", nombre: "Diseño interior" },
    { id: 3, img: "/img/casa3.jpg", nombre: "Construcción" },
  ];

  return (
    <div style={{ padding: "60px" }}>
      <h1>Proyectos Realizados</h1>

      <div style={grid}>
        {proyectos.map((p) => (
          <div key={p.id}>
            <img src={p.img} style={{ width: "100%" }} />
            <p>{p.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
  gap: "20px"
};

export default Proyectos;
