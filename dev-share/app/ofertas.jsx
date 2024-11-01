import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BuscarOferta from '../components/BuscarOferta'; // Asegúrate de que BuscarOferta también esté adaptado a React Native

const Ofertas = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ofertas</Text>
            <BuscarOferta />
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
});

export default Ofertas;