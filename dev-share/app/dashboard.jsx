import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useUser } from "../context/UserContext"; // Asegúrate de que la ruta sea correcta
import { useRouter } from "expo-router";
import ListaProyectos from "../components/ListaProyectos"; // Importa el componente de Proyectos
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  const { user } = useUser(); // Extraer el usuario del UserContext
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  // const { datos, cargar, error } = peticiones(
  //   "http://localhost:3000/api/usuarios"
  // );

  const esDesarrollador = user?.rol === "desarrollador"; // El rol se toma del UserContext

  useEffect(() => {
    setIsMounted(true);

    if (isMounted && !user) {
      router.push("/login");
    }
  }, [isMounted, user]);

  if (!user) {
    return <Text className="text-center text-lg">Cargando...</Text>; // Muestra esto mientras se redirige o carga la info
  }

  // if (cargar) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  // if (error) {
  //   return <Text className="text-red-500">{error}</Text>;
  // }

  return (
    <ScrollView className="h-auto">
         <DashboardCard
        title="Proyectos"
        icon="briefcase-outline"
        link="/proyectos"
   // Cambiar por rol según el contexto
      />
        <DashboardCard
        title="Ofertas"
        icon="briefcase-outline"
        link="/ofertas"
        role="desarrollador" // Cambiar por rol según el contexto
      />
        <DashboardCard
        title="Postulaciones"
        icon="paper-plane-outline"
        link="/postulaciones"
        role="desarrollador" // Cambiar por rol según el contexto
      />
         <DashboardCard
        title="Conocimientos"
        icon="school-outline"
        link="/skills"
        role="desarrollador" // Cambiar por rol según el contexto
      />
      {/* Si es desarrollador, muestra contenido específico para desarrolladores */}
      {esDesarrollador ? (
        <View className="p-4">
          <ListaProyectos  mostrarActivos={true}/> {/* Mostrar lista de proyectos del usuario */}
          <ListaProyectos  mostrarActivos={false}/>{/* Mostrar lista de proyectos del usuario */}
        </View>
      ) : (
        <View className="p-4">
          <ListaProyectos  mostrarActivos={true}/> {/* Mostrar lista de proyectos del usuario */}
          <ListaProyectos  mostrarActivos={false}/> {/* Mostrar lista de proyectos del usuario */}
          {/* Botón "Publicar Oferta" */}
          <Pressable
            className="bg-blue-700 rounded-lg py-2 px-4 mt-4"
            onPress={() => router.push("/abm-proyecto")}
          >
            <Text className="text-white text-lg text-center">
            Nuevo proyecto
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default Dashboard;
