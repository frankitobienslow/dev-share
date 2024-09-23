import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user'); // Buscar el usuario en AsyncStorage
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Si lo encuentra, lo parsea y lo pone en el estado
        }
      } catch (error) {
        console.error("Error al cargar el usuario desde AsyncStorage:", error);
      } finally {
        setLoading(false); // Independientemente del resultado, dejamos de cargar
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (userData) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData)); // Almacena el usuario en AsyncStorage
      setUser(userData);
    } catch (error) {
      console.error("Error al guardar el usuario en AsyncStorage:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user'); // Elimina los datos del usuario en AsyncStorage
      setUser(null);
    } catch (error) {
      console.error("Error al eliminar el usuario de AsyncStorage:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};