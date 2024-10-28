import React, { useEffect, useState } from "react";
import {
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListaRequerimientosHabilidad = ({ id_proyecto, id_desarrollador }) => {
  const [requerimientosHabilidad, setRequerimientosHabilidad] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const fetchRequerimientosHabilidad = async () => {
    setCargando(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/requerimiento-habilidad/${id_proyecto}/${id_desarrollador}`,
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
        console.error(
          "Error al obtener los requerimientos de habilidad:",
          errorMessage
        );
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setRequerimientosHabilidad(data);
    } catch (error) {
      console.error("Error fetching requerimientos habilidad:", error.message);
      setError(`Error: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  const handleFinalizado = async (
    idRequerimientoHabilidad,
    terminadoActual
  ) => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(idRequerimientoHabilidad);
      const response = await fetch(
        `http://localhost:3000/api/requerimiento-habilidad/${idRequerimientoHabilidad}/toggle-terminado`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          "Error al alternar el estado de terminado:",
          errorMessage
        );
        throw new Error(`Error HTTP: ${response.status}`);
      }

      // Actualiza el estado localmente después de alternar
      setRequerimientosHabilidad((prevState) =>
        prevState.map((req) =>
          req.id === idRequerimientoHabilidad
            ? { ...req, terminado: !terminadoActual }
            : req
        )
      );

      Alert.alert(
        "Éxito",
        `Requerimiento marcado como ${terminadoActual ? "pendiente" : "finalizado"}.`
      );
    } catch (error) {
      console.error("Error al alternar el estado de terminado:", error.message);
      Alert.alert("Error", "No se pudo alternar el estado de terminado.");
    }
  };

  useEffect(() => {
    if (id_proyecto && id_desarrollador) {
      fetchRequerimientosHabilidad();
    }
  }, [id_proyecto, id_desarrollador]);

  if (cargando) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        className="self-center my-4"
      />
    );
  }

  if (error) {
    return <Text className="text-red-500 text-center">{error}</Text>;
  }

  if (requerimientosHabilidad.length === 0) {
    return (
      <Text className="text-center text-gray-500">
        No hay requerimientos de habilidad disponibles.
      </Text>
    );
  }

  return (
    <ScrollView className="p-4">
      {requerimientosHabilidad.map((requerimiento, index) => (
        <Text key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
          <Text className="font-bold">Requerimiento:</Text>{" "}
          {requerimiento.nombreRequerimiento} {"\n"}
          <Text className="font-bold">Descripción del Requerimiento:</Text>{" "}
          {requerimiento.descripcionRequerimiento} {"\n"}
          <Text className="font-bold">Habilidad:</Text>{" "}
          {requerimiento.nombreHabilidad} {"\n"}
          <Text className="font-bold">Descripción de Habilidad:</Text>{" "}
          {requerimiento.descripcionHabilidad} {"\n"}
          <Text className="font-bold">Nivel:</Text> {requerimiento.nombreNivel}{" "}
          {"\n"}
          <Text className="font-bold">Etapa:</Text> {requerimiento.nombreEtapa}{" "}
          {"\n"}
          <Text className="font-bold">Terminado:</Text>{" "}
          {requerimiento.terminado ? "Sí" : "No"} {"\n"}
          {/* Botón para alternar el estado de terminado */}
          <Pressable
            onPress={() =>
              handleFinalizado(requerimiento.id, requerimiento.terminado)
            }
            className={`mt-2 p-2 rounded ${requerimiento.terminado ? "bg-yellow-500" : "bg-blue-500"}`}
          >
            <Text className="text-white text-center">
              {requerimiento.terminado
                ? "Marcar como Pendiente"
                : "Marcar como Finalizado"}
            </Text>
          </Pressable>
        </Text>
      ))}
    </ScrollView>
  );
};

export default ListaRequerimientosHabilidad;
