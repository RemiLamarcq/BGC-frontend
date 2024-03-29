import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Modal, Button } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import FicheGame from './FicheGame';
import { setAddGamePlayVisible } from '../reducers/addGamePlayVisible';
import { setDefaultGameName } from '../reducers/selectedGameName';
import selectedGameName from '../reducers/selectedGameName';
import { ScrollView } from 'react-native-web';

export default function Game({name, image, gameType, minPlayers, maxPlayers, duration, personalNote, id, navigation, toggleModalVisibility, isVisible, game, selectedGame, stars, handleDeleteGame }) {

  const dispatch = useDispatch();

  const defaultGameName = useSelector(state => state.defaultGameName.value);
  
  const handleAddPlay = () => {
    dispatch(setDefaultGameName(name));
    dispatch(setAddGamePlayVisible(true));
    navigation.navigate('Cahier');
  }
  
  const handleGoToGameStats = () => {
    dispatch(setDefaultGameName(name));
    navigation.navigate('Stats');
  }

   return (
    //1 jeu
    <TouchableOpacity style={styles.container} onPress={() => toggleModalVisibility(game)}>

        {/* partie gauche avec image, stats et notepad */}

        <View style={styles.left}>

            <View style={styles.image}>
                <Image 
                source={{uri: image}}
                style={{height: 50, width: 50, borderRadius: 50}}/>
            </View>

            <View style={styles.editAndStats}>
                <TouchableOpacity style={styles.editTouchable} onPress={handleAddPlay}>
                    <AntDesign 
                        name="addfile"
                        color="#0A3332" 
                        backgroundColor="#88B7B6"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statsTouchable} onPress={handleGoToGameStats}>
                    <AntDesign 
                        name="linechart"
                        color="#0A3332" 
                        backgroundColor="#88B7B6"/>
                </TouchableOpacity>
            </View>

        </View>

        {/* partie droite avec nom, type, caractéristiques et étoiles */}

        <View style={styles.right}>

            <View style={styles.titleAndType}>
                <Text style={styles.textTitle}>{name}</Text>
                <Text style={{color:'#423D3D'}}>{gameType}</Text>
            </View>

            <View style={styles.nbPlayersAndDuration}>

                <View style={styles.nbPlayers}>
                    <FontAwesome 
                        name="users"
                        color="#0A3332"/>
                    <Text style={{color:'#423D3D'}}> {minPlayers} à {maxPlayers}</Text>
                </View>

                <View style={styles.duration}>
                    <AntDesign 
                        name="clockcircle"
                        color="#0A3332"/>
                    <Text style={{color:'#423D3D'}}> {duration} </Text>
                </View>

            </View>

            <View style={styles.stars}>{stars}</View>

        </View>

   {/* modale */}     

    <Modal visible={isVisible} animationType="fade" transparent={true}>

        {selectedGame && 

            <FicheGame 
              selectedGame={selectedGame} 
              toggleModalVisibility={toggleModalVisibility} 
              handleDeleteGame={handleDeleteGame} 
              navigation={navigation}
              name={name}/>
          
      }
    </Modal>

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
          marginLeft: 15,
        },
  
        editAndStats: {
          flex: 1,
          flexDirection: 'row',
          marginLeft: 10,
          marginTop: 2,
          marginBottom: 2
        },
  
        editTouchable: {
          flex: 0.40,
          borderRadius: 50,
          backgroundColor: "#88B7B6",
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 5,
        },
  
        statsTouchable: {
          flex: 0.40,
          borderRadius: 50,
          backgroundColor: "#88B7B6",
          justifyContent: 'center',
          alignItems: 'center',
        },
  
        right: {
          flex: 3,
          width: 70,
          justifyContent: 'space-between',
          marginLeft: 10
        },
  
        textTitle: {
          fontWeight: '700',
          fontSize: 18,
          color:'#423D3D'
        },
  
        nbPlayersAndDuration:{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        },
  
        nbPlayers:{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        },
  
        duration: {
          flex: 3,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 10,
        },
  
        stars: {
          flex: 1,
          flexDirection: 'row',
          alignSelf: 'flex-end',
          marginRight: 15
        },

//style de la modale

        modalContainer: {
            flex:1,
            top: 45, 
            width: '100%',
            backgroundColor: '#F2F4F1',
            borderTopLeftRadius: 40, // Adjust the radius as needed
            borderTopRightRadius: 40,
            alignItems: 'center'
          },

          modalContent: {
            padding: 20,
            borderRadius: 10,
            width: '95%',
            height: '100%',
          },

          top: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          },

          goBackTouchable: {
            height: 30,
            width: 30,
            borderRadius: 50,
            backgroundColor: "#88B7B6",
            justifyContent: 'center',
            alignItems: 'center',
          },

          deleteTouchable: {
            height: 30,
            width: 30,
            borderRadius: 50,
            backgroundColor: "#88B7B6",
            justifyContent: 'center',
            alignItems: 'center',
          },

          title: {
            marginBottom: 20,
          },

          textTitleAgain: {
            fontWeight: '700',
            fontSize: 18,
            alignSelf: 'center',
            marginBottom: 5,
            color: '#423D3D',
          },

          starsAgain: {
            flexDirection: 'row',
            alignSelf: 'center',
            marginBottom: 10,
          },

          info: {
            backgroundColor: '#CDDCDB',
            borderRadius: 30,
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: 15,
            paddingRight: 15,
            height: 'auto'
          },

          typeAndDuration: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          },

          type: {
            flexDirection: 'row',
            alignItems: 'center',
          },

          durationAgain: {
            flexDirection: 'row',
            alignItems: 'center',
          },

          nbPlayersAndStats: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          },

          nbPlayersAgain: {
            flexDirection: 'row',
            alignItems: 'center',
          },

          stats: {
            backgroundColor: '#88B7B6',
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
          },

          lastPlay: {
            flexDirection: 'row',
            alignItems: 'center',
          },
  
  
      })