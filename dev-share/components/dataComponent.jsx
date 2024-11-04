import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import fetchData from './path/to/fetchData';

const DataComponent = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData(id);
      setData(result);
    };

    getData();
  }, [id]);

  return (
    <View>
      {data ? (
        data.map((item) => (
          <Text key={item.id}>{item.titulo} - {item.descripcion}</Text> // Muestra los datos según tu estructura
        ))
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

export default DataComponent;
