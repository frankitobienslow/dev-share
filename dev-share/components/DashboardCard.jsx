import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext'; // Asegúrate de que el contexto esté bien importado

const DashboardCard = ({ title, icon, link, role }) => {
  const { user } = useUser(); // Obtener el usuario del contexto

  // Si se pasa un rol y el rol del usuario no coincide, no renderizar nada
  if (role && user?.rol !== role) {
    return null; // No renderiza la card si el rol no coincide
  }

  return (
    <Pressable
      onPress={() => link && console.log("Navegar a: ", link)} // Aquí puedes redirigir con el link
      className="bg-white rounded-lg shadow-lg p-4 flex-row items-center space-x-4 mb-4"
      style={{
        width: 200, // Ajusta el tamaño de la card
      }}
    >
      {/* Icono */}
      <View className="bg-gray-200 rounded-full p-3">
        <Ionicons name={icon} size={24} color="black" />
      </View>

      {/* Título */}
      <Text className="text-lg font-semibold">{title}</Text>
    </Pressable>
  );
};

export default DashboardCard;