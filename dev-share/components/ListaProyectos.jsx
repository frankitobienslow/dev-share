import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useUser } from '../context/UserContext';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProyectoItem from './ProyectoItem'; // Importar el componente ProyectoItem

const ListaProyectos = () => {
  const { user } = useUser();
  const router = useRouter();
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [message, setMessage] = useState("");

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
      setMessage(`Error: ${error.message}`);
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
        <Text className="text-red-500">{message}</Text>
      ) : (
        proyectos.map((proyecto) => (
          <ProyectoItem key={proyecto.id} proyecto={proyecto} /> // Usar ProyectoItem
        ))
      )}
    </ScrollView>
  );
};

export default ListaProyectos;