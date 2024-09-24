import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useUser } from "../context/UserContext"; // Asegúrate de que la ruta sea correcta
import { useRouter } from "expo-router";
import SkillsForm from "../components/SkillsForm"; // Importa el SkillsForm

const Skills = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Asegurarse de que el layout esté montado
    setIsMounted(true);

    // Redirigir al login si el usuario no está autenticado
    if (isMounted && !user) {
      router.push("/login");
    }
  }, [isMounted, user]);

  if (!user) {
    return <Text className="text-center text-lg">Cargando...</Text>; // Muestra esto mientras redirige o carga la info
  }

  const skills = user?.skills || []; // Asume que las habilidades están en `user.skills`

  return (
    <ScrollView className="flex-1 p-6 bg-gray-100">
      <Text className="text-3xl font-bold text-gray-900 mb-4">Mis Habilidades</Text>
      {skills.length > 0 ? (
        skills.map((skill, index) => (
          <View key={index} className="mb-4 p-4 bg-white rounded shadow">
            <Text className="text-xl font-semibold text-gray-800">{skill.nombre}</Text>
            <Text className="text-gray-600">Nivel: {skill.nivel}</Text>
          </View>
        ))
      ) : (
        <Text className="text-gray-700">No tienes habilidades registradas aún.</Text>
      )}

      {/* Formulario para agregar nuevas habilidades */}
      <View className="mt-6">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Agregar Habilidades</Text>
        <SkillsForm />
      </View>
    </ScrollView>
  );
};

export default Skills;