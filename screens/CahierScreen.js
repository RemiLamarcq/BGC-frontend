import React from 'react';
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Modal, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GamePlay from '../components/GamePlay';
import { formatDate } from '../modules/formatDate';
import Header from '../components/Header'; 
import AddGamePlay from '../components/AddGamePlay';
import { setAddGamePlayVisible } from '../reducers/addGamePlayVisible';
import FicheGamePlay from '../components/FicheGamePlay';

export default function CahierScreen() {

  const token = useSelector(state => state.user.value.token);
    // Contrôle la visibilité de la modale permettant de voir la fiche d'une partie
  const isFicheGamePlayVisible = useSelector(state => state.ficheGamePlay.value.isModalVisible);
  // Liste des parties à afficher dans le cahier
  const [gamePlays, setGamePlays] = useState([]);
  // Valeur du champ de l'input de recherche par jeu
  const [gamePlaysFilter, setGamePlaysFilter] = useState('');

  const dispatch = useDispatch();
    // Contrôle la visibilité de la modale permettant d'ajouter une partie
  const addGamePlayVisible = useSelector(state => state.addGamePlayVisible.value);

  /* Récupère l'ensemble des parties du user à l'initialisation et à chaque fermeture des modales 
     addGamePlay et FicheGamePlay. */
  useEffect(() => {
    fetch(`https://bgc-backend.vercel.app/gamePlays/${token}`)
      .then(response => response.json())
      .then(data => {
        if(data.result){
          console.log(data)
            const formatedData = data.gamePlays.map(gamePlay => {
              const { _id, idGame, startDate, endDate, players, urlImage, comment, place, isInterrupted } = gamePlay;
              return { 
                id: _id,
                game: idGame,
                gameImage: idGame.urlImg,
                startDate: formatDate(startDate),
                endDate: formatDate(endDate), 
                players,
                gamePlayImages: urlImage, 
                comment, 
                place, 
                isInterrupted,
              };
          });
            setGamePlays(formatedData);
        }
      });
  }, [addGamePlayVisible, isFicheGamePlayVisible]); 

  // Fonction qui permet de filtrer l'affichage des parties en fonction du nom du jeu inscrit dans la barre de recherche
  const handleGamePlaysFilter = (value) => {
    setGamePlaysFilter(value);
  };

  const gamePlaysJSX = 
    gamePlays
    .filter(gamePlay => gamePlay.game.name.toLowerCase().includes(gamePlaysFilter.toLowerCase()))
    .reverse()
    .map((gamePlay, i) => {
      return (
        <GamePlay  
          key={i} 
          {...gamePlay}
        />
      );
    })
  ;

  return (
    <View style={styles.mainContainer}>
      <Header 
        title="Cahier" 
        height={200} 
        showMeeple={true} 
        showSearchBar={true} 
        isInNotebook={true}
        handleGamePlaysFilter={handleGamePlaysFilter}
        currentScreen="CahierScreen"
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          {gamePlays.length > 0 ? 
            gamePlaysJSX
          : 
            (<View>
              <Text style={styles.defaultTxt}>Aucune parties enregistrées</Text>
              <View style={styles.bigAddGamePlayCtn}>
                <TouchableOpacity style={styles.bigPlusButton} onPress={ () => dispatch(setAddGamePlayVisible(!addGamePlayVisible)) }>
                  <FontAwesome name="plus" size={40} color="#F2F4F1" backgroundColor="#423D3D" style={styles.bigAddIcon} />
                </TouchableOpacity>
                <Text style={styles.bigAddGamePlayTxt}>Ajouter une partie</Text>
              </View>
            </View>)
          }
        </View>
        <Modal visible={addGamePlayVisible} animationType="slide" transparent={false}>
            <AddGamePlay />
        </Modal>
        <Modal visible={isFicheGamePlayVisible} animationType='slide' transparent={false}>
            <FicheGamePlay />
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
    flexGrow: 1,
    backgroundColor: '#F2F4F1',
    alignItems: 'center',
  },
  defaultTxt: {
    flex: 0.5,
    fontSize: 35,
    marginTop: 40,
    color: '#423D3D',
    textAlign: 'center',
  },
  bigAddGamePlayCtn: {
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
  bigAddGamePlayTxt: {
    fontSize: 30,
    color: '#423D3D',
    marginTop: 10,
  },
});
   
  