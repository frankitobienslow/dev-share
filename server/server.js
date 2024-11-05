const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes");
const sequelize = require("./db.js");
const startSOAPService = require('./services/soapService');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Puerto para Express
const soapPort = 3001; // Puerto para el servicio SOAP

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Middleware para habilitar CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Usa el enrutador de routes.js
app.use("/api", routes); 

// Inicia el servidor SOAP en el puerto especificado
startSOAPService(soapPort);

// Manejar errores 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Manejar errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error del servidor" });
});

// Inicia el servidor Express
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});

// Verifica la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });
