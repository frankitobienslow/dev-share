import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Cambiar a useLocalSearchParams

const Test = () => {
  const { id } = useLocalSearchParams(); // Obtiene el id de la evaluación
  const [prompt, setPrompt] = useState(''); // Estado para el prompt
  const [response, setResponse] = useState(''); // Estado para la respuesta
  const [loading, setLoading] = useState(false); // Estado para indicar carga

  const handleSendPrompt = async () => {
    setLoading(true); // Activa el estado de carga

    try {
      const res = await fetch('http://localhost:3000/api/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }), // Envía el prompt
      });

      const data = await res.json();
      setResponse(data.response); // Guarda la respuesta de la API
    } catch (error) {
      console.error('Error enviando el prompt:', error);
    }

    setLoading(false); // Desactiva el estado de carga
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Examen para evaluación ID: {id}</Text>

      <TextInput
        value={prompt}
        onChangeText={setPrompt}
        placeholder="Escribe tu pregunta..."
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
      />

      <Button title="Enviar" onPress={handleSendPrompt} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      {response ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Respuesta de GPT:</Text>
          <Text style={{ fontSize: 16, marginTop: 10 }}>{response}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Test;