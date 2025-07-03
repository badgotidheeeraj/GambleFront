import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import Login from './Component/Login';
import Signup from './Component/Signup';
import AppLayout from './Component/AppLayout';
import Chat from './Component/Chat_Com';
import Profile from './Component/UserProfile';
import Deposit from './Component/Deposit';
import HomeScreen from './Component/HomeScreen';

import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const backgroundColor = isDarkMode ? 'black' : 'white';

  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor }}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Dashboard">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
        <Toast />
      </View>
    </NavigationContainer>
  );
};

const LoginScreen = ({ navigation }) => (
  <Login
    onSignupPress={() => navigation.navigate('Signup')}
    onLoginSuccess={() => navigation.replace('Dashboard')}
  />
);

const SignupScreen = ({ navigation }) => (
  <Signup onLoginPress={() => navigation.navigate('Login')} />
);

const DashboardScreen = () => {
  const [activeComponent, setActiveComponent] = useState('chat');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'chat':
        return <Chat />;
      case 'profile':
        return <Profile />;
      case 'deposit':
        return <Deposit />;
      case 'homescreen':
        return <HomeScreen />;
      default:
        return <Chat />;
    }
  };

  return (
    <AppLayout title={activeComponent.toUpperCase()} setActiveComponent={setActiveComponent}>
      {renderComponent()}
    </AppLayout>
  );
};

export default App;
