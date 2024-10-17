import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useUser } from "../context/UserContext"; // Asegúrate de la ruta
import AsyncStorage from "@react-native-async-storage/async-storage"; // Asegúrate de que esté importado

const Login = () => {
  const { login } = useUser(); // Usa el hook personalizado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      console.log("Intentando iniciar sesión con:", { email, password });
      
      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data); // Verificar la respuesta

      if (response.status === 200) {
        console.log("Inicio de sesión exitoso, guardando token...");
        
        await AsyncStorage.setItem("token", data.token);

        // Verificar si el token se guardó correctamente
        const tokenGuardado = await AsyncStorage.getItem("token");
        console.log("Token guardado correctamente:", tokenGuardado);

        // Asegúrate de que el objeto usuario contenga el rol
        const userData = {
          id: data.usuario.id, // O el campo correspondiente
          nombre: data.usuario.nombre,
          email: data.usuario.email,
          rol: data.usuario.rol, // Aquí se incluye el rol
          // Agrega otros campos que necesites
        };

        console.log("Usuario logueado:", userData); // Verificar datos del usuario
        login(userData); // Usa la función de login del contexto

        Alert.alert("Login exitoso", `Bienvenido ${data.usuario.nombre}`);

        console.log("Redirigiendo al dashboard...");
        router.push("/dashboard");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error("Error en la autenticación:", error.message);
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
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
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