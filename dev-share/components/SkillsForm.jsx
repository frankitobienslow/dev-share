import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '../context/UserContext'; // Asegúrate de que la ruta sea correcta

const SkillsForm = ({ developerId }) => { // Asegúrate de pasar el ID del desarrollador como prop
  const [skills, setSkills] = useState([{ habilidad: '', nivel: '' }]);
  const [habilidadesDisponibles, setHabilidadesDisponibles] = useState([]);
  const [nivelesDisponibles, setNivelesDisponibles] = useState([]);
  const { user } = useUser();
  
  // Fetch para obtener habilidades y niveles desde la base de datos
  useEffect(() => {
    const fetchHabilidades = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/skills/');
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
  
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setHabilidadesDisponibles(data);
        } else {
          console.error("La respuesta no es un arreglo:", data);
        }
      } catch (error) {
        console.error('Error fetching habilidades:', error.message);
      }
    };

    const fetchNiveles = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/niveles/');
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setNivelesDisponibles(data);
        } else {
          console.error("La respuesta de niveles no es un arreglo:", data);
        }
      } catch (error) {
        console.error('Error fetching niveles:', error.message);
      }
    };
    
    fetchHabilidades();
    fetchNiveles();
  }, []);

  const handleSelectChange = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index][field] = value;
    setSkills(newSkills);

    // Si todos los campos de la última fila están completos, añadimos una nueva fila
    if (index === skills.length - 1 && newSkills[index].habilidad && newSkills[index].nivel) {
      setSkills([...skills, { habilidad: '', nivel: '' }]);
    }
  };

  const handleSubmit = async () => {
    const selectedSkills = skills.filter(skill => skill.habilidad && skill.nivel);
  
    if (selectedSkills.length === 0) {
      Alert.alert('Error', 'No se han seleccionado habilidades y niveles');
      return;
    }
  
    // La fecha actual en formato YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
  
    // Crear las evaluaciones
    const evaluacionesPromises = selectedSkills.map(async (skill) => {
      const id_habilidad = habilidadesDisponibles.find(h => h.nombre === skill.habilidad)?.id; // Busca el ID de la habilidad
      const id_nivel = nivelesDisponibles.find(n => n.nombre === skill.nivel)?.id; // Busca el ID del nivel
  
      if (id_habilidad && id_nivel) {
        try {
          const response = await fetch('http://localhost:3000/api/tests/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_desarrollador: user.id,
              id_habilidad,
              id_nivel,
              resultado: 100,
              fecha: currentDate,
            }),
          });
  
          if (!response.ok) {
            throw new Error(`Error al guardar la evaluación: ${response.statusText}`);
          }
  
          const evaluacion = await response.json();
          console.log('Evaluación guardada:', evaluacion);
        } catch (error) {
          console.error('Error en la creación de la evaluación:', error.message);
          Alert.alert('Error', `Error en la creación de la evaluación: ${error.message}`);
        }
      } else {
        console.error('ID de habilidad o nivel no encontrado');
      }
    });
  
    // Esperar a que todas las promesas se resuelvan
    await Promise.all(evaluacionesPromises);
  
    // Limpiar el formulario después de enviar
    setSkills([{ habilidad: '', nivel: '' }]);
    Alert.alert('Éxito', 'Evaluaciones enviadas correctamente');
  };

  const habilidadesFiltradas = (index) => {
    const habilidadesSeleccionadas = skills.map(skill => skill.habilidad);
    return habilidadesDisponibles.filter(habilidad => 
      !habilidadesSeleccionadas.includes(habilidad.nombre) || skills[index].habilidad === habilidad.nombre
    );
  };

  return (
    <ScrollView className="p-4">
      <Text className="text-lg font-bold mb-4">¿Qué sabes hacer?</Text>

      {skills.map((skill, index) => (
        <View key={index} className="mb-4">
          <Text className="mb-2">Habilidad:</Text>
          <View className="border border-gray-300 rounded mb-2">
            <Picker
              selectedValue={skill.habilidad}
              onValueChange={(value) => handleSelectChange(index, 'habilidad', value)}
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
              onValueChange={(value) => handleSelectChange(index, 'nivel', value)}
            >
              <Picker.Item label="Selecciona un nivel" value="" />
              {nivelesDisponibles.map((nivel, idx) => (
                <Picker.Item key={idx} label={nivel.nombre} value={nivel.nombre} />
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