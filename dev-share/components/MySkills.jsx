import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { useUser } from "../context/UserContext";
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";

const MySkills = ({ handleRendirNuevamente, refresh }) => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [habilidades, setHabilidades] = useState({});
  const [niveles, setNiveles] = useState([]);
  const [filtro, setFiltro] = useState('validadas');
  const { user } = useUser();
  const router = useRouter();

  // Fetch de evaluaciones
  useEffect(() => {
    const fetchEvaluaciones = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("Token recuperado:", token);
  
        if (!token) {
          console.error("Token no encontrado");
          return;
        }
  
        const res = await fetch(`http://localhost:3000/api/tests/usuario/${user.id}`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
  
        console.log("Respuesta del fetch:", res);
  
        if (!res.ok) {
          console.error("Error en la solicitud:", res.status, res.statusText);
          return;
        }
  
        const data = await res.json();
        console.log("Datos recibidos:", data);
  
        if (Array.isArray(data)) {
          console.log("Datos de evaluaciones válidos:", data);
          setEvaluaciones(data);
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.error('Error en fetchEvaluaciones:', error);
      }
    };
  
    fetchEvaluaciones();
  }, [refresh]);

  // Fetch de habilidades
  useEffect(() => {
    const fetchHabilidades = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await fetch('http://localhost:3000/api/skills/', {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        const data = await res.json();
        console.log("Datos de habilidades recibidos:", data); // Debug de habilidades
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
        const token = await AsyncStorage.getItem("token");
        const res = await fetch('http://localhost:3000/api/niveles/', {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        const data = await res.json();
        console.log("Datos de niveles recibidos:", data); // Debug de niveles
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
    router.push({
      pathname: '/test',
      params: { id: idEvaluacion }
    });
  };
  
  return (
    <ScrollView className="flex-1 p-6 bg-gray-100">
      <Text className="text-3xl font-bold text-gray-900 mb-4">Mis Habilidades</Text>

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

      <View>
        {evaluacionesFiltradas.length > 0 ? (
          evaluacionesFiltradas.map((evaluacion, index) => {
            const habilidadNombre = habilidades[evaluacion.id_habilidad]?.nombre || 'Habilidad desconocida';
            const nivelNombre = niveles[evaluacion.id_nivel]?.nombre || 'Nivel desconocido';
            console.log(`Evaluación ${evaluacion.id}: Habilidad (${evaluacion.id_habilidad}): ${habilidadNombre}, Nivel (${evaluacion.id_nivel}): ${nivelNombre}`);
            
            return (
              <View key={index} className="mb-4 p-4 bg-white rounded shadow">
                <Text className="text-xl font-semibold text-gray-800">{habilidadNombre}</Text>
                <Text className="text-gray-600">Nivel: {nivelNombre}</Text>
                <Text className="text-gray-600">Puntaje: {evaluacion.resultado !== null ? evaluacion.resultado : 'Pendiente'}</Text>

                {evaluacion.fecha && (
                  <Text className="text-gray-600">Fecha: {new Date(evaluacion.fecha).toLocaleDateString()}</Text>
                )}

                {evaluacion.resultado === null ? (
                  <Pressable
                    onPress={() => handleRendir(evaluacion.id)}
                    className="bg-blue-500 rounded py-1 px-2 mt-2 self-start"
                  >
                    <Text className="text-white text-sm">Rendir</Text>
                  </Pressable>
                ) : (
                  evaluacion.resultado < 70 && (
                    <Pressable
                      onPress={() => handleRendir(evaluacion.id)}
                      className="bg-red-500 rounded py-1 px-2 mt-2 self-start"
                    >
                      <Text className="text-white text-sm">Rendir nuevamente</Text>
                    </Pressable>
                  )
                )}
              </View>
            );
          })
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