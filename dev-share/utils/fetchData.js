import axios from 'axios';

const fetchData = async (id) => {
  // Crear la solicitud XML
  const xmlData = `
    <?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://localhost:3001/wsdl">
            <soapenv:Header/>
                    <soapenv:Body>
            <ws:GetDataRequest> <!-- Asegúrate de que este nombre coincida con el definido en el WSDL -->
                <id>${id}</id> <!-- Cambia el valor de ID según sea necesario -->
            </ws:GetDataRequest>
        </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post('http://localhost:3001/wsdl', xmlData, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    console.log('Datos recibidos:', response.data);

    // Parsear la respuesta SOAP
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');
    const data = xmlDoc.getElementsByTagName('data')[0].textContent;

    // Convertir de JSON string a objeto
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

export default fetchData;
