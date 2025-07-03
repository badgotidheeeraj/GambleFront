import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import apiClient from './api/apiClient'; // ✅ Your axios instance

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editableFields, setEditableFields] = useState({});

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get('/profile/');
      const data = response.data;
      console.log(data)
      setProfile(data);
      setEditableFields({
        address: data.address || '',
        date_of_birth: data.date_of_birth || '',
        phone_number: data.phone_number || '',
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await apiClient.patch('/profile/', editableFields);
      setProfile(response.data);
      Alert.alert('Success', 'Profile updated successfully.');
    } catch (err) {
      Alert.alert('Error', 'Failed to update profile.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>Unable to load profile</Text>
      </View>
    );
  }

  const {
    id,
    balance,
    is_verified,
    profile_picture,
  } = profile;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `http://127.0.0.1:8000${profile_picture}` }}
        style={styles.avatar}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Text style={styles.username}>User ID #{id}</Text>
        {is_verified && (
          <MaterialIcons name="verified" size={22} color="#4caf50" style={{ marginLeft: 6 }} />
        )}
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="phone" size={18} color="#007bff" style={{ marginRight: 6 }} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={editableFields.phone_number}
          onChangeText={(text) => setEditableFields({ ...editableFields, phone_number: text })}
        />
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="account-balance-wallet" size={18} color="#007bff" style={{ marginRight: 6 }} />
        <Text style={styles.infoText}>Balance: ₹{parseFloat(balance).toFixed(2)}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="location-on" size={18} color="#007bff" style={{ marginRight: 6 }} />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={editableFields.address}
          onChangeText={(text) => setEditableFields({ ...editableFields, address: text })}
        />
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="cake" size={18} color="#007bff" style={{ marginRight: 6 }} />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={editableFields.date_of_birth}
          onChangeText={(text) => setEditableFields({ ...editableFields, date_of_birth: text })}
        />
      </View>

      <Button title="Update Profile" onPress={handleUpdateProfile} />
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  infoText: {
    fontSize: 15,
    color: '#555',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 15,
    paddingVertical: 4,
    color: '#333',
  },
});
