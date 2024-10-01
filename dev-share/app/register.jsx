import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";

// Esquema de validación usando Yup
const RegisterSchema = Yup.object().shape({
  dni: Yup.string()
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .required("El DNI es obligatorio"),
  nombre: Yup.string().required("El nombre es obligatorio"),
  apellido: Yup.string().required("El apellido es obligatorio"),
  email: Yup.string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Repetir la contraseña es obligatorio"),
  userType: Yup.string()
    .oneOf(["desarrollador", "cliente"], "Selecciona un tipo de usuario")
    .required("Selecciona un tipo de usuario"),
});

const Register = () => {
  const [registered, setRegistered] = useState(false);
  const router = useRouter();

  const handleRegister = async (values) => {
    console.log(values);
    try {
      const { userType, ...restoDeValores } = values;
      const urlBase = "http://localhost:3000/api/usuarios/";

      let response;
      if (userType === "desarrollador") {
        response = await fetch(urlBase + "desarrollador", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...restoDeValores, activo: true }), // Agrega activo por defecto
        });
      } else {
        response = await fetch(urlBase + "cliente", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(restoDeValores),
        });
      }

      const data = await response.json();
      if (response.status === 201) {
        setRegistered(true);
      } else {
        Alert.alert("Error", data.message || "Hubo un problema al registrar"); // Manejo de errores mejorado
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Hubo un problema con el registro");
    }
  };

  if (registered) {
    return (
      <View className="flex-1 bg-blue-100 justify-center items-center p-4">
        <LinearGradient
          colors={["#4A90E2", "#0033A0"]}
          className="w-full h-full absolute top-0 left-0"
        />
        <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Registro Exitoso
        </Text>
        <Button
            text="Ir al dashboard"
            color={["#2E7D32", "#4CAF50"]}
            onPress={() => router.push("/dashboard")}
            width="w-3/4"
          />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-blue-100 justify-center items-center p-4">
      <LinearGradient
        colors={["#4A90E2", "#0033A0"]}
        className="w-full h-full absolute top-0 left-0"
      />
      <Formik
        initialValues={{
          dni: "",
          nombre: "",
          apellido: "",
          email: "",
          password: "",
          confirmPassword: "",
          userType: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Registrarse
            </Text>

            {/* Email Input */}
            <TextInput
              className="border border-gray-300 rounded-lg p-4 mb-1"
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            )}

            {/* DNI Input */}
            <TextInput
              className="border border-gray-300 rounded-lg p-4 mb-1"
              placeholder="DNI"
              placeholderTextColor="#888"
              keyboardType="numeric"
              onChangeText={handleChange("dni")}
              onBlur={handleBlur("dni")}
              value={values.dni}
            />
            {touched.dni && errors.dni && (
              <Text style={{ color: "red" }}>{errors.dni}</Text>
            )}

            {/* Nombre Input */}
            <TextInput
              className="border border-gray-300 rounded-lg p-4 mb-1"
              placeholder="Nombre"
              placeholderTextColor="#888"
              onChangeText={handleChange("nombre")}
              onBlur={handleBlur("nombre")}
              value={values.nombre}
            />
            {touched.nombre && errors.nombre && (
              <Text style={{ color: "red" }}>{errors.nombre}</Text>
            )}

            {/* Apellido Input */}
            <TextInput
              className="border border-gray-300 rounded-lg p-4 mb-1"
              placeholder="Apellido"
              placeholderTextColor="#888"
              onChangeText={handleChange("apellido")}
              onBlur={handleBlur("apellido")}
              value={values.apellido}
            />
            {touched.apellido && errors.apellido && (
              <Text style={{ color: "red" }}>{errors.apellido}</Text>
            )}

            {/* Contraseña Input */}
            <TextInput
              className="border border-gray-300 rounded-lg p-4 mb-1"
              placeholder="Contraseña"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}

            {/* Confirmar Contraseña Input */}
            <TextInput
              className="border border-gray-300 rounded-lg p-4 mb-1"
              placeholder="Repetir Contraseña"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
            )}

            {/* Selección de tipo de usuario */}
            <Text className="text-gray-800 mb-2">Tipo de usuario:</Text>
            <View className="flex-row mb-4">
              <Pressable
                className={`border rounded-lg p-4 mr-2 ${values.userType === "desarrollador" ? "bg-gray-200" : ""}`}
                onPress={() => handleChange("userType")("desarrollador")}
              >
                <Text className="text-center">Desarrollador</Text>
              </Pressable>
              <Pressable
                className={`border rounded-lg p-4 ${values.userType === "cliente" ? "bg-gray-200" : ""}`}
                onPress={() => handleChange("userType")("cliente")}
              >
                <Text className="text-center">Cliente</Text>
              </Pressable>
            </View>
            {touched.userType && errors.userType && (
              <Text style={{ color: "red" }}>{errors.userType}</Text>
            )}

            <Pressable
              className="bg-blue-500 rounded-lg p-4 mb-4"
              onPress={handleSubmit}
            >
              <Text className="text-white text-center text-lg font-semibold">
                Registrarse
              </Text>
            </Pressable>

            <Pressable onPress={() => router.push("/login")}>
              <Text className="text-blue-500 text-center text-sm">
                ¿Ya tienes una cuenta? Inicia sesión
              </Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;
