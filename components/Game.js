import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Modal, Button } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Game({name, image, gameType, minPlayers, maxPlayers, duration, personalNote, id, navigation, toggleModalVisibility, isVisible}) {
    console.log(name, image, gameType, minPlayers, maxPlayers, duration, personalNote);

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
    <TouchableOpacity style={styles.container} onPress={toggleModalVisibility}>

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

    <Modal visible={isVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>This is a modal</Text>
            <Button title="Close Modal" onPress={toggleModalVisibility} />
          </View>
        </View>
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
        }
  
  
      })