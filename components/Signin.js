import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { returnLogin } from '../reducers/login';


export default function Signin({navigation}) {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {

console.log("Email:", email);
console.log("Password:", password);

fetch('http://192.168.1.12:3000/users/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
}).then(response => response.json())
    .then(data => {
      if(data.result) {
        setEmail('');
        setPassword('');

        dispatch(login({token: data.token, username: data.username}));

        navigation.navigate('TabNavigator');
      }
    })
  };

  const handleSignUp = () => {
    // Logic for handling sign-up
    dispatch(returnLogin('Signup'));
  };

  return (

<View style={styles.container}>
  {/* Titre et logo */}

  <View style={styles.logoTitle}>

    <Image
      source={require('../assets/meeple.png')} // Assuming logo.png exists in the same directory
      style={styles.logo}
    />

    <Text style={styles.title}>Board Game Companion</Text>

  </View>
  {/* Se connecter */}

  <View style={styles.middlePart}>

    <TextInput
      style={styles.input}
      placeholder="E-mail"
      value={email}
      onChangeText={(value) => setEmail(value)}
    />

    <TextInput
      style={styles.input}
      placeholder="Mot de passe"
      secureTextEntry={true}
      value={password}
      onChangeText={(value) => setPassword(value)}
    />

    <TouchableOpacity style={styles.button} onPress={handleSignIn}>
      <Text style={styles.buttonText}>Valider</Text>
    </TouchableOpacity>

  </View>
  {/* Bouton s'inscrire */}

  <View style={styles.bottomPart}>

    <TouchableOpacity onPress={handleSignUp}>
      <Text style={styles.signUpText}>S'inscrire</Text>
    </TouchableOpacity>

  </View>
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