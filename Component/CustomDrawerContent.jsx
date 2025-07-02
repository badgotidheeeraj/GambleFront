// components/CustomDrawerContent.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomDrawerContent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🎯 Betco</Text>

      <DrawerItem icon="home" label="Home" onPress={() => navigation.navigate('Home')} />
      <DrawerItem icon="user" label="Profile" onPress={() => navigation.navigate('Profile')} />
      <DrawerItem icon="cog" label="Settings" onPress={() => navigation.navigate('Settings')} />

      <View style={styles.spacer} />
      <DrawerItem icon="sign-out" label="Logout" onPress={() => navigation.replace('Login')} />
    </View>
  );
};

const DrawerItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Icon name={icon} size={20} color="#333" style={styles.icon} />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 40,
    color: '#00bfa5',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  icon: {
    marginRight: 15,
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  spacer: {
    flex: 1,
  },
});

export default CustomDrawerContent;
