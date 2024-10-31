import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const ListaHabilidades =(selectValue,onValueChange)=>{
    const [habilidades,setHabilidades]=useState([]);
    //const [habilidadSelect,setHabilidadeSelect]=useState('');
    
    useEffect(()=>{
        const getHabilidades = async ()=>{
            const token = await AsyncStorage.getItem("token");
            try{
                const resp = await fetch(`http://localhost:3000/api/skills`,{
                    method:'GET',
                    headers: {'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
                });
                const habilidadesData = await resp.json();
                console.log(habilidadesData);

                if (Array.isArray(habilidadesData)) {
                    setHabilidades(habilidadesData);
                  } else {
                    console.error("La respuesta no contiene un array de habilidades.");
                    setHabilidades([]); // Asegura que sea un array vacío si hay un error
                  }

            }// fin try
            catch(error){
                console.error('Error al obtener las habilidades',error);
            }
        }// fin getHailidades
        getHabilidades();
    },[]);

    return (
        <View>
            <Picker
            selectedValue={selectValue}
            onValueChange={onValueChange}
            >
                <Picker.Item label='Seleccione una habilidad' value='' />
                {habilidades.map((unaHab)=>
                <Picker.Item key={unaHab.nombre} label={unaHab.nombre} value={unaHab.nombre} />
                )}

            </Picker>
        </View>

    )


}; // fin componente

export default ListaHabilidades;