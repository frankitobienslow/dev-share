const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Asegúrate de tener tu clave en el archivo .env

exports.generateQuestions = async (habilidad, nivel) => {
  const prompt = `Genera un JSON con 10 preguntas de opción múltiple sobre ${habilidad} para el nivel ${nivel}. 
  Cada pregunta debe tener 5 opciones de respuesta, una de las cuales puede o no ser la correcta, 
  incluyendo siempre la opción "Ninguna de las anteriores". Si ninguna de las respuestas es correcta, 
  indícalo en la clave "correcta". Las preguntas y opciones deben estar en español. 
  **Por favor, no incluyas ningún formato adicional como markdown o comillas invertidas**. 
  El JSON debe tener este formato:

  [
    {
      "pregunta": "Texto de la pregunta 1",
      "opciones": ["Opción 1", "Opción 2", "Opción 3", "Opción 4", "Ninguna de las anteriores"],
      "correcta": "Opción 3" // O si ninguna es correcta: "Ninguna de las anteriores"
    },
    // Y así hasta 10 preguntas.
  ]`;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const generatedData = response.data.choices[0].message.content;

    // Limpiar la respuesta de cualquier formato innecesario
    const cleanedData = generatedData.replace(/```json/g, '').replace(/```/g, '').trim();

    // Convertir la respuesta en un objeto JSON
    const preguntasJson = JSON.parse(cleanedData);

    return preguntasJson; // Devolvemos el JSON con las preguntas y respuestas correctas
  } catch (error) {
    console.error('Error al generar preguntas:', error);
    throw error;
  }
};