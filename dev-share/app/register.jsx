import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const Register = () => {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState(''); // Nuevo estado para el email
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dni, nombre, apellido, email, password }), // Incluye el email en el cuerpo
      });

      const data = await response.json();
      console.log(response);
      if (response.status === 201) {
        Alert.alert('Registro exitoso', 'Usuario creado con éxito');
        router.push('/login'); // Redirigir al login después de registrarse
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Hubo un problema con el registro');
    }
  };

  return (
    <View className="flex-1 bg-blue-100 justify-center items-center p-4">
      <LinearGradient
        colors={['#4A90E2', '#0033A0']}
        className="w-full h-full absolute top-0 left-0"
      />
      <View className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">Registrarse</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="DNI"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={dni}
          onChangeText={setDni}
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="Nombre"
          placeholderTextColor="#888"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="Apellido"
          placeholderTextColor="#888"
          value={apellido}
          onChangeText={setApellido}
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="Email" // Nuevo campo para el email
          placeholderTextColor="#888"
          keyboardType="email-address" // Cambia el tipo de teclado a email
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-6"
          placeholder="Contraseña"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Pressable className="bg-blue-500 rounded-lg p-4 mb-4" onPress={handleRegister}>
          <Text className="text-white text-center text-lg font-semibold">Registrarse</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/login')}>
          <Text className="text-blue-500 text-center text-sm">¿Ya tienes una cuenta? Inicia sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Register;