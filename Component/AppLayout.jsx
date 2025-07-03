import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const userProfilePic = 'https://i.pravatar.cc/100?img=5';



const USERS = [
  { id: 1, name: 'Alice Johnson', username: 'alicej', pic: 'https://i.pravatar.cc/100?img=1' },
  { id: 2, name: 'Bob Smith', username: 'bobsmith', pic: 'https://i.pravatar.cc/100?img=2' },
  { id: 3, name: 'Charlie Davis', username: 'charlied', pic: 'https://i.pravatar.cc/100?img=3' },
  { id: 4, name: 'David Wilson', username: 'davidw', pic: 'https://i.pravatar.cc/100?img=4' },
  { id: 5, name: 'Eve Thompson', username: 'evet', pic: 'https://i.pravatar.cc/100?img=5' },
];

const AppLayout = ({ title, children, setActiveComponent }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      // earch-users/?q="

      setDebouncedSearch(searchText.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    if (debouncedSearch === '') {
      setFilteredUsers([]);
      return;
    }

    setLoading(true);
    const filtered = USERS.filter(user =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.username.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setFilteredUsers(filtered);
    setLoading(false);
  }, [debouncedSearch]);

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => {
        setSearchText('');
        setFilteredUsers([]);
        setActiveComponent('chat');
        console.log('Selected user:', item);
      }}
    >
      <Image source={{ uri: item.pic }} style={styles.userPic} />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userUsername}>@{item.username}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.menuBtn} onPress={() => setShowMenu(prev => !prev)}>
            <Icon name="menu" size={28} color="#1a237e" />
          </TouchableOpacity>

          {title && <Text style={styles.title}>{title}</Text>}

          <View style={styles.searchWrapper}>
            <View style={styles.searchContainer}>
              <Icon name="search" size={18} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Search users..."
                value={searchText}
                onChangeText={setSearchText}
                returnKeyType="search"
                clearButtonMode="while-editing"
              />
            </View>

            {filteredUsers.length > 0 && (
              <View style={styles.searchResults}>
                {loading ? (
                  <Text>Loading...</Text>
                ) : (
                  <FlatList
                    data={filteredUsers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderUserItem}
                    keyboardShouldPersistTaps="handled"
                  />
                )}
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.avatarBtn} onPress={() => console.log('Avatar button pressed')}>
            <Image source={{ uri: userProfilePic }} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        {showMenu && (
          <View style={styles.leftMenuOverlay}>
            <View style={styles.leftMenuCard}>
              <Text style={styles.leftMenuHeading}>Menu</Text>

              <TouchableOpacity
                style={styles.leftMenuItem}
                onPress={() => {
                  setShowMenu(false);
                  setActiveComponent('homescreen');
                }}>
                <Icon name="trending-up" size={22} color="#4a90e2" style={styles.leftMenuIcon} />
                <Text style={styles.leftMenuText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.leftMenuItem}
                onPress={() => {
                  setShowMenu(false);
                  setActiveComponent('profile');
                }}>
                <Icon name="user" size={22} color="#4a90e2" style={styles.leftMenuIcon} />
                <Text style={styles.leftMenuText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.leftMenuItem}
                onPress={() => {
                  setShowMenu(false);
                  setActiveComponent('chat');
                }}>
                <Icon name="message-circle" size={22} color="#4a90e2" style={styles.leftMenuIcon} />
                <Text style={styles.leftMenuText}>Chat</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.leftMenuItem}
                onPress={() => {
                  setShowMenu(false);
                  setActiveComponent('deposit');
                }}>
                <Icon name="credit-card" size={22} color="#4a90e2" style={styles.leftMenuIcon} />
                <Text style={styles.leftMenuText}>Deposit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Container Layouts
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },

  // Header Section
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    zIndex: 100, // ensures it stays above overlay content
  },
  menuBtn: {
    padding: 6,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
    marginHorizontal: 12,
  },

  // Search Bar
  searchWrapper: {
    flex: 2,
    position: 'relative',
    zIndex: 50, // controls dropdown layering
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 36,
  },
  searchIcon: {
    marginRight: 6,
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    color: '#333',
  },

  // Search Results Dropdown
  searchResults: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    maxHeight: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10,
    zIndex: 60,
  },

  // Search Result Item
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  userPic: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  userName: {
    fontWeight: '600',
    fontSize: 14,
    color: '#222',
  },
  userUsername: {
    fontSize: 12,
    color: '#666',
  },

  // Avatar
  avatarBtn: {
    padding: 6,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  // Side Menu Overlay
  leftMenuOverlay: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
  leftMenuCard: {
    backgroundColor: '#fff',
    padding: 16,
    width: 250,
    height: '100%',
  },
  leftMenuHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a237e',
  },
  leftMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  leftMenuIcon: {
    marginRight: 12,
  },
  leftMenuText: {
    fontSize: 16,
    color: '#4a90e2',
  },
});


export default AppLayout;