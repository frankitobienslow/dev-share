import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProyectoCard = ({ proyecto }) => {

    // Función para postularse al proyecto
    const postularse = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.post('http://localhost:3000/api/postulacion', {
                id_desarrollador: 1,  // Reemplazar con el ID del desarrollador logueado
                id_requerimiento_rol: proyecto.id_requerimiento_rol // Debe coincidir con el requerimiento
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Postulación exitosa:', response.data);
        } catch (error) {
            console.error('Error al postularse:', error.response || error.message);
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{proyecto.titulo}</Text>
            <Text>{proyecto.descripcion}</Text>
            <Button title="Postularse" onPress={postularse} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default ProyectoCard;
