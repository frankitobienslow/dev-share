import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TablaOferta = () => {
    //Estos datos tiene que salir de la BD de la tabla proyecto
  const data = [
    { id: 1, nombre: 'Oferta 1', descripcion: 'desc1' },
    { id: 2, nombre: 'Oferta 2', descripcion: 'desc2' },
    { id: 3, nombre: 'Oferta 3', descripcion: 'desc3' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.header, styles.cell]}>ID</Text>
        <Text style={[styles.header, styles.cell]}>Nombre de la Oferta</Text>
        <Text style={[styles.header, styles.cell]}>Descripcion</Text>
      </View>
      {data.map((item) => (
        <View key={item.id} style={styles.row}>
          <Text style={styles.cell}>{item.id}</Text>
          <Text style={styles.cell}>{item.nombre}</Text>
          <Text style={styles.cell}>{item.descripcion}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    margin:12,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
});

export default TablaOferta;