import React from 'react';
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Modal, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GamePlay from '../components/GamePlay';
import FicheGame from '../components/FicheGame';
import formatDate from '../modules/formatDate';

export default function ArmoireScreen() {

  const [gamePlays, setGamePlays] = useState([]);
  const token = useSelector(state => state.user.value.token);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedGamePlays, setSelectedGamePlays] = useState(null);
  const [gamePlaysVisibility, setGamePlaysVisibility] = useState(false);
  // console.log(gamePlays);
  
  useEffect(() => {
    fetch(`https://bgc-backend.vercel.app/gamePlays/${token}`)
      .then(response => response.json())
      .then(data => {
        if(data.result){
            // console.log(data.gamePlays)
            const formatedData = data.gamePlays.map(gamePlay => {
              const { _id, idGame, startDate, endDate, players, urlImage, comment, place, isInterrupted } = gamePlay;
              console.log(formatDate(startDate))
              return { 
                id: _id,
                name: idGame.name,
                gameImage: idGame.urlImg,
                startDate: formatDate(startDate),
                endDate: formatDate(endDate), 
                players: players.map(player => {
                  return {
                    friendName: player.friendName,
                    isWinner: player.isWinner,
                  };
                }),
                gamePlayImages: urlImage, 
                comment, 
                place, 
                isInterrupted,
              };
          });
            setGamePlays(formatedData);
        }
      });
  }, []); 

  const toggleModalAddGame = () => {
    setGamePlaysVisibility(!gamePlaysVisibility);
  }  

  const toggleModalVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
  <ScrollView contentContainerStyle={styles.scrollView}>
    <View>
      {gamePlays.length > 0 ? (
        gamePlays.map((gamePlay, i) => {
          return <GamePlay  
                    key={i} 
                    {...gamePlay}
                    toggleModalVisibility={toggleModalVisibility} 
                    isVisible={isVisible}
                   />
             })
      ) : (
        <View>
          <Text style={styles.textAucunJeu}>Aucune parties enregistrées</Text>
          <View style={styles.divBigAjouterJeu}>
            <TouchableOpacity style={styles.bigPlusButton} onPress={toggleModalAddGame}>
              <FontAwesome name="plus" size={40} color="#F2F4F1" backgroundColor="#423D3D" style={styles.bigAddIcon} />
            </TouchableOpacity>
            <Text style={styles.textBigAjouterJeu}>Ajouter une partie</Text>
          </View>
        </View>
      )}
    </View>
    <Modal visible={gamePlaysVisibility} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>This is a modal</Text>
            <Button title="Close Modal" onPress={toggleModalAddGame} />
          </View>
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '95%',
  },


});
   
  