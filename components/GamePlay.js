import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Modal, Button } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function GamePlay(props) {

    const {id, name, gameImage, startDate, endDate, players, gamePlayImages, comment, place, isInterrupted, toggleModalVisibility, isVisible } = props;

    const friendNames = players.map(player => player.friendName).join(' - ');

   return (
    //1 jeu
    <TouchableOpacity style={styles.container} onPress={toggleModalVisibility}>

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

      });