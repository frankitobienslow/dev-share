import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState(""); // Cambia 'dni' por 'email'
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Cambia 'dni' por 'email'
      });

      const data = await response.json();

      if (response.status === 200) {
        await AsyncStorage.setItem("token", data.token);
        Alert.alert("Login exitoso", `Bienvenido ${data.usuario.nombre}`);
        router.push("/dashboard"); // Redirigir a la página principal o dashboard
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema con la autenticación");
    }
  };

  return (
    <View className="flex-1 bg-blue-100 justify-center items-center p-4">
      <LinearGradient
        colors={["#4A90E2", "#0033A0"]}
        className="w-full h-full absolute top-0 left-0"
      />
      <View className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Iniciar Sesión
        </Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="Email" // Cambia el placeholder a "Email"
          placeholderTextColor="#888"
          keyboardType="email-address" // Cambia el tipo de teclado
          value={email} // Cambia 'dni' por 'email'
          onChangeText={setEmail} // Cambia 'setDni' por 'setEmail'
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-6"
          placeholder="Contraseña"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          className="bg-blue-500 rounded-lg p-4 mb-4"
          onPress={handleLogin}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Iniciar Sesión
          </Text>
        </Pressable>
        <Pressable onPress={() => router.push("/register")}>
          <Text className="text-blue-500 text-center text-sm">
            ¿No tienes una cuenta? Regístrate
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;