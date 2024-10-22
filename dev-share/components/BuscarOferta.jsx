import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProyectoCard from './proyectoCard'; // Importa el componente de proyecto modificado para React Native
import Icon from 'react-native-vector-icons/FontAwesome'; // Instala react-native-vector-icons si no lo tienes: `npm install react-native-vector-icons`

const BuscarOferta = () => {
    const [proyectos, setProyectos] = useState([]);
    const [filtro, setFiltro] = useState('');

    // Función para obtener proyectos desde el backend con el filtro
    const obtenerProyectos = async (filtro = '') => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get('http://localhost:3000/api/proyectos/', {
                params: { filtro },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Datos de la API:', response.data);
            setProyectos(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error al obtener proyectos:', error.response || error.message);
        }
    };

    // Obtener todos los proyectos al montar el componente
    useEffect(() => {
        obtenerProyectos(); // Llama a la función sin filtro al inicio
    }, []);

    // Manejar cambio en el campo de búsqueda
    const manejarCambioBuscador = (valor) => {
        setFiltro(valor);
        obtenerProyectos(valor);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buscar Ofertas</Text>

            {/* Input para buscar por título o requerimiento */}
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Buscar por título o requerimiento..."
                    value={filtro}
                    onChangeText={manejarCambioBuscador} // Manejar el cambio en el input
                />
            </View>

            {/* Listado de proyectos */}
            <FlatList
                data={proyectos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ProyectoCard proyecto={item} />}
                ListEmptyComponent={<Text>No se encontraron proyectos.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        position: 'absolute',
        left: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 40, // Deja espacio para el icono
    },
});

export default BuscarOferta;
