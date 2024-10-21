import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useUser } from "../context/UserContext"; // Asegúrate de la ruta correcta
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient"; // Asegúrate de tener esta dependencia

const Header = () => {
  const { user, logout, loading } = useUser();
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);

  const handleProfilePress = () => {
    setShowOptions(prev => !prev); // Alterna el estado
  };

  const handleOptionPress = (path) => {
    router.push(path);
    setShowOptions(false); // Oculta opciones al seleccionar
  };

  const handleLogout = async () => {
    setShowOptions(false); // Oculta opciones al cerrar sesión
    await logout();
    router.push("/login");
  };

  if (loading) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#003366", "#006699"]} // Degradado de azul
      className="flex-col p-2"
    >
      <View className="flex-row justify-end">
        {user ? (
          <Pressable onPress={handleProfilePress}>
            <Text className="text-white text-lg font-bold">Perfil</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => router.push("/login")}>
            <Text className="text-white text-lg">Iniciar sesión</Text>
          </Pressable>
        )}
      </View>

      {/* Opciones desplegables */}
      {showOptions && (
        <View className="mt-2 pl-0 pt-2 flex-col items-end">
          <Pressable onPress={() => handleOptionPress("/perfil")}>
            <Text className="text-white text-lg">Mi perfil</Text>
          </Pressable>
          <Pressable onPress={() => handleOptionPress("/experiencia")}>
            <Text className="text-white text-lg">Experiencia</Text>
          </Pressable>
          {user && user.rol === "desarrollador" && (
            <Pressable onPress={() => handleOptionPress("/skills")}>
              <Text className="text-white text-lg">Conocimientos</Text>
            </Pressable>
          )}
          <Pressable onPress={handleLogout}>
            <Text className="text-white text-lg">Cerrar sesión</Text>
          </Pressable>
          <Pressable onPress={() => handleOptionPress("/ofertas")}>
            <Text className="text-white text-lg">Ofertas</Text>
          </Pressable>
        </View>
      )}
    </LinearGradient>
  );
};

export default Header;