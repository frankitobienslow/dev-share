const soap = require('soap');
const path = require('path');
const dbService = require('../services/dbService'); // Servicio para consultas a la BD

// Definición del servicio SOAP
const myService = {
  EvaluationService: { // Coincide con el WSDL
    EvaluationPort: {  // Coincide con el WSDL
      getEvaluation(args) { // La operación debe coincidir con la definida en el WSDL
        return dbService.getDeveloperEvaluation(args.developerId, args.skillId); // Procesa los argumentos correctamente
      }
    }
  }
};

// Ruta al archivo WSDL
const wsdlPath = path.resolve(__dirname, 'wsdl', 'myService.wsdl');

// Función para configurar el servicio SOAP en la app de Express
module.exports = (app) => {
  // Monta el servicio en la ruta /soap y verifica que el archivo WSDL esté accesible
  soap.listen(app, '/soap/evaluation', myService, wsdlPath, (err) => {
    if (err) {
      console.error("Error al montar el servicio SOAP:", err);
    } else {
      console.log("Servicio SOAP corriendo en http://localhost:3000/soap");
    }
  });
};
