import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const UserProfile = ({
  firstname = 'Dheeraj',
  lastname = 'kumar singh chaudhary',
  email = 'user@example.com',
  avatarUrl = 'https://i.pravatar.cc/150?img=5',
  phone_number = '+91 9876543210',
  balance = 2500.75,
  is_verified = true,
  address = 'Lucknow, India',
  date_of_birth = '1998-05-15',
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: avatarUrl }}
        style={styles.avatar}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Text style={styles.username}>{firstname} {lastname}</Text>
        {is_verified && (
          <MaterialIcons name="verified" size={22} color="#4caf50" style={{ marginLeft: 6 }} />
        )}
      </View>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.infoRow}>
        <MaterialIcons name="phone" size={18} color="#007bff" style={{ marginRight: 6 }} />
        <Text style={styles.infoText}>{phone_number}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="account-balance-wallet" size={18} color="#007bff" style={{ marginRight: 6 }} />
        <Text style={styles.infoText}>Balance: ₹{balance.toLocaleString()}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="location-on" size={18} color="#007bff" style={{ marginRight: 6 }} />
        <Text style={styles.infoText}>{address}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="cake" size={18} color="#007bff" style={{ marginRight: 6 }} />
        <Text style={styles.infoText}>DOB: {date_of_birth}</Text>
      </View>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
    marginTop: 4,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 15,
    color: '#555',
  },
});
