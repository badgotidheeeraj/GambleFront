// ...existing code from Componet/UserProfile.jsx...
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserProfile = ({ username = 'Dheeraj kumar singh chaudhary ', email = 'user@example.com', avatarUrl }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: avatarUrl || 'https://i.pravatar.cc/150?img=5' }}
        style={styles.avatar}
      />
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>{email}</Text>
      {/* Add more profile details here if needed */}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
});
