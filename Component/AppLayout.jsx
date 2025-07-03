
// Component: AppLayout.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const userProfilePic = 'https://i.pravatar.cc/100?img=5';

const AppLayout = ({ title, children, setActiveComponent }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.menuBtn} onPress={() => setShowMenu(prev => !prev)}>
            <Icon name="menu" size={28} color="#1a237e" />
          </TouchableOpacity>

          {title && <Text style={styles.title}>{title}</Text>}

          <TouchableOpacity style={styles.avatarBtn} onPress={() => setShowMenu(prev => !prev)}>
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
                <Icon
                  name="trending-up"
                  size={22}
                  color="#4a90e2"
                  style={styles.leftMenuIcon}
                />

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
  safeArea: {
    flex: 1,
    backgroundColor: '#eaf0fa',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuBtn: {
    marginRight: 12,
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#e3e7f1',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a237e',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
  },
  avatarBtn: {
    marginLeft: 12,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#eaf0fa',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  leftMenuOverlay: {
    position: 'absolute',
    top: 65,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    right: 16,
    left: 16,
    bottom: 32,
    zIndex: 100,
    alignItems: 'flex-start',
  },
  leftMenuCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 0,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    minWidth: 180,
    borderWidth: 1,
    borderColor: '#eaf0fa',
  },
  leftMenuHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 8,
    marginLeft: 22,
    letterSpacing: 1,
  },
  leftMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  leftMenuIcon: {
    marginRight: 14,
  },
  leftMenuText: {
    color: '#1a237e',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
  },
});

export default AppLayout;