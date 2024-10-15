import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Hook para obtener el ID desde los parámetros
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable); // Para poder usar las clases de Tailwind en Pressable
const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledButton = styled(Button);

const Test = () => {
  const { id } = useLocalSearchParams(); // Obtiene el ID del test desde los parámetros de la URL
  const [preguntas, setPreguntas] = useState([]); // Estado para almacenar las preguntas
  const [respuestas, setRespuestas] = useState({}); // Estado para almacenar las respuestas seleccionadas
  const [loading, setLoading] = useState(true); // Estado de carga mientras se obtienen las preguntas
  const [puntaje, setPuntaje] = useState(null); // Estado para almacenar el puntaje obtenido después de validar

  // Fetch para obtener las preguntas basadas en el ID del test
  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/gpt/generate-questions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }), // Solo pasamos el ID del test al backend
        });
        const data = await res.json();
        setPreguntas(data.preguntas); // Guardamos las preguntas recibidas en el estado
      } catch (error) {
        console.error('Error al generar el examen:', error); // Logueamos el error en caso de fallo
      } finally {
        setLoading(false); // Quitamos el estado de carga una vez completado
      }
    };

    fetchPreguntas(); // Llamamos a la función de fetch en el montaje del componente
  }, [id]); // Dependencia en el ID, si cambia el ID, se vuelve a llamar

  // Manejar la selección de respuestas
  const handleSelect = (preguntaIndex, opcion) => {
    setRespuestas(prev => ({
      ...prev,
      [preguntaIndex]: opcion, // Actualizamos la respuesta seleccionada para cada pregunta
    }));
  };

  // Función para enviar las respuestas al backend
  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/gpt/validate-answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, respuestasUsuario: respuestas }), // Enviamos el ID del test y las respuestas
      });

      const data = await res.json();
      setPuntaje(data.puntaje); // Guardamos el puntaje obtenido después de validar las respuestas
    } catch (error) {
      console.error('Error al validar el examen:', error); // Logueamos el error en caso de fallo
    }
  };

  if (loading) {
    // Mostrar un indicador de carga mientras se obtienen las preguntas
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <StyledScrollView className="p-5">
      {preguntas.length > 0 ? (
        preguntas.map((pregunta, index) => (
          <StyledView key={index} className="mb-5">
            <StyledText className="text-lg mb-2">{pregunta.pregunta}</StyledText>
            {pregunta.opciones.map((opcion, i) => (
              <StyledPressable
                key={i}
                onPress={() => handleSelect(index, opcion)} // Guardamos la opción seleccionada
                className={`p-4 rounded border ${
                  respuestas[index] === opcion ? 'bg-blue-200' : 'bg-white'
                } border-gray-300 my-1`}
              >
                <StyledText className="text-base">{opcion}</StyledText>
              </StyledPressable>
            ))}
          </StyledView>
        ))
      ) : (
        <StyledText>No se pudieron cargar las preguntas.</StyledText>
      )}

      {/* Botón para enviar respuestas */}
      <StyledButton title="Enviar respuestas" onPress={handleSubmit} />

      {/* Mostrar el puntaje una vez que se obtenga */}
      {puntaje !== null && (
        <StyledText className="text-lg mt-5">Puntaje obtenido: {puntaje}</StyledText>
      )}
    </StyledScrollView>
  );
};

export default Test;