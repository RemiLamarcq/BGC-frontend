import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import CodeNewPassword from './CodeNewPassword';

export default function ForgotPassword({toggleModalForgotPassword}) {

    const [email, setEmail] = useState('');
    const [codeNewPasswordModalVisible, setCodeNewPasswordModalVisible] = useState(false);
    const [error, setError] = useState('');

    const toggleModalCodeNewPassword = () => {
        setCodeNewPasswordModalVisible(!codeNewPasswordModalVisible);
      }

    const handleReset = () => {
        toggleModalCodeNewPassword();
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <Text style={styles.title}>Mot de passe oublié</Text>

            <Text  style={{width: 250}}>Entrez votre e-mail pour réinitialiser votre mot de passe</Text>

            <TextInput
                style={styles.inputEmail}
                placeholder=" E-mail"
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                value={email}
                onChangeText={(value) => setEmail(value)}
            />

            <TextInput style={styles.errorMsg}>
                {error}
            </TextInput>

            <TouchableOpacity style={styles.button} onPress={handleReset}>
                <Text style={styles.buttonReset}>Réinitialiser le mot de passe</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={toggleModalForgotPassword}>
                <Text style={styles.buttonReset}>Retour à la connexion</Text>
            </TouchableOpacity>

            <Modal visible={codeNewPasswordModalVisible} animationType="fade" transparent={true}>
                <View style={styles.modalContainer}>
                    <CodeNewPassword 
                        toggleModalForgotPassword={toggleModalForgotPassword} 
                        toggleModalCodeNewPassword={toggleModalCodeNewPassword}/>
                </View>
            </Modal>

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

    inputEmail : {
        backgroundColor :"white",
        borderRadius: 50,
        height: 40,
        width: 250,
        margin : 8,
        paddingLeft: 10
      },

      errorMsg:{
        color : 'red', 
        textAlign:'center'
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

      modalContainer: {
        flex: 1,
        width: '90%',
        height: '80%',
        backgroundColor: '#88B7B6',
        borderRadius: 40,
        padding: 15,
        alignSelf: 'center',
        marginBottom: 100,
        marginTop: 100
      },
})  