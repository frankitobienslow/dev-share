import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import { useUser } from '../context/UserContext'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'expo-router';
import Peticion from '../components/Peticiones';

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const {usuario,cargar,error} = Peticion("http://localhost:3000/api/usuarios");
  // PRUEBA DE OBTENER LOS DATOS DEL USUARIO DESDE LA BD

  // Fetch de Mounted
  useEffect(() => {
    // Asegurarse de que el layout esté montado
    setIsMounted(true);

    // Redirigir solo cuando el layout esté montado y no haya un usuario logueado
    if (isMounted && !user) {
      router.push('/login');
    }
  }, [isMounted, user]); // fin useEffect

  if (!user) {
    return <Text className="text-center text-lg">Cargando...</Text>; // Muestra esto mientras se redirige o carga la info
  }// fin if 

  console.log('Valor de cargar: '+cargar);
  console.log('Valor del usuario: '+usuario);
  console.log('Valor del error : '+error);

  if(cargar){
    return <ActivityIndicator size="large" color="#0000ff" />
      
  }

  if(error){
    return <Text style={{color:'red'}}>{error}</Text>
  }

  /** La idea seria hacer un renderizado condicional 
   * para mostrar contenido al desarrollador o al cliente
   */

  return (
    // <View className="flex-1 justify-center items-center p-6 bg-gray-100">
    //   <Text className="text-3xl font-bold text-gray-900 mb-4">Dashboard</Text>
    //   <Text className="text-xl text-gray-700 mb-2">Bienvenido, {user.nombre}</Text>
    // </View>
    <ScrollView style={{height:'auto'}}>
      <View>
        <Text style ={styles.tituloPrincipal}>Bienvenido , {user.nombre}</Text>
      </View>
      <View style={styles.container}>
        <View style = {styles.col1}>
          <Text style = {styles.titulo}> Ofertas Aplicadas  </Text>
          <Text style = {styles.titulo}> La idea seria que antes de poner las ofertas 
            y los proyectos, obtenga todos los usuarios y determine si el que ingreso
            es cliente o desarrollador para despues hacer un renderizado condicional
            y en base al rol poner lo que corresponda. 
            Cree el componente peticiones para hacer el llamado a la BD y obtener todos los 
            usuarios pero en la consola del navegador me da ususario indefinido   </Text>

        </View>
        <View style = {styles.col2}>
          <Text style = {styles.titulo}> Proyectos activos y pasados  </Text>
        </View>
      </View> 

    </ScrollView>
  ); // fin return 

};// fin dashboard 

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    padding:6,
    backgroundColor:'#cdc6c5',
    alignContent:'center',
    justifyContent:'center',
  },
  col1:{
    flex:1,
    backgroundColor:'#a5c8c2',
    justifyContent:'center',
    alignItems:'center',
    fontSize:12,
  },
  col2:{
    flex:1,
    backgroundColor:'#81e58d',
    justifyContent:'center',
    alignItems:'center',
    fontSize:12,

  },
  titulo:{
    fontWeight:'bold',
    fontFamily:'arial',
    color:'#000000',
    fontSize:'16',
  },
  tituloPrincipal:{
    fontSize:'100',
    justifyContent:'center',
    alignItems:'center',
  }
})

export default Dashboard;
