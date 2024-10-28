import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../context/UserContext";
import FeedbackModal from "../../components/FeedbackModal";
import AlertModal from "../../components/AlertModal"; // Importa AlertModal
import ListaRequerimientosHabilidad from "../../components/ListaRequerimientosHabilidad";

const Proyecto = () => {
  const { id } = useLocalSearchParams();
  const { user } = useUser();
  const [proyecto, setProyecto] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // Estado para FeedbackModal
  const [alertVisible, setAlertVisible] = useState(false); // Estado para AlertModal
  const router = useRouter();

  const fetchProyecto = async () => {
    setCargando(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/proyectos/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error al obtener el proyecto:", errorMessage);
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setProyecto(data);
    } catch (error) {
      console.error("Error fetching proyecto:", error.message);
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

  const handleRenunciar = async () => {
    try {
      // Suponiendo que tienes el id del equipo y el id del usuario
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/equipos/${proyecto?.Equipo?.id}/desarrolladores/${user.id}/renunciar`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Si la renuncia es exitosa, mostramos el FeedbackModal
        setModalVisible(true);
      } else {
        const errorData = await response.json();
        console.error("Error al renunciar:", errorData);
        // Manejar el error en la UI si es necesario
      }
    } catch (error) {
      console.error("Error al renunciar:", error);
      // Manejar el error en la UI si es necesario
    }
  };

  const handleFeedbackSuccess = () => {
    setAlertVisible(true); // Mostrar el AlertModal cuando el feedback es exitoso
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
        <Text className="text-lg font-bold text-center mb-4">
          {proyecto.titulo}
        </Text>
        <Text className="text-sm text-gray-600 mb-2">
          {proyecto.descripcion}
        </Text>
        <Text className="text-sm mb-2">
          Cliente:{" "}
          {proyecto.Cliente?.Usuario?.nombre +
            " " +
            proyecto.Cliente?.Usuario?.apellido || "Sin asignar"}
        </Text>
        <Text className="text-sm mb-2">
          Equipo: {proyecto.Equipo?.nombre || "Sin asignar"}
        </Text>
        <Text className={`text-sm mb-2`}>Estado: {proyecto.etapaActual}</Text>

        {user?.rol === "desarrollador" &&
          proyecto?.Equipo?.desarrolladores?.some(
            (dev) =>
              dev.id === user?.id && dev.EquipoDesarrollador?.activo === true // Verificación del estado activo
          ) && (
            <>
              <ListaRequerimientosHabilidad
                id_proyecto={proyecto.id}
                id_desarrollador={user.id}
              />
              <Button title="Renunciar" onPress={handleRenunciar} color="red" />
            </>
          )}
        {/* Modal de Feedback */}
        <FeedbackModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          destino={proyecto?.Cliente?.Usuario?.nombre || "el proyecto"}
          idAutor={user?.id}
          idDestino={proyecto?.Cliente?.id}
          onFeedbackSuccess={handleFeedbackSuccess} // Pasa la función para activar el AlertModal
        />

        {/* Modal de Alerta de éxito */}
        <AlertModal
          visible={alertVisible}
          onClose={() => {
            setAlertVisible(false); // Ocultar el modal
            router.push("/dashboard"); // Redirigir al dashboard
          }}
          message="¡Muchas gracias por registrar su experiencia!"
        />
      </View>
    </ScrollView>
  );
};

export default Proyecto;
