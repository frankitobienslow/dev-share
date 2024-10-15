import { useState,useEffect } from "react";

const peticiones = (url) =>{
    const [datos,setDatos] = useState({});
    const [cargar,setCargar] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{

        const obtenerDatos = async ()=>{
            try {
                setCargar(true);
                const respuesta = await fetch(url);
                let dato = await respuesta.json();
                setError(null);
                //console.log('ANTES', datos);
                setDatos(dato);
                //console.log('DESPUES', datos);
                
                //console.log('Datos recibidos:', JSON.stringify(dato, null, 2));
                console.log(datos);
            }
            catch (error){
                setError('Ocurrio un error al obtener los datos ');
                setDatos(null);
            }
            finally{
                setCargar(false);
            }
        }// fin obtener datos 
        obtenerDatos();
    },[]);



    return ({datos,cargar,error});

}// fin componente

export default peticiones;