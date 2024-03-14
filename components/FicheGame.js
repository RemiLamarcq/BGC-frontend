import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Modal, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import { setAddGamePlayVisible } from '../reducers/addGamePlayVisible';
import { addGamePlayVisible } from '../reducers/addGamePlayVisible';
import selectedGameName from '../reducers/selectedGameName';
import { setDefaultGameName } from '../reducers/selectedGameName';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function FicheGame({ toggleModalVisibility, selectedGame, handleDeleteGame, navigation }) {

const dispatch = useDispatch();

const defaultGameName = useSelector(state => state.defaultGameName.value);

const [starsEditable, setStarsEditable] = useState(false);
const [addPersonalNote, setAddPersonalNote] = useState(0);

const token = useSelector(state => state.user.value.token);

const handlePressPencil = () => {
  setStarsEditable(!starsEditable);
  console.log('ok');
}

const handlePressV = () => {
    console.log('yo');
    fetch(`https://bgc-backend.vercel.app/games/score/${selectedGame.name}/${token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({score: addPersonalNote}),
            }).then(response=> response.json())
                .then(() => {
                  setStarsEditable(false);
                  toggleModalVisibility();
                })
}

let vButton;
if(starsEditable){
  vButton =
    <TouchableOpacity style={styles.pencilEditStarsButton} onPress={handlePressV}>
        <AntDesign name="check"  style={{color: '#0A3332'}}/>
    </TouchableOpacity>
}

let editStars = [];
if(!starsEditable) {
  for(let i= 0; i < 5; i++){
    if (i < selectedGame.personalNote) {
        editStars.push(<AntDesign name="star" style={{color: '#0A3332'}} size={18} />);
    } else {
        editStars.push(<AntDesign name="staro" style={{color: '#0A3332'}} size={18}/>);
    }
  }
}else{
  for(let i= 0; i < 5; i++){
      if (i < addPersonalNote) {
          editStars.push(
          <TouchableOpacity onPress={() => setAddPersonalNote(i+1)}>
              <AntDesign name="star" style={{color: '#88B7B6'}} size={18}/>
          </TouchableOpacity>
          );
      } else {
          editStars.push(
          <TouchableOpacity onPress={() => setAddPersonalNote(i+1)}>
              <AntDesign name="staro" style={{color: '#88B7B6'}} size={18}/>
          </TouchableOpacity>
          );
          console.log(addPersonalNote);
      }
      
  }
}

const handleGoToGameStats = () => {
  navigation.navigate('Stats');
  toggleModalVisibility();
}

const handleAddPlay = () => {
  navigation.navigate('Cahier');
  toggleModalVisibility();
  dispatch(setAddGamePlayVisible(true));
}

   return (

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <View style={styles.top}>
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.goBackTouchable} onPress={toggleModalVisibility}>
                    <AntDesign 
                            name="arrowleft" 
                            size={20} 
                            color="#423D3D" />
                    </TouchableOpacity>
                </View>
                <View style={styles.topRight}>
                    <TouchableOpacity style={styles.deleteTouchable} onPress={handleDeleteGame}>
                        <FontAwesome 
                            size={16}
                            name="trash"
                            color="#0A3332" 
                            backgroundColor="#88B7B6"/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.title}>
                <View style={styles.titleAndScore}>
                    <Text style={styles.textTitleAgain}>{selectedGame.name}</Text>
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
                        <FontAwesome size={14} name="hashtag" style={{color: '#423D3D'}}/>
                        <Text style={{color: '#423D3D'}}> {selectedGame.gameType}</Text>
                    </View>
                    <View style={styles.durationAgain}>
                        <AntDesign size={14} name="clockcircle" style={{color: '#423D3D'}}/>
                        <Text style={{color: '#423D3D'}}> {selectedGame.duration}</Text>
                    </View>
                </View>

                <View style={styles.nbPlayersAndStats}>
                    <View style={styles.nbPlayersAgain}>
                        <FontAwesome size={14} name="users" style={{color: '#423D3D'}}/>
                        <Text style={{color: '#423D3D'}}> {selectedGame.minPlayers} à {selectedGame.maxPlayers}</Text>
                    </View>
                    <TouchableOpacity style={styles.stats} onPress={handleGoToGameStats}>
                        <AntDesign name="linechart" style={{color: '#423D3D'}}/>
                        <Text style={{color: '#423D3D'}}> voir les stats</Text>
                    </TouchableOpacity>
                </View> 

                <View style={styles.lastPlay}>
                    <FontAwesome size={14} name="calendar" style={{color: '#423D3D'}}/>
                    <Text style={{color: '#423D3D'}}> dernière partie : le 14/02/2024 à 15h</Text>
                </View>

                <View style={styles.editStarsAndAddPlay}>
                    <View style={styles.editStars}>
                      {editStars}
                      <TouchableOpacity style={styles.pencilEditStarsButton} onPress={handlePressPencil}>
                        <FontAwesome size={14} name="pencil"  style={{color: '#0A3332'}}/>
                      </TouchableOpacity>
                      {vButton}
                    </View>
                    <View style={styles.AddPlay}>
                        <TouchableOpacity onPress={handleAddPlay} style={styles.buttonAddPlay}>
                            <View style={styles.plusButton}>
                              <FontAwesome5 size={20} name="plus-circle" color="#423D3D" style={styles.AddIcon} />
                            </View>
                            <Text>Ajouter une partie</Text>
                      </TouchableOpacity>
                    </View>
                </View>

            </View>
            
          </View>

        </View>
   );
    }
    
    const styles = StyleSheet.create({

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
            marginBottom: 15,
            color: '#423D3D',
          },

          image: {
            alignSelf: 'center'
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

          editStars: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            alignItems: 'center'
          },

          pencilEditStarsButton: {
            borderRadius: 50,
            backgroundColor: "#88B7B6",
            justifyContent: 'center',
            alignItems: 'center',
            height: 20,
            width: 20,
            marginLeft: 5 
          },

          editStarsAndAddPlay: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          },

          buttonAddPlay: {
            backgroundColor: '#88B7B6',
            borderRadius: 20,
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15
          },
          
          plusButton: {
            borderRadius: 50,
            marginRight: 1,
            marginLeft:-1,
            width:24,
            height:24,
          },
          AddIcon:{
            marginLeft:3,
            marginTop:1,
          }
      })