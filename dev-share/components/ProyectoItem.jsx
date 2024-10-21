import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router'; // Importar useRouter para la navegación

const ProyectoItem = ({ proyecto }) => {
  const router = useRouter();

  const handlePress = () => {
    // Navegar a la ruta /proyecto/:id
    router.push(`/proyecto/${proyecto.id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <View className="border p-4 mb-4 rounded-lg bg-gray-100">
        <Text className="text-lg font-bold">{proyecto.titulo}</Text>
        <Text className="text-sm text-gray-600">{proyecto.descripcion}</Text>
        <Text className="text-sm">
          Cliente: {proyecto.Cliente?.Usuario?.nombre + ' ' + proyecto.Cliente?.Usuario?.apellido || 'Sin asignar'}
        </Text>
        <Text className="text-sm">Equipo: {proyecto.Equipo?.nombre || 'Sin asignar'}</Text>
        <Text className={`text-sm ${proyecto.disponible ? 'text-green-600' : 'text-red-600'}`}>
          Estado: {proyecto.disponible ? 'Activo' : 'Inactivo'}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProyectoItem;