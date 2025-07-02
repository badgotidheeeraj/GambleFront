// ...existing code from Componet/MenuButton.jsx...
// components/MenuButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MenuButton = ({ title, onPress, backgroundColor = '#4a90e2', textColor = '#fff' }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    marginVertical: 7,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MenuButton;
