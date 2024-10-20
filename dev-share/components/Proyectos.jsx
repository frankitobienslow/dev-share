import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useUser } from '../context/UserContext';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de tener esto importado

const Proyectos = () => {
  const { user } = useUser();  
  const router = useRouter();
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [message, setMessage] = useState(""); // Estado para manejar mensajes

  const fetchProyectos = async () => {
    setCargando(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`http://localhost:3000/api/proyectos/usuario/${user.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error al obtener proyectos:", errorMessage);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProyectos(data);
    } catch (error) {
      console.error('Error fetching proyectos:', error.message);
      setMessage(`Error: ${error.message}`); // Actualiza el mensaje en caso de error
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProyectos();
    }
  }, [user]);

  return (
    <ScrollView className="h-auto p-4">
      <Text className="text-lg font-bold text-center mb-4">Tus Proyectos</Text>
      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : message ? (
        <Text className="text-red-500">{message}</Text> // Mostrar mensaje de error si existe
      ) : (
        proyectos.map((proyecto) => (
          <View key={proyecto.id} className="border p-4 mb-4 rounded-lg bg-gray-100">
            <Text className="text-lg font-bold">{proyecto.titulo}</Text>
            <Text className="text-sm text-gray-600">{proyecto.descripcion}</Text>
            <Text className="text-sm">Cliente: {proyecto.Cliente?.Usuario?.nombre + ' ' + proyecto.Cliente?.Usuario?.apellido || 'Sin asignar'}</Text>
            <Text className="text-sm">Equipo: {proyecto.Equipo?.nombre || 'Sin asignar'}</Text>
            {/* Agregar el estado del proyecto aquí */}
            <Text className={`text-sm ${proyecto.disponible ? 'text-green-600' : 'text-red-600'}`}>
              Estado: {proyecto.disponible ? 'Activo' : 'Inactivo'}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default Proyectos;