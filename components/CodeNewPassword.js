import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';

export default function ForgotPassword({toggleModalForgotPassword, toggleModalCodeNewPassword, email}) {

    const [checkCode, setCheckCode] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        // console.log(email);
        // console.log(checkCode);
        // console.log(password);

        fetch(`https://bgc-backend.vercel.app/pwdRecovery/verifyCode/${email}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checkCode, password }),
        })
        .then(response => response.json())
            .then(data => {
              if(data.result) {
                setCheckCode('');
                setPassword('');
              }else{
                setError(data.error);
              }
            })

        toggleModalCodeNewPassword();
        toggleModalForgotPassword();
    }

    const handleBackToLogin = () => {
        toggleModalCodeNewPassword();
        toggleModalForgotPassword();
    }

    return (
        <KeyboardAvoidingView style={styles.container}>

            <Text style={styles.title}>Nouveau mot de passe</Text>

            <TextInput
                style={styles.inputVerificationCode}
                placeholder="Code de vérification"
                autoCapitalize='none'
                value={checkCode}
                onChangeText={(value) => setCheckCode(value)}
            />

            <TextInput
                style={styles.inputNewPassword}
                placeholder="Nouveau mot de passe"
                secureTextEntry={true}
                value={password}
                onChangeText={(value) => setPassword(value)}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonValider}>Valider</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.button} onPress={handleResend}>
                <Text style={styles.buttonResend}>Renvoyer le code</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.button} onPress={handleBackToLogin}>
                <Text style={styles.buttonBackToLogin}>Retour à la connexion</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    title: {
        fontSize: 20,
        fontWeight: '600'
    },

    inputVerificationCode : {
        backgroundColor :"white",
        borderRadius: 50,
        height: 40,
        width: 250,
        margin : 8,
        paddingLeft: 10
      },

    inputNewPassword: {
        backgroundColor :"white",
        borderRadius: 50,
        height: 40,
        width: 250,
        margin : 8,
        paddingLeft: 10
    },

      button:{
        backgroundColor :"#CDDCDB",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 40,
        width: 200,
        margin: 8,
      },
})  