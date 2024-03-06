import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Image } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Game({name, image, gameType, minPlayers, maxPlayers, duration, personalNote, id, navigation}) {

    //récupérer personalNote pour faire des étoiles
    const stars = [];
    for(let i= 0; i < 10; i++){
        let style = { 'padding': 2 };
        if (i < personalNote -1) {
            style = { 'color': '#0A3332', 'padding': 2 };
        }
        stars.push(<FontAwesome name="star" style={style}/>);
    }

   return (
    //1 jeu
    <TouchableOpacity style={styles.container}>

        {/* partie gauche avec image, stats et notepad */}

        <View style={styles.left}>

            <View style={styles.image}>
                <Image 
                source={image}
                style={{height: 40, width: 40, borderRadius: 50}}/>
            </View>

            <View style={styles.editAndStats}>
                <TouchableOpacity>
                    <FontAwesome 
                        name="heart"
                        color="#0A3332" 
                        backgroundColor="#88B7B6"/>
                </TouchableOpacity>
                <TouchableOpacity>
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

    </TouchableOpacity>
   );
    }
    
    const styles = StyleSheet.create({
      
        container: {
          flex: 0.12,
          flexDirection: 'row',
          backgroundColor: '#CDDCDB', 
          padding: 5,
          margin: 30,
          borderRadius: 30,
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
          paddingLeft: 10,
          marginTop: 2,
          marginBottom: 2
        },
  
        editTouchable: {
          flex: 0.35,
          borderRadius: 50,
          backgroundColor: "#88B7B6",
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 5,
        },
  
        statsTouchable: {
          flex: 0.35,
          borderRadius: 50,
          backgroundColor: "#88B7B6",
          justifyContent: 'center',
          alignItems: 'center'
        },
  
        right: {
          flex: 3,
          width: 70,
          justifyContent: 'space-between',
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
        },
  
        stars: {
          flex: 1,
          flexDirection: 'row',
          alignSelf: 'flex-end',
          marginRight: 15
        }
  
  
      })