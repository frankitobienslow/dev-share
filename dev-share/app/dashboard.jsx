import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '../context/UserContext'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'expo-router';
import peticiones from '../components/Peticiones';
import Dev from '../components/Dev';
import Client from '../components/Client';

const Dashboard = () => {
  const { user } = useUser();  // Extraer el usuario del UserContext
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const {datos,cargar,error} = peticiones("http://localhost:3000/api/usuarios");
  //const {datos,cargar,error} = peticiones("http://localhost:3000/api/usuarios");
  
  // LOGICA PARA SABER SI EL USUARIO ES CLIENTE O DESARROLLADOR
  let desarrollador = false;  // dato de prueba para hacer la logica del dashboard


  //let id = 2; // se tiene que recuperar del id del usuario ingresado. 
  // const {dev} = peticiones(`http://localhost:3000/api/usuarios/${id}`);
   //console.log(datos); 
  
  // Verificar si el usuario es desarrollador o cliente
  const esDesarrollador = user?.rol === 'desarrollador';  // El rol se toma del UserContext

  // Fetch de Mounted
  useEffect(() => {
    setIsMounted(true);

    // Redirigir al login si no hay usuario logueado
    if (isMounted && !user) {
      router.push('/login');
    }
  }, [isMounted, user]);

  if (!user) {
    return <Text className="text-center text-lg">Cargando...</Text>; // Muestra esto mientras se redirige o carga la info
  }

  if (cargar) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }

  return (
    <ScrollView style={{ height: 'auto' }}>
      <View>
        <Text style={styles.tituloPrincipal}>Bienvenido, {user.nombre}</Text>
      </View>
      
      {esDesarrollador ? (
        <View style={styles.espacio}>
          <Dev />  {/* Componente para desarrolladores */}
        </View>
      ) : (
        <View style={styles.espacio}>
          <Client />  {/* Componente para clientes */}
          <TouchableOpacity style={styles.boton} onPress={() => router.push('/proyecto')}>
            <Text style={{ fontSize: 20 }}>Publicar Oferta</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tituloPrincipal: {
    fontSize: 18,
    fontFamily: 'arial',
  },
  espacio: {
    padding: 10,
  },
  boton: {
    width: 150,
    borderColor: 'white',
    backgroundColor: '#075985',
    borderRadius: 5,
  },
});

export default Dashboard;