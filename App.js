import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, useColorScheme } from 'react-native';
import React from 'react';
import Login from './Component/Login';
import Signup from './Component/Signup';
import AppLayout from './Component/AppLayout';
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

const DashboardScreen = () => (
  <AppLayout title="Dashboard">
    
  </AppLayout>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});