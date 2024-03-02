import React from 'react';
import { StyleSheet, Text, View , Button } from 'react-native';

export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
       title="Aller à l'armoire"
      onPress={() => navigation.navigate('TabNavigator')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
