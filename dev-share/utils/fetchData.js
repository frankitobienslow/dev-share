import axios from 'axios';

const fetchData = async (id) => {
  // Crear la solicitud XML
  const xmlData = `
    <?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://localhost:3000/wsdl">
        <soapenv:Header/>
        <soapenv:Body>
            <ws:getDataRequest>
                <id>${id}</id>
            </ws:getDataRequest>
        </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post('http://localhost:3000/wsdl', xmlData, {
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
