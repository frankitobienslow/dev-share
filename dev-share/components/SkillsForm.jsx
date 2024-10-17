import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useUser } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SkillsForm = ({ onUpdateSkills }) => {
  const [skills, setSkills] = useState([{ habilidad: "", nivel: "" }]);
  const [habilidadesDisponibles, setHabilidadesDisponibles] = useState([]);
  const [nivelesDisponibles, setNivelesDisponibles] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para el botón de envío
  const [message, setMessage] = useState(""); // Estado para el mensaje de éxito o error
  const { user } = useUser();

  // Fetch para obtener habilidades y niveles desde la base de datos
  useEffect(() => {
    const fetchHabilidades = async () => {
      try {
        const token = await AsyncStorage.getItem("token");  // Recuperar el token
        const response = await fetch("http://localhost:3000/api/skills/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,  // Incluir el token
            "Content-Type": "application/json",
          }
        });
        
        // Debug: Muestra el estado de la respuesta y el cuerpo
        console.log("Response Status (Habilidades):", response.status);
        console.log("Response Headers (Habilidades):", response.headers);
        
        if (!response.ok) {
          const errorMessage = await response.text(); // Recuperar el mensaje de error del cuerpo
          console.error("Error al obtener habilidades:", errorMessage);
          throw new Error("No se pudo obtener las habilidades");
        }
        
        const data = await response.json();
        console.log("Habilidades recibidas:", data); // Debug: Muestra las habilidades recibidas
        setHabilidadesDisponibles(data);
      } catch (error) {
        console.error("Error fetching habilidades:", error.message);
        setMessage(`Error: ${error.message}`); // Mensaje de error
      }
    };
  
    const fetchNiveles = async () => {
      try {
        const token = await AsyncStorage.getItem("token");  // Recuperar el token
        const response = await fetch("http://localhost:3000/api/niveles/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,  // Incluir el token
            "Content-Type": "application/json",
          }
        });

        // Debug: Muestra el estado de la respuesta y el cuerpo
        console.log("Response Status (Niveles):", response.status);
        console.log("Response Headers (Niveles):", response.headers);
        
        if (!response.ok) {
          const errorMessage = await response.text(); // Recuperar el mensaje de error del cuerpo
          console.error("Error al obtener niveles:", errorMessage);
          throw new Error("No se pudo obtener los niveles");
        }

        const data = await response.json();
        console.log("Niveles recibidos:", data); // Debug: Muestra los niveles recibidos
        setNivelesDisponibles(data);
      } catch (error) {
        console.error("Error fetching niveles:", error.message);
        setMessage(`Error: ${error.message}`); // Mensaje de error
      }
    };
  
    fetchHabilidades();
    fetchNiveles();
  }, []);

  const handleSelectChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const selectedSkills = skills.filter(
      (skill) => skill.habilidad && (skill.nivel || skill.nivel === 0)
    );

    if (selectedSkills.length === 0) {
      setLoading(false);
      setMessage("Por favor selecciona habilidad y nivel.");
      return;
    }

    const evaluacionesPromises = selectedSkills.map(async (skill) => {
      const id_habilidad = habilidadesDisponibles.find(
        (h) => h.nombre === skill.habilidad
      )?.id;
      const id_nivel = nivelesDisponibles.find((n) => n.nombre === skill.nivel)?.id;

      if (id_habilidad !== undefined && id_nivel !== undefined) {
        try {
          const token = await AsyncStorage.getItem("token");  // Recuperar el token
          const response = await fetch("http://localhost:3000/api/tests/", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,  // Incluir el token
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_desarrollador: user.id,
              id_habilidad,
              id_nivel,
              resultado: null,
              fecha: null,
            }),
          });

          // Debug: Muestra el estado de la respuesta y el cuerpo
          console.log("Response Status (Enviar Skill):", response.status);
          console.log("Response Headers (Enviar Skill):", response.headers);
          
          if (!response.ok) {
            const errorMessage = await response.text(); // Recuperar el mensaje de error del cuerpo
            console.error("Error al guardar la habilidad:", errorMessage);
            throw new Error("Error al guardar la habilidad");
          }
        } catch (error) {
          console.error("Error al enviar:", error.message);
          setMessage(`Error al enviar: ${error.message}`);
          return; // Salir si hay un error
        }
      }
    });

    await Promise.all(evaluacionesPromises);

    // Aquí llamamos a la función de actualización
    onUpdateSkills();

    setLoading(false);
    setSkills([{ habilidad: "", nivel: "" }]);
    setMessage("Habilidad enviada correctamente y pendiente de validación.");
  };

  const habilidadesFiltradas = (index) => {
    const habilidadesSeleccionadas = skills.map((skill) => skill.habilidad);
    return habilidadesDisponibles.filter(
      (habilidad) =>
        !habilidadesSeleccionadas.includes(habilidad.nombre) ||
        skills[index].habilidad === habilidad.nombre
    );
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}>
      <View style={{ width: "90%", maxWidth: 400, padding: 20, backgroundColor: "#fff", borderRadius: 10, elevation: 5 }}>
        <Text className="text-lg font-bold mb-4 text-center">¿Qué sabes hacer?</Text>

        {skills.map((skill, index) => (
          <View key={index} className="mb-4">
            <Text className="mb-2">Habilidad:</Text>
            <View className="border border-gray-300 rounded mb-2">
              <Picker
                selectedValue={skill.habilidad}
                onValueChange={(value) => handleSelectChange(index, "habilidad", value)}
              >
                <Picker.Item label="Selecciona una habilidad" value="" />
                {habilidadesFiltradas(index).map((habilidad, idx) => (
                  <Picker.Item key={idx} label={habilidad.nombre} value={habilidad.nombre} />
                ))}
              </Picker>
            </View>

            <Text className="mb-2">Nivel:</Text>
            <View className="border border-gray-300 rounded">
              <Picker
                selectedValue={skill.nivel}
                onValueChange={(value) => handleSelectChange(index, "nivel", value)}
              >
                <Picker.Item label="Selecciona un nivel" value="" />
                {nivelesDisponibles.map((nivel, idx) => (
                  <Picker.Item key={idx} label={nivel.nombre} value={nivel.nombre} />
                ))}
              </Picker>
            </View>
          </View>
        ))}

        {message ? (
          <Text className="text-center text-green-600 mb-4">{message}</Text>
        ) : null}

        <Pressable
          className="bg-blue-500 py-2 rounded mt-4"
          onPress={handleSubmit}
          disabled={loading}
          style={({ pressed }) => [
            { backgroundColor: pressed ? "rgb(30, 58, 138)" : "rgb(59, 130, 246)" },
            loading ? { backgroundColor: "gray" } : {},
          ]}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-center font-bold">Enviar</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default SkillsForm;