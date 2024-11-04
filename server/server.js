const express = require('express');
const startSOAPService = require('./services/soapService');

const app = express();
const PORT = process.env.PORT || 3000;

// Inicia el servicio SOAP
startSOAPService(app);

app.listen(PORT, () => {
  console.log(`Servidor Express ejecutándose en el puerto ${PORT}`);
});