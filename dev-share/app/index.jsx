import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Para el gradiente de fondo
import { useRouter } from 'expo-router'; // Para la navegación

import { NativeWindStyleSheet } from "nativewind"; //<---Compatibilidad para React Native con NativeWind
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
        <Pressable
          className="bg-green-500 rounded-lg p-4 mb-4 w-3/4"
          onPress={() => router.push('/register')}
        >
          <Text className="text-white text-center text-lg font-semibold">Regístrate</Text>
        </Pressable>
        <Pressable
          className="bg-blue-500 rounded-lg p-4 w-3/4"
          onPress={() => router.push('/login')}
        >
          <Text className="text-white text-center text-lg font-semibold">Iniciar Sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;