import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useUser } from '../context/UserContext'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'expo-router';

const Dashboard = () => {
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
  // probando ......
  function fetchData(){
    const res = fetch('http:/localhost:3000/api/usarios/1');
    const data = res.json();
    console.log(data);
  }
  fetchData();

  return (
    <View className="flex-1 justify-center items-center p-6 bg-gray-100">
      <Text className="text-3xl font-bold text-gray-900 mb-4">Dashboard</Text>
      <Text> hola {user.dni}</Text>
      <Text className="text-xl text-gray-700 mb-2">Bienvenido, {user.nombre}</Text>
    </View>
  );
};

export default Dashboard;