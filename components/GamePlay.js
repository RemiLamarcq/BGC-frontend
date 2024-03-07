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

        {/* partie gauche avec image, stats et notepad */}

        <View style={styles.left}>

            <View style={styles.image}>
                <Image 
                source={{uri: gameImage}}
                style={{height: 70, width: 70, borderRadius: 50}}/>
            </View>

        </View>

        {/* partie droite avec nom, type, caractéristiques et étoiles */}

        <View style={styles.right}>

            <Text style={styles.textTitle}>{name}</Text>
            <Text style={styles.textType}>{endDate}</Text>
            <Text style={styles.textType}>{friendNames}</Text>

        </View>

   {/* modale et contenu qui sera à déplacer */}     

    {/* <Modal visible={isVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <View style={styles.top}>
                <View style={styles.topLeft}>
                    <TouchableOpacity onPress={toggleModalVisibility}>
                        <FontAwesome 
                            style={styles.goBackIcon}
                            name="arrow-left"
                            color="#0A3332" 
                            backgroundColor="#88B7B6"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.topRight}>
                    <TouchableOpacity>
                        <FontAwesome 
                            style={styles.goBackIcon}
                            name="pencil"
                            color="#0A3332" 
                            backgroundColor="#88B7B6"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome 
                            style={styles.goBackIcon}
                            name="trash"
                            color="#0A3332" 
                            backgroundColor="#88B7B6"/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.title}>
                <View style={styles.titleAndScore}>
                    <Text style={styles.textTitleAgain}>{name}</Text>
                    <View style={styles.starsAgain}>{stars}</View>
                </View>
                <View style={styles.image}>
                    <Image 
                    source={{uri: image}}
                    style={{height: '80%', width: '100%'}}/>
                </View>
            </View>

            <View style={styles.info}>
                <View style={styles.typeAndDuration}>
                    <View style={styles.type}>
                        <FontAwesome name="hashtag"/>
                        <Text>{gameType}</Text>
                    </View>
                    <View style={styles.duration}>
                        <FontAwesome name="heart"/>
                        <Text>{duration}</Text>
                    </View>
                </View>
                <View style={styles.nbPlayersAndStats}>

                </View> 
                <View style={styles.lastPlay}>

                </View>
            </View>

            <View style={styles.extensions}>

            </View>
            
          </View>
        </View>
    </Modal> */}

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
  
  
      })