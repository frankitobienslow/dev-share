import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const ProyectoCard = ({ proyecto }) => {
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

        {/* Mostrar roles requeridos */}
        {proyecto.roles && proyecto.roles.length > 0 && (
          <View className="mt-2">
            <Text className="text-sm font-semibold">Roles requeridos:</Text>
            <View className="flex flex-row flex-wrap">
              {proyecto.roles.map((rol, index) => (
                <Text key={index} className="text-sm mr-2">
                  {rol.nombre}
                </Text>
              ))}
            </View>
          </View>
        )}

        <Text className={`text-sm ${proyecto.disponible ? 'text-green-600' : 'text-red-600'}`}>
          Estado: {proyecto.disponible ? 'Activo' : 'Inactivo'}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProyectoCard;
