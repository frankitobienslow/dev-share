import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Button, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/UserContext';
import FeedbackModal from '../../components/FeedbackModal'; // Asegúrate de importar tu componente FeedbackModal

const Proyecto = () => {
  const { id } = useLocalSearchParams();
  const { user } = useUser();
  const [proyecto, setProyecto] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal
  const router = useRouter();

  const fetchProyecto = async () => {
    setCargando(true);
    try {
      const token = await AsyncStorage.getItem("token");
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
      setProyecto(data);
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
    // Mostrar el modal
    setModalVisible(true);
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

        {user?.rol === "desarrollador" && (
          <Button title="Renunciar" onPress={handleRenunciar} color="red" />
        )}

        {/* Modal de Feedback */}
        <FeedbackModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)} // Cerrar el modal
          destino={proyecto?.Cliente?.Usuario?.nombre || 'el proyecto'} // Nombre del cliente o proyecto
          idAutor={user?.id} // ID del usuario logueado
          idDestino={proyecto?.Cliente?.Usuario?.id} // ID del cliente
        />
      </View>
    </ScrollView>
  );
};

export default Proyecto;