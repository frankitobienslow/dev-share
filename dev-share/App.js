import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable} from 'react-native';

export default function App() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <StatusBar style="auto" />
    </View>
  );
}
