import React from 'react';
import { View,Text,StyleSheet} from 'react-native';
import TablaOferta from './TablaOferta';

//import {TablaOferta} from '../components/TablaOferta';



const Client =()=> {
    
  return (
    <View style={styles.container}>
    <View style = {styles.col1}>
      <Text style = {styles.titulo}> PUBLICACIONES DE OFERTA LABORAL   </Text>
      <TablaOferta></TablaOferta>

    </View>
    <View style = {styles.col2}>
      <Text style = {styles.titulo}> Otras cosas del Cliente  </Text>
    </View>
  </View> 
  ); // fin return 
}// fin function dev


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
  });

  export default Client;