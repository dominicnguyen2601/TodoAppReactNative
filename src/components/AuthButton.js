import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AuthButton({ title = 'Submit', onPress, disabled = false }) {
  return (
    <TouchableOpacity style={[styles.button, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
});


