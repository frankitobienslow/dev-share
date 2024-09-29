import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useUser } from '../context/UserContext'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'expo-router';

const Perfil = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  

  useEffect(() => {
    // Asegurarse de que el layout esté montado
    setIsMounted(true);

    // Redirigir solo cuando el layout esté montado y no haya un usuario logueado
    if (isMounted && !user) {
      router.push('/login');
    }
  }, [isMounted, user]);

  if (!user) {
    return <Text className="text-center text-lg">Cargando...</Text>; // Muestra esto mientras se redirige o carga la info
  }
  return (
    <View className="flex-1 justify-center items-center p-6 bg-gray-100">
      <Text className="text-3xl font-bold text-gray-900 mb-4">Perfil de Usuario</Text>
      <Text className="text-xl text-gray-700 mb-2">Nombre: {user.nombre}</Text>
      <Text className="text-xl text-gray-700 mb-6">Email: {user.email}</Text>
      <Text className="text-xl text-gray-700 mb-6">Rol:{user.rol}</Text>
    </View>
  );

};

export default Perfil;