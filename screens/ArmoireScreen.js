import React from 'react';
import { ScrollView, Alert, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Modal, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Game from '../components/Game';
import FicheGame from '../components/FicheGame';
import AddGame from '../components/AddGame';
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/Header';
import { setDefaultGameName } from '../reducers/selectedGameName';
import { setCameraPermission } from '../reducers/cameraPermission';

export default function ArmoireScreen({navigation}) {

  const [gamesData, setGamesData] = useState([]);
  const [initialGames, setInitialGames] = useState([])
  const token = useSelector(state => state.user.value.token);
  const [isVisible, setIsVisible] = useState(false);
  const [addGameIsVisible, setAddGameIsVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  // console.log(token)

  const dispatch = useDispatch();
  
  //Demande d'autorisation pour accéder à la caméra du téléphone
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      dispatch(setCameraPermission(status === 'granted'));
      if(status !== 'granted'){
        Alert.alert(
          'Permission requise',
          `Autoriser l'accès à la caméra pour pouvoir enregistrer des photos de parties`,
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    })();
  }, []);

  useEffect(() => {
    fetch(`https://bgc-backend.vercel.app/games/closet/${token}`)
      .then(response => response.json())
      .then(data => {
        if(data.result){
            
            const formatedData = data.data.map(game => {

                let gameDuration;
                if (game.idGame.duration === 1) {
                    gameDuration = '< 30min'
                }
                else if (game.idGame.duration === 2) {
                    gameDuration = '30 à 60 min'
                }
                else if (game.idGame.duration === 3) {
                    gameDuration = '1 à 2h'
                }
                else if (game.idGame.duration === 4) {
                    gameDuration = '> 2h'
                }

                let stars = [];
                for(let i= 0; i < 5; i++){
                    if (i < game.personalNote) {
                        stars.push(<AntDesign key={i} name="star" style={{color: '#0A3332'}}/>);
                    } else {
                        stars.push(<AntDesign key={i} name="staro" style={{color: '#0A3332'}}/>);
                    }
                }

            return { 
              personalNote : game.personalNote, 
              objectId: game._id, 
              name: game.idGame.name, 
              urlImg: game.idGame.urlImg, 
              minPlayers: game.idGame.minPlayers, 
              maxPlayers: game.idGame.maxPlayers, 
              duration: gameDuration, 
              gameType: game.idGame.gameType.map(type => type.type).join(', '),
              stars: stars,
            };
          });
            setGamesData(formatedData);
            setInitialGames(formatedData);
        }
      });
  }, [addGameIsVisible, isVisible]); 

  const toggleModalAddGame = () => {
    setAddGameIsVisible(!addGameIsVisible);
  }  

  useEffect(() => {
    if (selectedGame) {
      dispatch(setDefaultGameName(selectedGame.name));
      console.log(selectedGame.name);
    }
  }, [selectedGame]);

  const toggleModalVisibility = (gameData) => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setSelectedGame(gameData);
    }
    
  };

  const handleDeleteGame = () => {
    // console.log('yo');
    // console.log(selectedGame.name, token)
    Alert.alert(
      'Confirmation',
      `Voulez-vous vraiment supprimer le jeu "${selectedGame.name}" ?`,
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => {
            // Effectuer la suppression si l'utilisateur confirme
            fetch(`https://bgc-backend.vercel.app/games/closet/remove/${selectedGame.name}/${token}`,{
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              }).then(response=> response.json())
            .then(() => {
              toggleModalVisibility()
              // console.log('coucou')
            })
            .catch(error => {
              console.error('Erreur lors de la suppression du jeu:', error);
            });
          },
        },
      ]
    );
  }

  // Fonction qui permet de filtrer l'affichage des jeux en fonction de la valeur du champ de recherche récupérée grâce à l'inverse data flow
  const handleFilteredGamesChange = (value) => {
    const filterGames = initialGames.filter(game => {
      return game.name.toLowerCase().includes(value.toLowerCase());
    });
    setGamesData(filterGames)
  };
  
  return (
  <View style={styles.mainContainer}>
    <Header 
      title="Armoire" 
      height={200} 
      showMeeple={true} 
      showSearchBar={true} 
      toggleModalAddGame={toggleModalAddGame} 
      gamesData={gamesData} 
      onSearchGameChange={(e) => handleFilteredGamesChange(e)}
      isInNotebook={false}
      showGameCounter={true}
      initialGames={initialGames}
      currentScreen="ArmoireScreen"
    />
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
                      game={gameData}
                      stars={gameData.stars}
                      selectedGame={selectedGame}
                      handleDeleteGame={handleDeleteGame}
                      navigation={navigation} />
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
            <AddGame toggleModalAddGame={toggleModalAddGame} />
          </View>
      </Modal>
    </ScrollView>
  </View>

  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 200,
  },
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
    top: 45, 
    width: '100%',
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 40, // Adjust the radius as needed
    borderTopRightRadius: 40,
  },


});