import React, { useState, useRef, useEffect } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { useUser } from "../context/UserContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { user, logout, loading } = useUser();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarWidth = useRef(new Animated.Value(60)).current;

  // Verifica si el usuario está logueado y no está en las rutas excluidas
  const shouldDisplayLayout = user && !["/home", "/login", "/register"].includes(router.pathname);

  const toggleSidebar = () => {
    Animated.timing(sidebarWidth, {
      toValue: isExpanded ? 60 : 200,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const handleOptionPress = (path) => {
    router.push(path);
    if (isExpanded) toggleSidebar();
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    if (isExpanded) toggleSidebar();
  };

  if (loading) {
    return null;
  }

  const navigationOptions = [
    { label: "Mi perfil", route: "/perfil", icon: "person-outline" },
    {
      label: "Conocimientos",
      route: "/skills",
      icon: "school-outline",
      showIf: user?.rol === "desarrollador",
    },
    {
      label: "Ofertas",
      route: "/ofertas",
      icon: "briefcase-outline",
      showIf: user?.rol === "desarrollador",
    },
    {
      label: "Cerrar sesión",
      route: "/logout",
      icon: "log-out-outline",
      action: handleLogout,
    },
  ];

  // Si no está logueado o está en una de las rutas excluidas, no mostrar el layout
  if (!shouldDisplayLayout) {
    return null;
  }

  return (
    <Animated.View
      style={{
        width: sidebarWidth,
        justifyContent: 'flex-start', // Asegura que el contenido esté al inicio
        alignItems: 'center', // Centra horizontalmente los iconos
      }}
      className="h-full bg-gray-900 p-4 shadow-lg"
    >
      {/* Botón para expandir/contraer */}
      <Pressable onPress={toggleSidebar} className="mb-6">
        <Ionicons name="menu-outline" size={24} color="white" />
      </Pressable>

      {/* Opciones de navegación */}
      <View className="mt-4 space-y-4">
        {navigationOptions.map(
          (option, index) =>
            (option.showIf === undefined || option.showIf) && (
              <Pressable
                key={index}
                onPress={() =>
                  option.action
                    ? option.action()
                    : handleOptionPress(option.route)
                }
                className={`flex-row items-center rounded-lg transition-all duration-200 ${
                  isExpanded ? "hover:bg-gray-800" : ""
                }`}
                style={{ paddingVertical: 10, paddingHorizontal: 8 }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <Ionicons name={option.icon} size={24} color="white" />
                </View>

                {isExpanded && (
                  <Text
                    className="text-white text-base font-medium"
                    style={{ flexShrink: 1, marginLeft: 10 }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {option.label}
                  </Text>
                )}
              </Pressable>
            )
        )}
      </View>
    </Animated.View>
  );
};

export default Header;