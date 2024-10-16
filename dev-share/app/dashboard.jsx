import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator,StyleSheet, TouchableOpacity} from 'react-native';
import { useUser } from '../context/UserContext'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'expo-router';
import peticiones from '../components/Peticiones';
import Dev from '../components/Dev';
import Client from '../components/Client';
//import Button from '../components/Button';

const Dashboard = () => {
  
  const { user } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const {datos,cargar,error} = peticiones("http://localhost:3000/api/usuarios");
  
  // LOGICA PARA SABER SI EL USUARIO ES CLIENTE O DESARROLLADOR
  let desarrollador = false;  // dato de prueba para hacer la logica del dashboard
  

  //let id = 2; // se tiene que recuperar del id del usuario ingresado. 
  // const {dev} = peticiones(`http://localhost:3000/api/usuarios/${id}`);
  // console.log(dev); 
  

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

  // console.log('Valor de cargar: '+cargar);
  console.log(datos);
  // console.log('Valor del error : '+error);

  if(cargar){
    return <ActivityIndicator size="large" color="#0000ff" />
      
  }

  if(error){
    return <Text style={{color:'red'}}>{error}</Text>
  }

  /** La idea seria hacer un renderizado condicional 
   * para mostrar contenido al desarrollador o al cliente
   */
  // return (
  //   <View>
  //     {desarrollador ? (<Text>1</Text>):(<Text>2</Text>)}
  //   </View>
  // );

  return (
    // <View className="flex-1 justify-center items-center p-6 bg-gray-100">
    //   <Text className="text-3xl font-bold text-gray-900 mb-4">Dashboard</Text>
    //   <Text className="text-xl text-gray-700 mb-2">Bienvenido, {user.nombre}</Text>
    // </View>
    <ScrollView style={{height:'auto'}}>
      <View>
        <Text style ={styles.tituloPrincipal}>Bienvenido , {user.nombre}</Text>
      </View>
      {desarrollador ? (
        <View style={styles.espacio}>
          <Dev></Dev>
        </View>

      ):(
          <View style={styles.espacio}>
            <Client></Client>
            <TouchableOpacity style={styles.boton} onPress={()=>router.push('/proyecto')}>
              <Text style={{fontSize:20}}>Publicar Oferta</Text>
            </TouchableOpacity>
          </View> 

      )}


    </ScrollView>
  ); // fin return 

};// fin dashboard 

const styles = StyleSheet.create({
  tituloPrincipal: {
    fontSize:'18',
    fontFamily:'arial',
  },
  espacio:{
    padding:10,
  },
  boton:{
    width:150,
    borderColor:'white',
    backgroundColor:'#075985',
    borderRadius:5,
  }

})


export default Dashboard;
