import React, { useState } from 'react';
import { View, Text, Modal, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'; // Para manejar peticiones HTTP

const FeedbackModal = ({ visible, onClose, destino, idAutor, idDestino }) => {
  const [rating, setRating] = useState(0); // Valor de las estrellas seleccionadas
  const [detalle, setDetalle] = useState(''); // Comentario opcional

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Por favor selecciona una calificación de estrellas.");
      return;
    }

    try {
      // Petición POST para guardar el feedback en feedback_usuario
      await axios.post('http://localhost:3000/api/feedback', {
        id_feedback: rating, // Relacionar la calificación con la tabla feedback (de 1 a 5)
        id_autor: idAutor,
        id_destino: idDestino,
        detalle: detalle,
      });

      alert('Gracias por tu feedback!');
      onClose(); // Cerrar el modal tras el envío
    } catch (error) {
      console.error("Error al enviar el feedback:", error);
      alert("Hubo un problema al enviar el feedback. Intenta nuevamente.");
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white w-11/12 p-6 rounded-lg">
          <Text className="text-xl font-bold mb-4">¿Cómo calificarías tu experiencia con {destino}?</Text>

          {/* Sección de estrellas */}
          <View className="flex-row justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} onPress={() => setRating(star)}>
                <Ionicons
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={32}
                  color={star <= rating ? '#FFD700' : '#C0C0C0'} // Estrellas amarillas si están seleccionadas
                />
              </Pressable>
            ))}
          </View>

          {/* Input para el comentario opcional */}
          <TextInput
            placeholder="Escribe tu experiencia (opcional)"
            multiline
            numberOfLines={4}
            value={detalle}
            onChangeText={setDetalle}
            className="border border-gray-300 rounded-lg p-2 mb-4"
          />

          {/* Botón para enviar */}
          <Pressable
            onPress={handleSubmit}
            className="bg-blue-700 py-2 rounded-lg"
          >
            <Text className="text-white text-lg text-center">Enviar</Text>
          </Pressable>

          {/* Botón para cerrar el modal */}
          <Pressable onPress={onClose} className="mt-4">
            <Text className="text-center text-red-600">Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default FeedbackModal;