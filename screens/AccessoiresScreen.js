import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AccessoiresScreen() {
  return (
    <View style={styles.container}>
      <Text>Accessoires</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
