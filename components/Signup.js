import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { returnLogin } from '../reducers/login';

export default function Signup({navigation}) {

const dispatch = useDispatch();

const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [confirmEmail, setConfirmEmail] = useState('');
const [password, setPassword] = useState('');

const handleSignUp = () => {

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    fetch('http://192.168.1.98:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    }).then(response => response.json())
        .then(data => {
          if(data.result) {
            setEmail('');
            setPassword('');
            setConfirmEmail('');
            setUsername('');

            dispatch(login({token: data.token, username: data.username}));

            navigation.navigate('TabNavigator');
          }
        })

  };

  const handleBackToSignin = () => {
    // Logic for handling sign-up
    dispatch(returnLogin('Signin'))
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
  {/* S'inscrire */}

  <View style={styles.middlePart}>

    <TouchableOpacity style={styles.button} onPress={handleBackToSignin}>
      <FontAwesome name="arrow-left" size={20} color='#000000' style={styles.deleteIcon}/>
    </TouchableOpacity>

    <TextInput
      style={styles.input}
      placeholder="nom d'utilisateur"
      value={username}
      onChangeText={(value) => setUsername(value)}
    />
    
    <TextInput
      style={styles.input}
      placeholder="e-mail"
      value={email}
      onChangeText={(value) => setEmail(value)}
    />

    <TextInput
      style={styles.input}
      placeholder=" confirmer e-mail"
      value={confirmEmail}
      onChangeText={(value) => setConfirmEmail(value)}
    />

    <TextInput
      style={styles.input}
      placeholder="Mot de passe"
      secureTextEntry={true}
      value={password}
      onChangeText={(value) => setPassword(value)}
    />

    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
      <Text style={styles.buttonText}>S'inscrire</Text>
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
    })