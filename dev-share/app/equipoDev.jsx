import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import PostulacionCard from '../components/PostulacionCard';


async function obtener(url,token) {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
  const response = await fetch(url, { method:'GET', headers});
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

const EquipoDev = () => {
  const [devs,setDevs]= useState({});
  const [proyecto, setProyecto]= useState({});
  const [reqHab, setReqHab] =useState({});
  const [req,setReq] = useState({});


  useEffect(()=>{
    const urlGeneral = 'http://localhost:3000/api/';

    const getPostulaciones = async ()=>{
      
      const urlPost = urlGeneral+'postulacion';
      const token = await AsyncStorage.getItem('token');
      //console.log(urlPost);
      /**********OBTENER LAS POSTULACIONES ***************** */
      const postulaciones = await obtener(urlPost,token);
      //console.log(postulaciones);
      const devReq = await Promise.all(postulaciones.map(async (unPost)=>{
        const urleDevs = urlGeneral+`usuarios/${unPost.id_desarrollador}`;
        const urlReqHab = urlGeneral+`requerimiento-habilidad/${unPost.id_requerimiento_habilidad}`;
        /**********OBTENER DEVS ***************** */
        const unDev = await obtener(urleDevs,token);
        const unReqHab = await obtener(urlReqHab,token);
        //console.log(unReqHab);
        return ({dev:unDev,req:unReqHab});
      }));


      // const token = await AsyncStorage.getItem('token');
      //   try{
      //     const resp = await fetch('http://localhost:3000/api/postulacion',{
      //       method:'GET',
      //       headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},

      //     });
      //     if(resp.ok){
      //       const datosPostulacion = await resp.json();
      //       const nameNivelHab=[];
      //       //console.log(datosPostulacion);
      //       // almacena los nombres de los desarrolladores 
      //       let id=0;
      //       for (const unPost of datosPostulacion){
      //         let dev=await getDevs(unPost);
      //         let nh = await getReqHab(unPost);
      //         let fila ={id:id,nombre:dev,nivel:nh[0],habilidad:nh[1]}
      //         nameNivelHab.push(fila);
      //         id++;
      //       }
      //       return nameNivelHab;
      //       //console.log(datosPostulacion[0].id_requerimiento_habilidad);
      //     }
      //   }
      //   catch(error){
      //     console.error('Error al obtener las postulaciones');
          
      //   }
      }// fin getPostulaciones
      const resultado =getPostulaciones();
      console.log(resultado); 
      
    // const getDevs = async (unPost)=>{
    //   const token = await AsyncStorage.getItem('token');
    //     try{
    //       //console.log(unPost.id_desarrollador);
    //       const respDevs = await fetch(`http://localhost:3000/api/usuarios/${unPost.id_desarrollador}`,{
    //         method:'GET',
    //         headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},

    //       });
    //       if(respDevs.ok){
    //         const datosDevs = await respDevs.json();
    //         //console.log(datosDevs);
    //         return datosDevs.nombre;
    //         //console.log(datosPostulacion[0].id_requerimiento_habilidad);
    //       }
    //     }
    //     catch(error){
    //       console.log(error);
    //       console.error('Error al obtener los desarrolladores');

    //     }
    // }// fin getDevs 





    // const getReqHab = async (unaPostulacion)=>{
    //   const token = await AsyncStorage.getItem('token');
    //   try{
    //     //console.log(unaPostulacion.id_requerimiento_habilidad);
    //     const respReqHab = await fetch(`http://localhost:3000/api/requerimiento-habilidad/${unaPostulacion.id_requerimiento_habilidad}`,{
    //       method:'GET',
    //       headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
    //     });
    //     if(respReqHab.ok){
    //       const datosReqHab = await respReqHab.json();
    //       //console.log(datosReqHab);
    //       //const nombresNiveles =[];
    //       //const nombresHabs =[];
    //         let nivel = await getNiveles(datosReqHab);
    //         let habs = await getHabilidades(datosReqHab);
    //       return [nivel,habs];
    //     }// fin if 
    //   }
    //   catch(error){
    //     console.error('Error al obtener los niveles por req-hab');
    //   }
    // }// fin getReqHab
    

    // const getNiveles =async (objReqH)=>{
    //     const token = await AsyncStorage.getItem('token');
    //     try{
    //       const respNivel = await fetch(`http://localhost:3000/api/niveles/${objReqH.id_nivel}`,{
    //         method:'GET',
    //         headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
    //       });
    //         const datosNivel = await respNivel.json();
    //         //console.log(datosNivel);
    //         const nombre = datosNivel.nombre;
    //         return nombre;
          
    //     }
    //     catch(error){
    //       console.error('Error al obtener los niveles por req-hab');
    //     }// fi catch
    // }// fin getNiveles

    // const getHabilidades =async (objReqH)=>{
    //     const token = await AsyncStorage.getItem('token');
    //     try{
    //       const respHab = await fetch(`http://localhost:3000/api/skills/${objReqH.id_habilidad}`,{
    //         method:'GET',
    //         headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
    //       });
    //         const datosHabs = await respHab.json();
    //         //console.log(datosNivel);
    //         const nombre = datosHabs.nombre;
    //         return nombre;
          
    //     }
    //     catch(error){
    //       console.error('Error al obtener los niveles por req-hab');
    //     }// fi catch
    // }// fin getNiveles

    //   // then se usa cuando una promesa esta fuera de la funcion async 
    //   getPostulaciones().then((devs)=>{
    //     setDevs(devs);
    //     //console.log(devs);
    //   });

    
  },[]);

  return (
    <ScrollView>
        <View className='bg-white p-6 shadow-lg opacity-90 border rounded-lg flex flex-row flex-wrap gap-4 w-2/3 self-center'> 
          <View className='flex-1'><Text className='text-center'>Nombre del Proyecto: </Text></View>
            <View className='flex-1'><Text className='text-center'>Descripcion: </Text></View>
            <View className='flex-1'><Text className='text-center'>Requerimiento: </Text></View>
            <View className='flex-1'><Text className='text-center'>Etapa: </Text></View>
        </View>

        <PostulacionCard
          name='pablo'
          habilidad='javascript'
        />
      
    </ScrollView>
  );
};

export default EquipoDev;