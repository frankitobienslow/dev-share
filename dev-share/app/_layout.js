import React from 'react';
import { UserProvider } from '../context/UserContext'; // Asegúrate de que la ruta sea correcta
import { Stack } from 'expo-router'; // Para la navegación
import Header from '../components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Layout = () => {
  return (
    <UserProvider>
        <Header/>
      <Stack />
    </UserProvider>
  );
};

export default Layout;