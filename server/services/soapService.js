const mysql = require('mysql2');
const soap = require('soap');
const fs = require('fs');
const path = require('path');

// Configura la conexión con la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'devshare_db'
});
// Define los métodos que expondrá el servicio SOAP
const soapService = {
  
  MyService: {
    MyServicePort: {
      getData: function (args, callback) {
        const query = 'SELECT * FROM proyecto WHERE id = ?'; // Filtra por ID
        db.query(query, [args.id], (error, results) => {
            if (error) {
                console.error('Error en la consulta:', error); // Log para depuración
                return callback({ error: 'Error en la consulta' });
            }
            return callback({ data: JSON.stringify(results) });
        });
    }
    }
  }
};

function startSOAPService(app) {
  const wsdlPath = path.join(__dirname, 'services.wsdl'); // Nueva ruta simplificada
  const wsdlXML = fs.readFileSync(wsdlPath, 'utf8'); // Lee el contenido del archivo WSDL

  soap.listen(app, '/wsdl', soapService, wsdlXML); // Usa el contenido del archivo
  console.log('Servicio SOAP corriendo en /wsdl');
}

module.exports = startSOAPService;
