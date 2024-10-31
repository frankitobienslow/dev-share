import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const Table = () => {
  const data = [
    { id: 1, col1: 'Row 1 Col 1', col2: 'Row 1 Col 2', col3: 'Row 1 Col 3' },
    { id: 2, col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3' },
    { id: 3, col1: 'Row 3 Col 1', col2: 'Row 3 Col 2', col3: 'Row 3 Col 3' },
    { id: 4, col1: 'Row 4 Col 1', col2: 'Row 4 Col 2', col3: 'Row 4 Col 3' },
    { id: 5, col1: 'Row 5 Col 1', col2: 'Row 5 Col 2', col3: 'Row 5 Col 3' },
  ];

  // Header component
  const TableHeader = () => (
    <View className="flex-row bg-gray-200">
      <View className="flex-1 p-3 border-r border-gray-300">
        <Text className="font-bold">Nombre</Text>
      </View>
      <View className="flex-1 p-3 border-r border-gray-300">
        <Text className="font-bold">Habilidad</Text>
      </View>
      <View className="flex-1 p-3">
        <Text className="font-bold">Rol</Text>
      </View>
    </View>
  );

  // Row component
  const TableRow = ({ item, isLastRow }) => (
    <View className={`flex-row ${isLastRow ? '' : 'border-b border-gray-300'}`}>
      <View className="flex-1 p-3 border-r border-gray-300">
        <Text>{item.col1}</Text>
      </View>
      <View className="flex-1 p-3 border-r border-gray-300">
        <Text>{item.col2}</Text>
      </View>
      <View className="flex-1 p-3">
        <Text>{item.col3}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView horizontal className="max-w-full">
      <View className="border border-gray-300 rounded-lg overflow-hidden mt-6">
        <View className='p-2 m-3'> 
            <Text>Lista de Desarrolladores para tu Poyecto</Text>
        </View>
        <TableHeader />
        {data.map((item, index) => (
          <TableRow 
            key={item.id} 
            item={item} 
            isLastRow={index === data.length - 1}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Table;