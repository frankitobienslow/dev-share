const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const usuarioRoutes = require('./routes/usuarioRoutes'); // Asegúrate de tener este archivo

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conecta a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuarioRoutes); // Rutas de usuario

// Ejemplo de ruta
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Manejar errores 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejar errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error del servidor' });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});