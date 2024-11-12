import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import ListaProyectos from '../components/ListaProyectos';
import DashboardCard from '../components/DashboardCard';

const Proyectos = () => {
  return (
    <View>
     <DashboardCard
        title="Nuevo proyecto"
        icon="create-outline"
        link="/abm-proyecto"
        role="cliente" // Cambiar por rol según el contexto
      />
    <ScrollView>
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-xl font-bold text-gray-800">Proyectos</Text>
      <ListaProyectos  mostrarActivos={true}/> {/* Mostrar lista de proyectos del usuario */}
      <ListaProyectos  mostrarActivos={false}/>{/* Mostrar lista de proyectos del usuario */}
    </View>
    </ScrollView>
    </View>
  );
};

export default Proyectos;