import { useState,useEffect } from "react";

const peticiones = (url) =>{
    const [datos,setDatos] = useState(null);
    const [cargar,setCargar] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        // fetch(url)
        // .then(response=>response.json())
        // .then(data=>setDatos(data))
        // .then(setError(null))
        // .then(setCargar(true))
        // .catch(error=>setError(error))
        // .catch(setDatos(null))
        // .finally(setCargar(false));

        const obtenerDatos = async ()=>{
            try {
                setCargar(true);
                const respuesta = await fetch(url);
                setDatos(respuesta.data);
                setError(null);
                //console.log(respuesta);
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

    return {datos,cargar,error};

}// fin componente

export default peticiones;