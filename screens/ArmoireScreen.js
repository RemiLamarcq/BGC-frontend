import React from 'react';
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Modal, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Game from '../components/Game';
import FicheGame from '../components/FicheGame';
import AddGame from '../components/AddGame';

export default function ArmoireScreen() {

  const [gamesData, setGamesData] = useState([]);
  const token = useSelector(state => state.user.value.token);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [addGameIsVisible, setAddGameIsVisible] = useState(false);
  
  useEffect(() => {
    fetch(`https://bgc-backend.vercel.app/games/closet/${token}`)
      .then(response => response.json())
      .then(data => {
        if(data.result){
            const formatedData = data.data.map(game => {
            return { 
              personalNote : game.personalNote, 
              objectId: game._id, 
              name: game.idGame.name, 
              urlImg: game.idGame.urlImg, 
              minPlayers: game.idGame.minPlayers, 
              maxPlayers: game.idGame.maxPlayers, 
              duration: game.idGame.duration, 
              gameType: game.idGame.gameType.map(type => type.type).join(', ') 
            };
          });
            setGamesData(formatedData);
        }
      });
  }, []); 

  const toggleModalAddGame = () => {
    setAddGameIsVisible(!addGameIsVisible);
  }  

  const toggleModalVisibility = (gameData) => {
    setIsVisible(!isVisible);
    setSelectedGame(gameData);
  };

  return (
  <ScrollView contentContainerStyle={styles.scrollView}>
    <View>
      {gamesData.length > 0 ? (
        gamesData.map((gameData, i) => {
          return <Game 
                    toggleModalVisibility={toggleModalVisibility} 
                    isVisible={isVisible} 
                    key={gameData.objectId} 
                    name={gameData.name} 
                    image={gameData.urlImg} 
                    minPlayers={gameData.minPlayers} 
                    maxPlayers={gameData.maxPlayers} 
                    duration={gameData.duration} 
                    gameType={gameData.gameType} 
                    personalNote={gameData.personalNote}
                    game={gameData} />
             })
      ) : (
        <View>
          <Text style={styles.textAucunJeu}>Aucun jeu dans l'armoire</Text>
          <View style={styles.divBigAjouterJeu}>
            <TouchableOpacity style={styles.bigPlusButton} onPress={toggleModalAddGame}>
              <FontAwesome name="plus" size={40} color="#F2F4F1" backgroundColor="#423D3D" style={styles.bigAddIcon} />
            </TouchableOpacity>
            <Text style={styles.textBigAjouterJeu}>Ajouter un jeu</Text>
          </View>
        </View>
      )}
    </View>
    <Modal visible={addGameIsVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <AddGame toggleModalAddGame={toggleModalAddGame}/>
        </View>
    </Modal>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow:1,
    backgroundColor: '#F2F4F1',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textAucunJeu: {
    flex: 0.5,
    fontSize: 35,
    marginTop: 40,
    color: '#423D3D',
    textAlign: 'center',
  },

  divBigAjouterJeu: {
    flex: 1,
    alignItems: 'center',
  },

  bigAddIcon: {
    padding: 15,
    borderRadius: 50,
    width: 72,
    paddingLeft: 20,
    paddingTop: 18,
  },

  textBigAjouterJeu: {
    fontSize: 30,
    color: '#423D3D',
    marginTop: 10,
  },

  modalContainer: {
    flex: 1,
    top: 15, 
    marginBottom: 60,
    width: '100%',
    backgroundColor: 'pink',
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


});
   
  