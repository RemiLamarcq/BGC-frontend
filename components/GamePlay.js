import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Modal, Button } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function GamePlay(props) {

    const {id, name, gameImage, startDate, endDate, players, gamePlayImages, comment, place, isInterrupted, toggleModalVisibility, isVisible, selectedGame, gamePlay } = props;

    const friendNames = players.map(player => player.friendName).join(' - ');

   return (
    //1 jeu
    <TouchableOpacity style={styles.container} onPress={() => toggleModalVisibility(gamePlay)}>

        {/* partie gauche avec image du jeu */}

        <View style={styles.left}>

            <View style={styles.image}>
                <Image 
                source={{uri: gameImage}}
                style={{height: 70, width: 70, borderRadius: 50}}/>
            </View>

        </View>

        {/* partie droite avec nom du jeu, date, joueurs */}

        <View style={styles.right}>

            <Text style={styles.textTitle}>{name}</Text>
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

    //style de la modale

        modalContainer: {
            flex:1,
            top: 15, 
            marginBottom: 60,
            width: '100%',
            backgroundColor: '#F2F4F1',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 40, // Adjust the radius as needed
            borderTopRightRadius: 40,
        },

        modalContent: {
            padding: 20,
            borderRadius: 10,
            width: '95%',
        },

        top: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

        goBackIcon: {
            borderRadius: 50,
            width: 30,
            height: 30,
        },

        topRight: {
            flexDirection: 'row',
        },

        textTitleAgain: {
            fontWeight: '700',
            fontSize: 18,
            alignSelf: 'center',
        },

        starsAgain: {
            flexDirection: 'row',
            alignSelf: 'center',
        },

        info: {
            backgroundColor: '#CDDCDB',
            borderRadius: 30,
        },

        typeAndDuration: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

    });