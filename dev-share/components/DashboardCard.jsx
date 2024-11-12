import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext'; // Asegúrate de que el contexto esté bien importado
import { useRouter } from 'expo-router'; // Importa useRouter

const DashboardCard = ({ title, icon, link, role }) => {
  const { user } = useUser(); // Obtener el usuario del contexto
  const router = useRouter(); // Inicializar el enrutador

  // Si se pasa un rol y el rol del usuario no coincide, no renderizar nada
  if (role && user?.rol !== role) {
    return null; // No renderiza la card si el rol no coincide
  }

  return (
    <Pressable
      onPress={() => link && router.push(link)} // Redirigir usando el enrutador
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