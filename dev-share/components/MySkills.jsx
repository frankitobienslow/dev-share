import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useUser } from "../context/UserContext";
import { useRouter } from 'expo-router'; // Importa useRouter para la navegación

const MySkills = ({ handleRendirNuevamente, refresh }) => {
  const [evaluaciones, setEvaluaciones] = useState([]); // Estado para evaluaciones
  const [habilidades, setHabilidades] = useState({});
  const [niveles, setNiveles] = useState([]);
  const [filtro, setFiltro] = useState('validadas'); // Estado para manejar filtro activo
  const { user } = useUser();
  const router = useRouter(); // Define useRouter

  // Fetch de evaluaciones
  useEffect(() => {
    const fetchEvaluaciones = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/tests/usuario/${user.id}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setEvaluaciones(data);
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.error('Error fetching evaluaciones:', error);
      }
    };

    fetchEvaluaciones();
  }, [refresh]);

  // Fetch de habilidades
  useEffect(() => {
    const fetchHabilidades = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/skills/');
        const data = await res.json();
        const habilidadesMap = data.reduce((map, habilidad) => {
          map[habilidad.id] = habilidad;
          return map;
        }, {});
        setHabilidades(habilidadesMap);
      } catch (error) {
        console.error('Error fetching habilidades:', error);
      }
    };

    fetchHabilidades();
  }, []);

  // Fetch de niveles
  useEffect(() => {
    const fetchNiveles = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/niveles/');
        const data = await res.json();
        setNiveles(data);
      } catch (error) {
        console.error('Error fetching niveles:', error);
      }
    };

    fetchNiveles();
  }, []);

  // Filtrar evaluaciones
  const evaluacionesFiltradas = filtro === 'validadas'
    ? evaluaciones.filter(evaluacion => evaluacion.resultado >= 70)
    : evaluaciones.filter(evaluacion => evaluacion.resultado < 70 || evaluacion.resultado === null);

  // Función que redirige a la página de test con el id de la evaluación
  const handleRendir = (idEvaluacion) => {
    // Redirige a la pantalla de examen pasando el ID de la evaluación
    router.push({
      pathname: '/test', // Asegúrate que 'test' sea la ruta correcta
      params: { id: idEvaluacion }
    });
  };

  return (
    <ScrollView className="flex-1 p-6 bg-gray-100">
      <Text className="text-3xl font-bold text-gray-900 mb-4">Mis Habilidades</Text>

      {/* Botones para alternar entre Validadas y Pendientes */}
      <View className="flex-row mb-4">
        <Pressable
          onPress={() => setFiltro('validadas')}
          className={`px-4 py-2 rounded ${filtro === 'validadas' ? 'bg-blue-500' : 'bg-gray-300'}`}
        >
          <Text className="text-white">Validadas</Text>
        </Pressable>
        <Pressable
          onPress={() => setFiltro('pendientes')}
          className={`ml-2 px-4 py-2 rounded ${filtro === 'pendientes' ? 'bg-blue-500' : 'bg-gray-300'}`}
        >
          <Text className="text-white">Pendientes</Text>
        </Pressable>
      </View>

      {/* Mostrar lista de habilidades filtradas */}
      <View>
        {evaluacionesFiltradas.length > 0 ? (
          evaluacionesFiltradas.map((evaluacion, index) => (
            <View key={index} className="mb-4 p-4 bg-white rounded shadow">
              <Text className="text-xl font-semibold text-gray-800">
                {habilidades[evaluacion.id_habilidad]?.nombre || 'Habilidad desconocida'}
              </Text>
              <Text className="text-gray-600">Nivel: {niveles[evaluacion.id_nivel]?.nombre || 'Nivel desconocido'}</Text>
              <Text className="text-gray-600">Puntaje: {evaluacion.resultado !== null ? evaluacion.resultado : 'Pendiente'}</Text>

              {/* Mostrar fecha de evaluación si no es null */}
              {evaluacion.fecha && (
                <Text className="text-gray-600">Fecha: {new Date(evaluacion.fecha).toLocaleDateString()}</Text>
              )}

              {/* Lógica para mostrar botones de rendir o rendir nuevamente */}
              {evaluacion.resultado === null ? (
                <Pressable
                  onPress={() => handleRendir(evaluacion.id)} // Redirigir a examen
                  className="bg-blue-500 rounded py-1 px-2 mt-2 self-start"
                >
                  <Text className="text-white text-sm">Rendir</Text>
                </Pressable>
              ) : (
                evaluacion.resultado < 70 && (
                  <Pressable
                    onPress={() => handleRendir(evaluacion.id)} // Redirigir a examen
                    className="bg-red-500 rounded py-1 px-2 mt-2 self-start"
                  >
                    <Text className="text-white text-sm">Rendir nuevamente</Text>
                  </Pressable>
                )
              )}
            </View>
          ))
        ) : (
          <Text className="text-gray-700">
            {filtro === 'validadas' ? 'No hay habilidades validadas.' : 'No hay habilidades pendientes.'}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default MySkills;