import React from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Para el gradiente de fondo
import { useRouter } from 'expo-router'; // Para la navegación

const Login = () => {
  const router = useRouter(); // Para la navegación

  const handleLogin = () => {
    // Aquí puedes agregar la lógica para el inicio de sesión
    Alert.alert('Login button pressed');
  };

  return (
    <View className="flex-1 bg-blue-100 justify-center items-center p-4">
      <LinearGradient
        colors={['#4A90E2', '#0033A0']} // Gradiente de fondo
        className="w-full h-full absolute top-0 left-0"
      />
      <View className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesión</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="Correo electrónico"
          placeholderTextColor="#888"
          keyboardType="email-address"
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-6"
          placeholder="Contraseña"
          placeholderTextColor="#888"
          secureTextEntry
        />
        <Pressable
          className="bg-blue-500 rounded-lg p-4 mb-4"
          onPress={handleLogin}
        >
          <Text className="text-white text-center text-lg font-semibold">Iniciar Sesión</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/register')}>
          <Text className="text-blue-500 text-center text-sm">¿No tienes una cuenta? Regístrate</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;