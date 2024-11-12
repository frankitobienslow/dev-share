import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useUser } from "../../context/UserContext";
import { useRouter, useLocalSearchParams } from "expo-router";
import FeedbackContainer from "../../components/FeedbackContainer";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Perfil = () => {
  const { user } = useUser(); // Usuario logueado
  const router = useRouter();
  const { id } = useLocalSearchParams(); // ID del usuario desde la URL
  const [profileData, setProfileData] = useState(null); // Datos del perfil
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    if (!user) {
      setLoading(false); // Si no hay usuario logueado, no intentamos cargar el perfil
      return;
    }

    const fetchProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setLoading(false); // Si no hay token, no se hace la solicitud
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/api/usuarios/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProfileData(response.data); // Guardamos los datos del perfil
        console.log("Perfil obtenido:", response.data); // Verificación de datos
        console.log("ID del perfil:", id);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData(); // Llamada a la función de datos
  }, [id, user]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const isCurrentUserProfile = user.id === id; // Comparación con el usuario logueado

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6 bg-white shadow-md rounded-b-2xl mb-4">
        <Text className="text-xl font-semibold text-gray-800 text-center mb-2">
          {profileData?.nombre} {profileData?.apellido}
        </Text>
        <Text className="text-gray-500 text-center">
          {profileData?.biografia || "Este usuario no tiene una biografía."}
        </Text>
        
        {isCurrentUserProfile && (
          <Button
            title="Editar perfil"
            onPress={() => router.push("/perfil/editar")}
          />
        )}
      </View>

      <View className="flex-1 mt-4 px-4">
        <FeedbackContainer userId={id} />
      </View>
    </View>
  );
};

export default Perfil;