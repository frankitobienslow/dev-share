import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import SkillsForm from '../components/SkillsForm';
import MySkills from '../components/MySkills';
import { useRouter } from "expo-router";
import { useUser } from '../context/UserContext'; 

const Skills = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [refreshMySkills, setRefreshMySkills] = useState(false); // Nuevo estado para refrescar
  
  useEffect(() => {
    setIsMounted(true);
    if (isMounted && !user) {
      router.push("/login");
    }
  }, [isMounted, user]);

  if (!user) {
    return <Text className="text-center text-lg">Cargando...</Text>;
  }

  const handleRendirNuevamente = (idEvaluacion) => {
    console.log('Rendir nuevamente para evaluación ID:', idEvaluacion);
  };

  // Esta es la nueva función que se llamará al enviar el formulario
  const handleUpdateSkills = () => {
    setRefreshMySkills(prev => !prev); // Cambiar el estado para forzar la actualización
  };

  return (
    <ScrollView className="flex-1 p-6 bg-gray-100">
      <MySkills handleRendirNuevamente={handleRendirNuevamente} refresh={refreshMySkills} />
      <View className="mt-6">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Agregar Habilidades</Text>
        {/* Pasamos la función de actualización a SkillsForm */}
        <SkillsForm onUpdateSkills={handleUpdateSkills} />
      </View>
    </ScrollView>
  );
};

export default Skills;