import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Armoirecreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Armoire</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },


});
