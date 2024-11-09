import React, { useEffect, useState } from 'react';
import {ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const ListaNiveles =({onNivelSelect})=>{
    const [niveles,setNiveles]=useState([]);
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        const getNiveles = async ()=>{
            setLoading(true);
            try{
                const token = await AsyncStorage.getItem("token");
                const resp = await fetch(`http://localhost:3000/api/niveles`,{
                    method:'GET',
                    headers: {'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
                });
                const nivelesData = await resp.json();
                //console.log(nivelesData);

                if (Array.isArray(nivelesData)) {
                    setNiveles(nivelesData);
                  } else {
                    console.error("La respuesta no contiene un array de niveles.");
                    setNiveles([]); // Asegura que sea un array vacío si hay un error
                  }

            }// fin try
            catch(error){
                console.error('Error al obtener las niveles',error);
                setNiveles([]);
            }
            finally{
                setLoading(false);
            }
        }// fin getHailidades
        getNiveles();
    },[]);

    if(loading){
        return <ActivityIndicator size="small" color="#0000ff"></ActivityIndicator>
    }

    // console.log('Current niveles:', niveles);  // Check state
    // console.log('Selected value:', selectValue);  // Check props

    return (
        <>
            <Picker  onValueChange={onNivelSelect}>
                <Picker.Item label='Seleccione un Nivel' value=''></Picker.Item>
                {niveles.map((unNivel)=>(
                    <Picker.Item key={unNivel.id} label={unNivel.nombre} value={unNivel.id}></Picker.Item>
                ))}

            </Picker>
        </>

    )


}; // fin componente

export default ListaNiveles;