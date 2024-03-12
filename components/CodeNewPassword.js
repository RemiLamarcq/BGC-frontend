import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';

export default function ForgotPassword({toggleModalForgotPassword, toggleModalCodeNewPassword}) {

    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = () => {
        toggleModalCodeNewPassword();
        toggleModalForgotPassword();
    }

    const handleResend = () => {

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
                value={code}
                onChangeText={(value) => setCode(value)}
            />

            <TextInput
                style={styles.inputNewPassword}
                placeholder="Nouveau mot de passe"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={(value) => setNewPassword(value)}
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