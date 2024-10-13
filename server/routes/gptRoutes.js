const express = require("express");
const router = express.Router();
const OpenAI = require('openai');
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Asegúrate de tener tu API Key en las variables de entorno
  });

// Ruta para enviar prompts a OpenAI
router.post('/', async (req, res) => {
  const userPrompt = req.body.prompt; // Capturamos el prompt del cuerpo de la solicitud

  if (!userPrompt) {
    return res.status(400).json({ error: "El prompt es requerido" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // O usa 'gpt-4' si está disponible
      messages: [{ role: 'user', content: userPrompt }],
    });

    const openAIResponse = response.choices[0].message.content;
    res.json({ response: openAIResponse }); // Enviar la respuesta al cliente
  } catch (error) {
    console.error("Error al conectar con OpenAI:", error);
    res.status(500).json({ error: "Error al conectar con OpenAI" });
  }
});

module.exports = router;