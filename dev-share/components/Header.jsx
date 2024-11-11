import React, { useState, useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { useUser } from "../context/UserContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { user, logout, loading } = useUser();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Estado para el hover
  const sidebarWidth = useRef(new Animated.Value(60)).current;

  // Verifica si el usuario está logueado y no está en las rutas excluidas
  const shouldDisplayLayout =
    user && !["/home", "/login", "/register"].includes(router.pathname);

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
    { label: "Inicio", route: "/dashboard", icon: "home-outline" },
    {
      label: "Ofertas",
      route: "/ofertas",
      icon: "briefcase-outline",
      showIf: user?.rol === "desarrollador",
    },
    { label: "Mi perfil", route: "/perfil", icon: "person-outline" },
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
        justifyContent: "flex-start", // Asegura que el contenido esté al inicio cuando se expanda
        alignItems: isExpanded ? "flex-start" : "center", // Centra solo cuando está contraída
      }}
      className="h-full bg-gray-900 p-4 shadow-lg"
    >
      {/* Botón de toggle para expandir y contraer la barra */}
      <Pressable
        onPress={toggleSidebar}
        className="absolute top-4 left-4" // Posiciona el botón en la parte superior
        style={{
          zIndex: 10, // Asegura que el botón esté encima de otros elementos
        }}
      >
        <Ionicons name="menu-outline" size={24} color="white" />
      </Pressable>

      {/* Mostrar saludo solo si la barra está expandida */}
      <Animated.Text
        style={{
          flexShrink: 1,
          marginLeft: 10,
          opacity: isExpanded ? 1 : 0,
          width: isExpanded ? 150 : 0, // El texto tiene ancho solo cuando la barra está expandida
          transition: "opacity 200ms ease-in-out",
          marginTop: 40,
          textAlign: "center", // Centra el saludo horizontalmente cuando está contraída
        }}
        className="text-white text-xl mb-6"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        Hola, {user.nombre} {user.apellido}
      </Animated.Text>

      {/* Opciones de navegación con texto */}
      <View
        className="mt-4 space-y-4"
        style={{ alignItems: isExpanded ? "flex-start" : "center" }}
      >
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
                
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex-row items-center rounded-lg transition-all duration-200"
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 8,
                  backgroundColor:
                    hoveredIndex === index
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  justifyContent: "center", // Centra los elementos dentro de cada opción
                }}
              >
                {/* Icono siempre visible */}
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

                {/* Mostrar texto solo si la barra está expandida */}
                {isExpanded && (
                  <Text
                    className="text-white text-base font-medium"
                    style={{
                      flexShrink: 1,
                      marginLeft: 10,
                      opacity: isExpanded ? 1 : 0,
                      width: isExpanded ? 150 : 0, // El texto tiene ancho solo cuando la barra está expandida
                      transition: "opacity 200ms ease-in-out",

                      marginLeft: 10,
                    }}
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
