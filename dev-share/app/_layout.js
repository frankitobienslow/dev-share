import React from 'react';
import { UserProvider } from '../context/UserContext';
import { Stack } from 'expo-router';
import Header from '../components/Header';
import { View } from 'react-native';

const Layout = () => {
  return (
    <UserProvider>
      <View className="flex-row h-full">
        <Header />
        <View className="flex-1">
          <Stack />
        </View>
      </View>
    </UserProvider>
  );
};

export default Layout;