import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Modal, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleVisibility, setGamePlayData } from '../reducers/ficheGamePlay';

export default function GamePlay(props) {

    const {id, game, gameImage, startDate, endDate, players, gamePlayImages, comment, place, isInterrupted } = props;
    const friendNames = players.map(player => player.friendName).join(' - ');
    const dispatch = useDispatch();

    // Dans l état ficheGamePlay du store, stocke les données de la partie cliquée et toggle la visibility de la modale.
    function handleFicheGamePlayState(){
        dispatch(setGamePlayData(props))
        dispatch(toggleVisibility());
    }

   return (
    <TouchableOpacity style={styles.container} onPress={handleFicheGamePlayState} >
        <View style={styles.left}>
            <View style={styles.image}>
                <Image 
                source={{uri: gameImage}}git pu
                style={{height: 70, width: 70, borderRadius: 50}}/>
            </View>
        </View>
        <View style={styles.right}>
            <Text style={styles.textTitle}>{game.name}</Text>
            <Text style={styles.textType}>{endDate}</Text>
            <Text style={styles.textType}>{friendNames}</Text>
        </View>
    </TouchableOpacity>
   );
}
    
const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 100,
        flexDirection: 'row',
        backgroundColor: '#CDDCDB', 
        padding: 5,
        margin: 5,
        borderRadius: 20,
    },
    left: {
        flex:1,
    },
    image: {
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 10,
    },
    right: {
        flex: 3,
        width: 70,
        justifyContent: 'center',
        gap: 5,
        marginLeft: 10
    },
    textTitle: {
        fontWeight: '700',
        fontSize: 18,
    },
});