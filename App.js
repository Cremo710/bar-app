import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Importa i componenti delle schermate
import HomeScreen from './screens/HomeScreen';
import BarDetailScreen from './screens/BarDetailScreen';

// Crea lo stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#2F3542',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerBackTitle: 'Indietro',
          headerBackImage: () => (
            <Ionicons name="chevron-back" size={24} color="#2F3542" style={{ marginLeft: 8 }} />
          ),
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Bar nelle vicinanze',
            headerShown: true,
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen 
          name="BarDetail" 
          component={BarDetailScreen}
          options={({ route }) => ({ 
            title: route.params?.bar?.name || 'Dettagli',
            headerBackTitleVisible: false,
          })}
        />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
