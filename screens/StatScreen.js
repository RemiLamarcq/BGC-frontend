import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StatScreen() {
  return (
    <View style={styles.container}>
      <Text>Stat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
