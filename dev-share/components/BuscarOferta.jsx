import { useState } from 'react';
import { View, Text, TextInput, FlatList,TouchableOpacity, StyleSheet } from 'react-native';

const datosAleatorios=[
    {
        id:1, titulo:'bootstrap',
        id:2, titulo:'React',
        id:3, titulo:'Javascript',
        id:4, titulo: 'CSS',
        id:5, titulo:'PHP',
        id:6, titulo:'Phyton'
    }

];

/** BUSQUEDA -- ARMADO LOGICO */
const busqueda=()=>{
    const [consulta, setConsulta]=useState(''); // para gestionar la consulta en la barra de busqueda
    const [resultado,setResultado]=useState(datosAleatorios); // para relacionar el macheo entre la busqueda y los resultados

    const handleBusqueda = (texto)=> {
        setConsulta(texto);
        if(texto){
            const filtroResultado=datosAleatorios.filter(item=> item.titulo.toLocaleLowerCase().includes(texto.toLocaleLowerCase()));
            setResultado(filtroResultado);
        }// fin if 
        else{
            setResultado(datosAleatorios);
        }// fin else
    }// fin handleBusqueda

    const listarItem= ({item})=> (
        <TouchableOpacity style={styles.item}>
            <Text style={styles.titulo}> {item.titulo} </Text>
        </TouchableOpacity>
    );
    
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.busquedaInput}
                placeholder='buscando...'
                value={consulta}
                onChange={handleBusqueda}
            ></TextInput>
            <FlatList
                data={resultado}
                listarItem={listarItem}
                keyExtractor={item =>item.id}
                ListEmptyComponent={<Text style={styles.emptyText}> No hay resultados</Text>}
            ></FlatList>
        </View>
    ); // fin return

};// fin busqueda 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  busquedaInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  titulo: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default busqueda;
