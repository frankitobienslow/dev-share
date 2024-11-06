import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const CalendarificHolidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = '9KoFYgrHJaORZFri9X72iFpXJDySHKg0';  // Reemplaza con tu clave de API
  const country = 'AR';  // Código del país (por ejemplo, "AR" para Argentina)
  const year = 2024;  // Año para obtener los festivos

  // Llamada a la API de Calendarific
  useEffect(() => {
    fetch(`https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}&locale=es`)
      .then((response) => response.json())
      .then((data) => {
        setHolidays(data.response.holidays);  // Guarda los días festivos en el estado
        setLoading(false);  // Termina el estado de carga
      })
      .catch((error) => {
        console.error('Error fetching holidays:', error);
        setLoading(false);  // Termina el estado de carga aunque haya un error
      });
  }, []);

  // Muestra un cargando mientras se obtienen los datos
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading holidays...</Text>
      </View>
    );
  }

  // Renderiza los días festivos
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Días Festivos de {country} - {year}</Text>
      <FlatList
        data={holidays}
        keyExtractor={(item) => `${item.date.iso}-${item.name}`}  // Combina la fecha y el nombre como clave
        renderItem={({ item }) => (
          <View style={styles.holidayCard}>
            <Text style={styles.holidayName}>{item.name}</Text>
            <Text style={styles.holidayDate}>
              {item.date.datetime.month}/{item.date.datetime.day}/{item.date.datetime.year}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  holidayCard: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  holidayName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  holidayDate: {
    fontSize: 16,
    color: '#555',
  },
});

export default CalendarificHolidays;
