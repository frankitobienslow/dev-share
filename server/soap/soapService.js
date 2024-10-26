const soap = require('soap');
const path = require('path');
const dbService = require('./services/dbService'); // Servicio para consultas a la BD

// Definición del servicio SOAP
const myService = {
  MyDatabaseService: {
    MyDatabasePort: {
      getRecordById(args) {
        return dbService.getRecordById(args.id);
      },
      getAllRecords() {
        return dbService.getAllRecords();
      }
    }
  }
};

// Configuración del WSDL
const wsdlPath = path.resolve(__dirname, 'wsdl', 'myService.wsdl');

// Función para configurar el servicio SOAP en la app de Express
module.exports = (app) => {
  soap.listen(app, '/soap', myService, wsdlPath, () => {
    console.log('Servicio SOAP corriendo en http://localhost:3000/soap');
  });
};
