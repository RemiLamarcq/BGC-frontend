import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Modal, Button } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Game({name, image, gameType, minPlayers, maxPlayers, duration, personalNote, id, navigation, toggleModalVisibility, isVisible, game, selectedGame }) {

    //récupérer personalNote pour faire des étoiles
    const stars = [];
    for(let i= 0; i < 5; i++){
        let style = { 'padding': 2, 'size': 10 };
        if (i < personalNote -1) {
            style = { 'color': '#0A3332', 'padding': 2, 'size': 10 };
        }
        stars.push(<FontAwesome name="star" style={style}/>);
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
                <TouchableOpacity style={styles.editTouchable}>
                    <FontAwesome 
                        name="heart"
                        color="#0A3332" 
                        backgroundColor="#88B7B6"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statsTouchable}>
                    <FontAwesome 
                        name="heart"
                        color="#0A3332" 
                        backgroundColor="#88B7B6"/>
                </TouchableOpacity>
            </View>

        </View>

        {/* partie droite avec nom, type, caractéristiques et étoiles */}

        <View style={styles.right}>

            <View style={styles.titleAndType}>
                <Text style={styles.textTitle}>{name}</Text>
                <Text style={styles.textType}>{gameType}</Text>
            </View>

            <View style={styles.nbPlayersAndDuration}>

                <View style={styles.nbPlayers}>
                    <FontAwesome 
                        name="users"
                        color="#0A3332"/>
                    <Text> {minPlayers} à {maxPlayers}</Text>
                </View>

                <View style={styles.duration}>
                    <FontAwesome 
                        name="users"
                        color="#0A3332"/>
                    <Text> {duration}</Text>
                </View>

            </View>

            <View style={styles.stars}>{stars}</View>

        </View>

   {/* modale et contenu qui sera à déplacer */}     

    <Modal visible={isVisible} animationType="slide" transparent={true}>
        {selectedGame && 
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
                    <Text style={styles.textTitleAgain}>{selectedGame.name}</Text>
                    <View style={styles.starsAgain}>{stars}</View>
                </View>
                <View style={styles.image}>
                    <Image 
                    source={{uri:(selectedGame.urlImg)}}
                    style={{height: '80%', width: '100%'}}
                    />
                </View>
            </View>

            <View style={styles.info}>
                <View style={styles.typeAndDuration}>
                    <View style={styles.type}>
                        <FontAwesome name="hashtag"/>
                        <Text>{selectedGame.gameType}</Text>
                    </View>
                    <View style={styles.duration}>
                        <FontAwesome name="heart"/>
                        <Text>{selectedGame.duration}</Text>
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