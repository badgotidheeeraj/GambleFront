import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './api/apiClient';

const backgroundImage = {
  uri: 'https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true',
};

const Login = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (!username || !password || (!isLogin && !confirmPassword)) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      if (isLogin) {
        const response = await apiClient.post('login/', {
          username,
          password,
        });
        const { access_token } = response.data;
        await AsyncStorage.setItem('token', access_token);
        Alert.alert('Success', 'Logged in!');
        onLoginSuccess && onLoginSuccess();
      } else {
        await apiClient.post('/api/signup', {
          username,
          password,
          password_confirmation: confirmPassword,
        });
        Alert.alert('Success', 'Signed up! Please login.');
        setIsLogin(true);
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      const message = err.response?.data?.detail || err.response?.data?.message || 'Authentication failed';
      Alert.alert(isLogin ? 'Login Error' : 'Signup Error', message);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.wrapper}>
        <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="username"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
        />
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            textContentType="password"
          />
        )}
        <Button title={isLogin ? 'Login' : 'Sign Up'} onPress={handleSubmit} />
        <TouchableOpacity
          onPress={() => setIsLogin(!isLogin)}
          style={styles.switchBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.switchText}>
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    width: '90%',
    maxWidth: 350,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  switchBtn: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});
