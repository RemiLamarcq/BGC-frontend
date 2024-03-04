import React from 'react';
import { StyleSheet, Text, View , Button } from 'react-native';
import { useSelector } from 'react-redux';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

export default function LoginScreen({navigation}) {

  const login = useSelector((state) => state.login.value)

  if (login === 'Signin') {
    return <Signin/>
  }

  else if (login === 'Signup') {
    return <Signup/>
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
