import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

const EquipoDev = () => {
  const [devs,setDevs]= useState([]);

  useEffect(()=>{
    const getPostulaciones = async ()=>{
      const token = await AsyncStorage.getItem('token');
        try{
          const resp = await fetch('http://localhost:3000/api/postulacion',{
            method:'GET',
            headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},

          });
          if(resp.ok){
            const datosPostulacion = await resp.json();
            const nameNivelHab=[];
            //console.log(datosPostulacion);
            // almacena los nombres de los desarrolladores 
            let id=0;
            for (const unPost of datosPostulacion){
              let dev=await getDevs(unPost);
              let nh = await getReqHab(unPost);
              let fila ={id:id,nombre:dev,nivel:nh[0],habilidad:nh[1]}
              nameNivelHab.push(fila);
              id++;
            }
            return nameNivelHab;
            //console.log(datosPostulacion[0].id_requerimiento_habilidad);
          }
        }
        catch(error){
          console.error('Error al obtener las postulaciones');
          
        }
      }// fin getPostulaciones 
      //getPostulaciones();

    const getDevs = async (unPost)=>{
      const token = await AsyncStorage.getItem('token');
        try{
          //console.log(unPost.id_desarrollador);
          const respDevs = await fetch(`http://localhost:3000/api/usuarios/${unPost.id_desarrollador}`,{
            method:'GET',
            headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},

          });
          if(respDevs.ok){
            const datosDevs = await respDevs.json();
            //console.log(datosDevs);
            return datosDevs.nombre;
            //console.log(datosPostulacion[0].id_requerimiento_habilidad);
          }
        }
        catch(error){
          console.log(error);
          console.error('Error al obtener los desarrolladores');

        }
    }// fin getDevs 





    const getReqHab = async (unaPostulacion)=>{
      const token = await AsyncStorage.getItem('token');
      try{
        //console.log(unaPostulacion.id_requerimiento_habilidad);
        const respReqHab = await fetch(`http://localhost:3000/api/requerimiento-habilidad/${unaPostulacion.id_requerimiento_habilidad}`,{
          method:'GET',
          headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
        });
        if(respReqHab.ok){
          const datosReqHab = await respReqHab.json();
          //console.log(datosReqHab);
          //const nombresNiveles =[];
          //const nombresHabs =[];
            let nivel = await getNiveles(datosReqHab);
            let habs = await getHabilidades(datosReqHab);
          return [nivel,habs];
        }// fin if 
      }
      catch(error){
        console.error('Error al obtener los niveles por req-hab');
      }
    }// fin getReqHab
    

    const getNiveles =async (objReqH)=>{
        const token = await AsyncStorage.getItem('token');
        try{
          const respNivel = await fetch(`http://localhost:3000/api/niveles/${objReqH.id_nivel}`,{
            method:'GET',
            headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
          });
            const datosNivel = await respNivel.json();
            //console.log(datosNivel);
            const nombre = datosNivel.nombre;
            return nombre;
          
        }
        catch(error){
          console.error('Error al obtener los niveles por req-hab');
        }// fi catch
    }// fin getNiveles

    const getHabilidades =async (objReqH)=>{
        const token = await AsyncStorage.getItem('token');
        try{
          const respHab = await fetch(`http://localhost:3000/api/skills/${objReqH.id_habilidad}`,{
            method:'GET',
            headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
          });
            const datosHabs = await respHab.json();
            //console.log(datosNivel);
            const nombre = datosHabs.nombre;
            return nombre;
          
        }
        catch(error){
          console.error('Error al obtener los niveles por req-hab');
        }// fi catch
    }// fin getNiveles

      // then se usa cuando una promesa esta fuera de la funcion async 
      getPostulaciones().then((devs)=>{
        setDevs(devs);
        //console.log(devs);
      });

    
  },[]);

  // Header component
  const TableHeader = () => (
    <View className="flex-row bg-gray-200">
      <View className="flex-1 p-3 border-r border-gray-300">
        <Text className="font-bold">Nombre</Text>
      </View>
      <View className="flex-1 p-3 border-r border-gray-300">
        <Text className="font-bold">Habilidad</Text>
      </View>
      <View className="flex-1 p-3">
        <Text className="font-bold">Nivel</Text>
      </View>
    </View>
  );

  // Row component
  const TableRow = ({ item, isLastRow }) => (
    <View className={`flex-row ${isLastRow ? '' : 'border-b border-gray-300'}`}>
      <View className="flex-1 p-3 border-r border-gray-300">
        <Text>{item.nombre}</Text>
      </View>
      <View className="flex-1 p-3 border-r border-gray-300">
        <Text>{item.habilidad}</Text>
      </View>
      <View className="flex-1 p-3">
        <Text>{item.nivel}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView horizontal className="max-w-full">
      <View className="border border-gray-300 rounded-lg overflow-hidden mt-6">
        <View className='p-2 m-3'> 
            <Text>Lista de Desarrolladores para tu Poyecto</Text>
        </View>
        <TableHeader />
        {devs.map((item, index) => (
          <TableRow 
            key={item.id} 
            item={item} 
            isLastRow={index === devs.length - 1}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default EquipoDev;