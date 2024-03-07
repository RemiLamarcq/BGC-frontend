import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Modal, Button } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';

export default function Game({name, image, gameType, minPlayers, maxPlayers, duration, personalNote, id, navigation, toggleModalVisibility, isVisible, game, selectedGame, stars }) {

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
                <TouchableOpacity style={styles.editTouchable}>
                    <AntDesign 
                        name="addfile"
                        color="#0A3332" 
                        backgroundColor="#88B7B6"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statsTouchable}>
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

   {/* modale et contenu qui sera à déplacer */}     

    <Modal visible={isVisible} animationType="fade" transparent={true}>
        {selectedGame && 
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <View style={styles.top}>
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.goBackTouchable} onPress={toggleModalVisibility}>
                        <FontAwesome 
                            name="arrow-left"
                            color="#0A3332" 
                            backgroundColor="#88B7B6"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.topRight}>
                    <TouchableOpacity style={styles.deleteTouchable}>
                        <FontAwesome 
                            name="trash"
                            color="#0A3332" 
                            backgroundColor="#88B7B6"/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.title}>
                <View style={styles.titleAndScore}>
                    <Text style={styles.textTitleAgain}>{selectedGame.name}</Text>
                    <View style={styles.starsAgain}>{selectedGame.stars}</View>
                </View>
                <View style={styles.image}>
                    <Image 
                    source={{uri:(selectedGame.urlImg)}}
                    style={{height: 300, width: 300}}
                    />
                </View>
            </View>

            <View style={styles.info}>

                <View style={styles.typeAndDuration}>
                    <View style={styles.type}>
                        <FontAwesome name="hashtag" style={{color: '#423D3D'}}/>
                        <Text style={{color: '#423D3D'}}> {selectedGame.gameType}</Text>
                    </View>
                    <View style={styles.durationAgain}>
                        <AntDesign name="clockcircle" style={{color: '#423D3D'}}/>
                        <Text style={{color: '#423D3D'}}> {selectedGame.duration}</Text>
                    </View>
                </View>

                <View style={styles.nbPlayersAndStats}>
                    <View style={styles.nbPlayersAgain}>
                        <FontAwesome name="users" style={{color: '#423D3D'}}/>
                        <Text style={{color: '#423D3D'}}> {selectedGame.minPlayers} à {selectedGame.maxPlayers}</Text>
                    </View>
                    <TouchableOpacity style={styles.stats}>
                        <AntDesign name="linechart" style={{color: '#423D3D'}}/>
                        <Text style={{color: '#423D3D'}}> voir les stats</Text>
                    </TouchableOpacity>
                </View> 

                <View style={styles.lastPlay}>
                        <FontAwesome name="calendar" style={{color: '#423D3D'}}/>
                        <Text style={{color: '#423D3D'}}> dernière partie : le 14/02/2024 à 15h</Text>
                </View>

            </View>

            <View style={styles.extensions}>

            </View>
            
          </View>
        </View>
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
            top: 15, 
            width: '100%',
            backgroundColor: '#F2F4F1',
            borderTopLeftRadius: 40, // Adjust the radius as needed
            borderTopRightRadius: 40,
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