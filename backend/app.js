// Importar Express
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const cors = require("cors");

app.use(
  cors({
    //  Habilitar CORS
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor Express + Sequelize funcionando! 🚀");
});

// las rutas y probar cada una (aqui las llamo las routes)

// Endpoint de ejemplo
app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "Hola, mundo!" });
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/empresa", require("./routes/empresaRoutes"));
app.use("/api/asistencia-evento", require("./routes/asistencia_eventoRoutes"));
app.use("/api/cursos", require("./routes/cursosRoutes"));
app.use("/api/eventos", require("./routes/eventosRoutes"));
app.use("/api/feligres", require("./routes/feligresRoutes"));
app.use("/api/grupos", require("./routes/gruposRoutes"));
app.use("/api/hoja-dominical", require("./routes/hoja_dominicalRoutes"));
app.use("/api/qr-evento", require("./routes/qr_eventoRoutes"));
app.use("/api/servicios", require("./routes/serviciosRoutes"));
app.use("/api/suscripcion-curso", require("./routes/suscripcion_cursoRoutes"));
app.use("/api/suscripcion-grupo", require("./routes/suscripcion_grupoRoutes"));
app.use("/api/usuario", require("./routes/usuarioRoutes"));
app.use("/api/archivos-evento", require("./routes/archivos_eventoRoutes"));
app.use("/api/archivos-grupo", require("./routes/archivos_grupoRoutes"));
app.use("/api/login", require("./routes/authRoutes")); 
// Después de inicializar express

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
