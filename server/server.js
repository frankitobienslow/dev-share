const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors"); // Importar cors
const routes = require("./routes"); // Asegúrate de tener este archivo
const sequelize = require("./db.js");
const soapService = require("./soap/wsdl/soapService.js"); // Importar el servicio SOAP
const {createServer} =require('node:httpp');
const { Server } = require("socket.io");
const {join} = require('node:path');

dotenv.config();

const app1 = express();
const server = createServer(app1);
app1.get('/',(req,res)=>{res.sendFile(join(__dirname,'chatForm.html'))});
server.listen(3000,()=>{
  console.log('Servidr corriendo en puerto 3300');
})


const app = express();
const port = process.env.PORT || 3000;

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
    origin: "*", // Acepta solicitudes desde cualquier origen
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Usa el enrutador de routes.js para las rutas REST
app.use("/api", routes);

// Monta el servicio SOAP en una ruta específica
soapService(app); // Asegúrate de que soapService está configurado para recibir la instancia de Express

// Manejar errores 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});
app.post("/soap", (req, res) => {
  console.log("Solicitud recibida en /soap");
  res.send("Conexión SOAP establecida correctamente.");
});
// Manejar errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error del servidor" });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Conexión a la base de datos con Sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });
