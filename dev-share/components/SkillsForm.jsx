import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const habilidadesDisponibles = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL']; // Ejemplo de habilidades
const nivelesDisponibles = ['Principiante', 'Intermedio', 'Avanzado']; // Ejemplo de niveles

const SkillsForm = () => {
  const [skills, setSkills] = useState([{ habilidad: '', nivel: '' }]);

  const handleSelectChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);

    // Si todos los campos de la última fila están completos, añadimos una nueva fila
    if (index === skills.length - 1 && newSkills[index].habilidad && newSkills[index].nivel) {
      setSkills([...skills, { habilidad: '', nivel: '' }]);
    }
  };

  const handleSubmit = () => {
    // Filtrar las habilidades y niveles que están completos antes de enviar
    const selectedSkills = skills.filter(skill => skill.habilidad && skill.nivel);
    console.log('Habilidades seleccionadas:', selectedSkills);
    // Aquí puedes hacer el POST de los datos seleccionados
  };

  return (
    <ScrollView className="p-4">
      <Text className="text-lg font-bold mb-4">Selecciona tus habilidades y niveles</Text>

      {skills.map((skill, index) => (
        <View key={index} className="mb-4">
          <Text className="mb-2">Habilidad:</Text>
          <View className="border border-gray-300 rounded mb-2">
            <Picker
              selectedValue={skill.habilidad}
              onValueChange={(value) => handleSelectChange(index, 'habilidad', value)}
            >
              <Picker.Item label="Selecciona una habilidad" value="" />
              {habilidadesDisponibles.map((habilidad, idx) => (
                <Picker.Item key={idx} label={habilidad} value={habilidad} />
              ))}
            </Picker>
          </View>

          <Text className="mb-2">Nivel:</Text>
          <View className="border border-gray-300 rounded">
            <Picker
              selectedValue={skill.nivel}
              onValueChange={(value) => handleSelectChange(index, 'nivel', value)}
            >
              <Picker.Item label="Selecciona un nivel" value="" />
              {nivelesDisponibles.map((nivel, idx) => (
                <Picker.Item key={idx} label={nivel} value={nivel} />
              ))}
            </Picker>
          </View>
        </View>
      ))}

      <Pressable
        className="bg-blue-500 py-2 rounded"
        onPress={handleSubmit}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgb(30, 58, 138)' : 'rgb(59, 130, 246)',
          },
        ]}
      >
        {({ pressed }) => (
          <Text className={`text-white text-center font-bold ${pressed ? 'opacity-70' : ''}`}>
            {pressed ? 'Enviando...' : 'Enviar'}
          </Text>
        )}
      </Pressable>
    </ScrollView>
  );
};

export default SkillsForm;