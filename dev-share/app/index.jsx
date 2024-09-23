import React from 'react';
import { View, Text } from 'react-native'; // Asegúrate de que Text esté importado aquí
import { LinearGradient } from 'expo-linear-gradient'; // Para el gradiente de fondo
import { useRouter } from 'expo-router'; // Para la navegación
import { NativeWindStyleSheet } from "nativewind"; // Compatibilidad para React Native con NativeWind
import Button from '../components/Button';

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Home = () => {
  const router = useRouter(); // Para la navegación

  return (
    <View className="flex-1 bg-blue-100">
      <LinearGradient
        colors={['#4A90E2', '#0033A0']} // Gradiente de fondo
        className="w-full h-1/3 absolute top-0 left-0"
      />
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Bienvenido a DevShare
        </Text>
        <Text className="text-gray-600 text-center mb-8">
          Conéctate con otros desarrolladores y comparte tus ideas y proyectos.
        </Text>
        <Button
          text="Regístrate"
          color={['#2E7D32', '#4CAF50']}
          onPress={() => router.push('/register')}
          width="w-3/4"
          style={{ marginBottom: 16 }} // Margen entre botones
        />
        <Button
          text="Iniciar Sesión"
          color={['#1976D2', '#64B5F6']}
          onPress={() => router.push('/login')}
          width="w-3/4"
        />
      </View>
    </View>
  );
};

export default Home;