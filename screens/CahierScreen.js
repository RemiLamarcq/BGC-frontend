import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CahierScreen() {
  return (
    <View style={styles.container}>
      <Text>Cahier</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
