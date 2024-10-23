import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Hook para obtener el ID y para la navegación
import { styled } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Test = () => {
  const { id } = useLocalSearchParams(); // Obtiene el ID del test desde los parámetros de la URL
  const [preguntas, setPreguntas] = useState([]); // Estado para almacenar las preguntas
  const [respuestas, setRespuestas] = useState({}); // Estado para almacenar las respuestas seleccionadas
  const [loading, setLoading] = useState(true); // Estado de carga mientras se obtienen las preguntas
  const [puntaje, setPuntaje] = useState(null); // Estado para almacenar el puntaje
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
  const [feedback, setFeedback] = useState(null); // Almacena el feedback del examen
  const router = useRouter(); // Para navegar de vuelta a /skill

  // Fetch para obtener las preguntas basadas en el ID del test
  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        // Obtener el token de AsyncStorage
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/api/gpt/generate-questions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Agregar el token a los headers
          },
          body: JSON.stringify({ id }), // Solo pasamos el ID del test al backend
        });

        if (!res.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

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

  // Enviar respuestas para validar el examen
  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Obtener el token

      const res = await fetch('http://localhost:3000/api/gpt/validate-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Agregar el token a los headers
        },
        body: JSON.stringify({
          id,
          respuestasUsuario: respuestas,
        }),
      });

      if (!res.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await res.json();
      setPuntaje(data.puntaje);

      // Mostrar modal con feedback
      const feedbackText =
        data.puntaje >= 70
          ? '¡Habilidad validada!'
          : 'No se cumplieron las expectativas de la evaluación';

      setFeedback(feedbackText);
      setModalVisible(true);
    } catch (error) {
      console.error('Error al enviar respuestas:', error);
    }
  };

  if (loading) {
    // Mostrar un indicador de carga mientras se obtienen las preguntas
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const PressableStyled = styled(Pressable);
  const TextStyled = styled(Text);

  // Mostrar las preguntas si están disponibles
  return (
    <View className="flex-1 p-4">
      <ScrollView className="select-none">
        {preguntas.length > 0 ? (
          preguntas.map((pregunta, index) => (
            <View key={index} className="mb-5">
              <TextStyled className="text-lg mb-3">{pregunta.pregunta}</TextStyled>
              {pregunta.opciones.map((opcion, i) => (
                <PressableStyled
                  key={i}
                  onPress={() => handleSelect(index, opcion)} // Guardamos la opción seleccionada
                  className={`p-4 rounded-lg mb-2 border ${
                    respuestas[index] === opcion ? 'bg-blue-200' : 'bg-white'
                  }`}
                >
                  <TextStyled className="text-base">{opcion}</TextStyled>
                </PressableStyled>
              ))}
            </View>
          ))
        ) : (
          <TextStyled>No se pudieron cargar las preguntas.</TextStyled>
        )}
      </ScrollView>

      <PressableStyled
        onPress={handleSubmit}
        className="mt-4 p-4 bg-blue-500 rounded-lg"
      >
        <TextStyled className="text-white text-center text-lg">Enviar respuestas</TextStyled>
      </PressableStyled>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-4/5 bg-white p-6 rounded-lg">
            <TextStyled className="text-lg font-bold text-center mb-2">
              {feedback}
            </TextStyled>
            <TextStyled className="text-center mb-4">
              Resultado: {puntaje}
            </TextStyled>

            <ScrollView>
              {preguntas.map((pregunta, index) => (
                <View key={index} className="mb-5">
                  <TextStyled className="font-bold mb-2">{pregunta.pregunta}</TextStyled>
                  <TextStyled
                    className={`${
                      respuestas[index] === pregunta.correcta
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    Tu respuesta: {respuestas[index]} -{' '}
                    {respuestas[index] === pregunta.correcta ? 'Correcta' : 'Incorrecta'}
                  </TextStyled>
                  {respuestas[index] !== pregunta.correcta && (
                    <TextStyled className="text-green-500">
                      Respuesta correcta: {pregunta.correcta}
                    </TextStyled>
                  )}
                </View>
              ))}
            </ScrollView>

            <PressableStyled
              onPress={() => router.replace('/skills')} // Navega de vuelta a /skills sin recargar la página
              className="mt-4 p-4 bg-blue-500 rounded-lg"
            >
              <TextStyled className="text-white text-center text-lg">Volver a habilidades</TextStyled>
            </PressableStyled>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Test;