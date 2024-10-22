import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Button, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para gestionar el token de autenticación
import { useUser } from '../../context/UserContext'; // Asumiendo que tienes un UserContext para obtener el usuario

const Proyecto = () => {
  const { id } = useLocalSearchParams(); // Obtener el parámetro id desde la URL
  const { user } = useUser(); // Obtener el usuario logueado desde el contexto
  const [proyecto, setProyecto] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // Usar para la navegación

  const fetchProyecto = async () => {
    setCargando(true);
    try {
      const token = await AsyncStorage.getItem("token"); // Obtener el token del almacenamiento local
      const response = await fetch(`http://localhost:3000/api/proyectos/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error al obtener el proyecto:", errorMessage);
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setProyecto(data); // Guardar los datos del proyecto en el estado
    } catch (error) {
      console.error('Error fetching proyecto:', error.message);
      setError(`Error: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProyecto();
    }
  }, [id]);

  const handleRenunciar = () => {
    // Implementar la lógica para renunciar al proyecto
    Alert.alert("Renuncia", "Has renunciado al proyecto.");
  };

  const handleEditar = () => {
    // Redirigir a una página de edición del proyecto
    router.push(`/abm-proyecto/${id}`);
  };

  if (cargando) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text className="text-red-500">{error}</Text>;
  }

  if (!proyecto) {
    return <Text className="text-center">No se encontró el proyecto.</Text>;
  }

  return (
    <ScrollView className="h-auto p-4">
      <View>
        <Text className="text-lg font-bold text-center mb-4">{proyecto.titulo}</Text>
        <Text className="text-sm text-gray-600 mb-2">{proyecto.descripcion}</Text>
        <Text className="text-sm mb-2">Cliente: {proyecto.Cliente?.Usuario?.nombre + ' ' + proyecto.Cliente?.Usuario?.apellido || 'Sin asignar'}</Text>
        <Text className="text-sm mb-2">Equipo: {proyecto.Equipo?.nombre || 'Sin asignar'}</Text>
        <Text className={`text-sm mb-2 ${proyecto.disponible ? 'text-green-600' : 'text-red-600'}`}>
          Estado: {proyecto.disponible ? 'Activo' : 'Inactivo'}
        </Text>

        {/* Mostrar botón basado en el rol */}
        {user?.rol === "desarrollador" ? (
          <Button title="Renunciar" onPress={handleRenunciar} color="red" />
        ) : user?.rol === "cliente" ? (
          <Button title="Editar" onPress={handleEditar} color="blue" />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Proyecto;