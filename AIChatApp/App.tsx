import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './global.css';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-blue-500 text-3xl font-bold">
        Hello AI-Chat App
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
