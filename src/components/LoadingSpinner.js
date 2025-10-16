import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function LoadingSpinner({ size = 'small', color = '#2563eb' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
});


