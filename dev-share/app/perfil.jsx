import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useUser } from "../context/UserContext";
import { useRouter } from "expo-router";
import FeedbackContainer from "../components/FeedbackContainer";

const Perfil = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (isMounted && !user) {
      router.push("/login");
    }
  }, [isMounted, user]);

  if (!user) {
    return <Text className="text-center text-lg">Cargando...</Text>;
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6 bg-white shadow-md  rounded-b-2xl mb-4">
        <Text className="text-xl font-semibold text-gray-800 text-center mb-2">
          {user.nombre}
        </Text>
        <Text className="text-gray-500 text-center">
          Soy un apasionado de la programación y la tecnología, con una sólida
          formación en desarrollo web y experiencia en soporte técnico en el
          sector de casinos. Mi objetivo es crecer como desarrollador freelance
          o contratado, idealmente en un entorno remoto y con la flexibilidad de
          cobrar en dólares. Me destaco por una comunicación fluida en inglés y
          un enfoque centrado en soluciones prácticas y eficientes. Busco
          oportunidades para contribuir en proyectos desafiantes, desarrollando
          aplicaciones de alta calidad que impulsen el éxito del equipo y la
          satisfacción del cliente.
        </Text>
      </View>

      <View className="flex-1 mt-4 px-4">
        <FeedbackContainer />
      </View>
    </View>
  );
};

export default Perfil;
