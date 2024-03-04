import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
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

    fetch('http://192.168.1.150:3000/users/signup', {
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
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  full: {
    flex : 1,
  },
    container: {
    flex: 0.5,
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