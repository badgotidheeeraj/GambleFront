// components/AppLayout.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const AppLayout = ({ title, children }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.openDrawer && navigation.openDrawer()}>
            <Icon name="menu" size={28} color="#1a237e" />
          </TouchableOpacity>
          {navigation.canGoBack() && (
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={22} color="#1a237e" />
            </TouchableOpacity>
          )}
          {title && <Text style={styles.title}>{title}</Text>}
        </View>
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
  backBtn: {
    marginRight: 8,
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
  content: {
    flex: 1,
  },
});

export default AppLayout;
