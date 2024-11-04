import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';
import fetchData from '../utils/fetchData'; // Asegúrate de poner la ruta correcta

const ProjectSearch = () => {
  const [query, setQuery] = useState(''); // Estado para la búsqueda
  const [projects, setProjects] = useState([]); // Estado para los resultados

  const handleSearch = async () => {
    // Llamar a fetchData con la consulta
    const results = await fetchData(query);
    setProjects(results || []); // Actualizar el estado con los resultados
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Buscar proyecto por ID"
        value={query}
        onChangeText={setQuery}
        keyboardType="numeric" // Opcional, solo si buscas por ID
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
      />
      <Button title="Buscar" onPress={handleSearch} />
      
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()} // Asegúrate de que id es un número
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.titulo}</Text>
            <Text>{item.descripcion}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No se encontraron proyectos.</Text>}
      />
    </View>
  );
};

export default ProjectSearch;
