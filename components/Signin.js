import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
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

fetch('http://192.168.1.150:3000/users/signin', {
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

    <KeyboardAvoidingView style={styles.full} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> 
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
        placeholder=" E-mail"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />

      <TextInput
        style={styles.input}
        placeholder=" Mot de passe"
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

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.signUpText}>S'inscrire</Text>
      </TouchableOpacity>

    </View>
  </View>
  </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  full: {
    flex : 1,
  },
    container: {
    flex: 1,
    backgroundColor: '#F2F4F1',
    alignItems: 'center',
    justifyContent: 'center',
    },
    logoTitle:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{      
      height: 150,
      width: 150,
    },
    title:{
      fontSize: 40,
      fontWeight: '700',
      textAlign: 'center',
      color : '#423D3D',
    },
    middlePart: {
      flex: 0.3,
      backgroundColor:'#CDDCDB',
      width: "70%",
      borderRadius: 25,
    },
    input : {
      backgroundColor :"white",
      borderRadius: 50,
      height: 40,
      margin : 8,
    },
    button:{
      backgroundColor :"#88B7B6",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      height: 40,
      marginTop: 20,
      margin : 12,
      marginBottom: 10,
    },
    buttonText:{
      textAlign: 'center',
      fontSize: 20,
      color :'#423D3D',
      fontWeight: 'bold',
    }
  
    })