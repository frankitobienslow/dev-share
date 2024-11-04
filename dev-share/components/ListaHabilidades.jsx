import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const ListaHabilidades =({onHabilidadSelect,selectValue})=>{
    const [habilidades,setHabilidades]=useState([]);
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        const getHabilidades = async ()=>{
            setLoading(true);
            try{
                const token = await AsyncStorage.getItem("token");
                const resp = await fetch(`http://localhost:3000/api/skills`,{
                    method:'GET',
                    headers: {'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
                });
                const habilidadesData = await resp.json();
                //console.log(habilidadesData);

                if (Array.isArray(habilidadesData)) {
                    setHabilidades(habilidadesData);
                  } else {
                    console.error("La respuesta no contiene un array de habilidades.");
                    setHabilidades([]); // Asegura que sea un array vacío si hay un error
                  }

            }// fin try
            catch(error){
                console.error('Error al obtener las habilidades',error);
                setHabilidades([]);
            }
            finally{
                setLoading(false);
            }
        }// fin getHailidades
        getHabilidades();
    },[]);

    if(loading){
        return <ActivityIndicator size="small" color="#0000ff"></ActivityIndicator>
    }

    // console.log('Current habilidades:', habilidades);  // Check state
    // console.log('Selected value:', selectValue);  // Check props

    return (
        <>
            <Picker selectedValue={selectValue} onValueChange={onHabilidadSelect}>
                <Picker.Item label='Seleccione una Habilidad' value=''></Picker.Item>
                {habilidades.map((unHab)=>(
                    <Picker.Item key={unHab.id} label={unHab.nombre} value={unHab.id}></Picker.Item>
                ))}

            </Picker>
        </>

    )


}; // fin componente

export default ListaHabilidades;