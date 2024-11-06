import React from "react";
import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const FeedbackCard = ({ feedback }) => {
  return (
    <View className="w-[95%] mx-auto mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
    {/* Sección de estrellas */}
    <View className="flex-row mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= feedback.id_feedback ? "star" : "star-outline"}
          size={22}
          color={star <= feedback.id_feedback ? "#FFD700" : "#C0C0C0"} // Amarillo para estrellas seleccionadas, gris para no seleccionadas
        />
      ))}
    </View>
  
    {/* Descripción de la valoración */}
    <Text className="text-gray-700 mb-2">{feedback.Feedback.descripcion}</Text>
  
    {/* Detalle del feedback en cursiva y tono gris */}
    <Text className="text-gray-600 italic text-sm mb-3">"{feedback.detalle}"</Text>
  
    {/* Autor y fecha alineados a la derecha */}
    <View className="flex-row justify-end">
      <Text className="text-gray-500 text-xs">
        {feedback.Autor.nombre} {feedback.Autor.apellido} - {new Date(feedback.fecha).toLocaleDateString()}
      </Text>
    </View>
  </View>
  );
};