import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../context/UserContext";
import ProyectoItem from "./ProyectoItem";

const ListaProyectos = ({ mostrarActivos }) => {
  const { user } = useUser();
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const fetchProyectos = async (mostrarActivos) => {
    setCargando(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/proyectos/usuario/${user.id}`,
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
        console.error("Error al obtener proyectos:", errorMessage);
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const proyectos = await response.json();

      // Condición basada en el rol
      const proyectosFiltrados = proyectos.filter((proyecto) => {
        if (user.rol === "desarrollador") {
          return proyecto.Equipo?.desarrolladores?.some(
            (desarrollador) =>
              desarrollador.EquipoDesarrollador?.activo === mostrarActivos
          );
        } else if (user.rol === "cliente") {
          // Mostrar solo "Finalizado" si mostrarActivos es false
          return mostrarActivos
            ? proyecto.etapaActual !== "Finalizado"
            : proyecto.etapaActual === "Finalizado";
        }
      });
      
      setProyectos(proyectosFiltrados);
    } catch (error){
      console.error("Error en fetchProyectos:", error);
      setError("Error al cargar los proyectos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProyectos(mostrarActivos);
    }
  }, [user, mostrarActivos]);

  if (cargando) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text className="text-red-500">{error}</Text>;
  }

  return (
    <ScrollView className="h-auto p-4">
      {/* Título basado en mostrarActivos */}
      <Text className={`text-center ${mostrarActivos ? "text-2xl font-bold text-blue-600 my-4" : "text-xl font-bold text-gray-500 my-4"}`}>
  {mostrarActivos ? "Proyectos Activos" : "Proyectos Históricos"}
</Text>

      {/* Mostrar mensaje si no hay proyectos */}
      {proyectos.length === 0 ? (
        <Text className="text-center">No hay proyectos disponibles.</Text>
      ) : (
        proyectos.map((proyecto) => (
          <ProyectoItem key={proyecto.id} proyecto={proyecto} />
        ))
      )}
    </ScrollView>
  );
};

export default ListaProyectos;