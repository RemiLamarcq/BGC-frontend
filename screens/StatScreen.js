import React from 'react';
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Modal, Button, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import formatDate from '../modules/formatDate';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function StatScreen() {

  const user = useSelector((state) => state.user.value);
  const [statsByGame, setStatsByGame] = useState(true);
  const [gameStats, setGameStats] = useState(false);
  const [playerStats, setPlayersStats] = useState(false);
  const dataGameTest = [{id: 1, title: 'A'},{id: 2, title: 'B'},{id: 3, title: 'C'},{id: 4, title: 'D'},{id: 5, title: 'E'},{id: 6, title: 'F'}]

  const handleClearGameStats = () => {
    console.log('1');
  }

  const handleClearGameCard = () => {
    console.log('2');
  }
  const handleSelect = (item) => {
    console.log('3');
  }

  const handleTest = () => {
    setGameStats(!gameStats)
  }

  const handleChessButton = () => {
    setStatsByGame(true)
  }

  const handleUsersButton = () => {
    setStatsByGame(false)
  }

  let backgroundColorStyle;
  let backgroundColorUserButtonStyle;
  let backgroundColorChessButtonStyle

  if (gameStats) {
    backgroundColorStyle = '#CDDCDB'
  }
  else {
    backgroundColorStyle = '#FFFFFF'
  };

  if (statsByGame) {
    backgroundColorChessButtonStyle = '#CDDCDB';
    backgroundColorUsersButtonStyle = '#FFFFFF'

  }
  else {
    backgroundColorChessButtonStyle = '#FFFFFF'
    backgroundColorUsersButtonStyle = '#CDDCDB'
  }

  return (
    <View style={styles.container}>
      <Header title="Stats" height={100}  showMeeple={true}/>
      <View style={styles.statsContainer}>
        <View style={styles.gameOrPlayerButtons}>
          <TouchableOpacity style={styles.gameButton}>
            <FontAwesome5 name="chess-pawn" size={60} color="#423D3D" backgroundColor={backgroundColorChessButtonStyle} style={styles.chessIcon} onPress={handleChessButton}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.usersButton}>
            <FontAwesome name="users" size={60} color="#423D3D" backgroundColor={backgroundColorUsersButtonStyle} style={styles.usersIcon} onPress={handleUsersButton}/>
          </TouchableOpacity>
        </View>
        {statsByGame && (
          <View style={styles.gameStatsContainer}>
                  <View style={styles.dropdownContainer}>
                  <AutocompleteDropdownContextProvider>
                    <AutocompleteDropdown
                        dataSet={dataGameTest}
                        onSelectItem={(item) => handleSelect(item)}
                        textInputProps={{ placeholder: 'Rechercher un jeu' }}
                        closeOnSubmit
                        suggestionsListContainerStyle={{
                          backgroundColor: '#CDDCDB',
                          marginTop: -40,
                          borderRadius: 20
                          }}
                        inputContainerStyle={{
                          backgroundColor: 'white',
                          borderRadius: 25,
                          width: 350
                          }}
                        onClear={handleClearGameStats}
                        onOpenSuggestionsList={handleClearGameCard}
                        ignoreAccents
                    />
                  </AutocompleteDropdownContextProvider>
                    <TouchableOpacity style={{borderWidth: 1, backgroundColor:backgroundColorStyle}} onPress={handleTest}>
                      <Text>Bouton qui permet de simuler la fiche d'un jeu tant que la foutue dropdown fonctionne pas</Text>
                    </TouchableOpacity>
                  </View>
                  
             {gameStats && (
            <View style={styles.infoStatsContainer}>
              <View style={styles.nbGamesInClosetContainer}>
                <View style={styles.imgContainer}>
                  <Image
                  source={{uri: "https://www.ludocortex.fr/12487-home_default/7-wonders-repos-prod.jpg" }}
                  style={{height: 150, width: 150}} />
                </View>
                <View style={styles.topPlayersContainer}>
                  <Text style={{fontWeight: 700, color:'#423D3D'}}>Top 3</Text>
                  <Text>1: Marcel Patoulatchi</Text>
                  <Text>2: Jeanne Mas</Text>
                  <Text>3: Raida</Text>
                </View>
              </View>
              <View style={styles.nbGamesPlayedContainer}>
                <View style={styles.nbGamesPlayedTextContainer}>
                  <Text style={{fontWeight: 700, color:'#423D3D'}}>Parties Jouées</Text>
                </View>
                <View style={styles.nbGamesPlayedByFrequencyContainer}>
                  <View style={styles.nbGamesPlayedTotalContainer}>
                    <Text>Total</Text>
                    <Text>8</Text>
                  </View>
                  <View style={styles.nbGamesPlayedMonthlyContainer}>
                    <Text>Ce mois-ci</Text>
                    <Text>3</Text>
                  </View>
                </View>
              </View>
              <View style={styles.mostGamePlayed}>
                <Text style={{fontWeight: 700, color:'#423D3D'}}>Durée moyenne d'une partie</Text>
                <Text> 27 min</Text>
              </View> 
              <View style={styles.mostGamePlayed}>
                <Text style={{fontWeight: 700, color:'#423D3D'}}>Dernière partie</Text>
                <Text> 13/02/2024 - 15h30</Text>
              </View>  
          </View> )}
          {!gameStats && (
            <View style={styles.infoStatsContainer}>
              <View style={styles.nbGamesInClosetContainer}>
                <Text style={{fontWeight: 700, color:'#423D3D'}}>Nb de jeux dans l'armoire</Text>
                <Text>22</Text>
              </View>
              <View style={styles.nbGamesPlayedContainer}>
                <View style={styles.nbGamesPlayedTextContainer}>
                  <Text style={{fontWeight: 700, color:'#423D3D'}}>Parties Jouées</Text>
                </View>
                <View style={styles.nbGamesPlayedByFrequencyContainer}>
                  <View style={styles.nbGamesPlayedTotalContainer}>
                    <Text style={{fontWeight: 500, color:'#423D3D'}}>Total</Text>
                    <Text>16</Text>
                  </View>
                  <View style={styles.nbGamesPlayedMonthlyContainer}>
                    <Text style={{fontWeight: 500, color:'#423D3D'}}>Ce mois-ci</Text>
                    <Text>5</Text>
                  </View>
                </View>
              </View>
              <View style={styles.mostGamePlayed}>
                <Text style={{fontWeight: 700, color:'#423D3D'}}>Jeu le plus joué</Text>
                <Text> Les petits chevaux</Text>
            </View>  
        </View>
          )}
          </View>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F1',
  },
  dropdownContainer: {
    alignItems: 'center',
    },
  gameOrPlayerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 25
  },
  gameStatsContainer: {
    alignItems: 'center'
  },
  gameButton: {
    marginRight: 30,
  },
  usersButton: {
    marginLeft: 30
  },
  chessIcon: {
    borderRadius: 15,
  },
  infoStatsContainer: {
    alignItems: 'center',
    marginTop: 50,
    width: '80%'
  },
  nbGamesInClosetContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#CDDCDB',
    borderRadius: 30,
    padding: 15
  },
  nbGamesPlayedContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#CDDCDB',
    borderRadius: 30,
    padding: 5,
    paddingLeft: 15,
    alignItems: 'center',
    marginTop: 30
  },
  nbGamesPlayedByFrequencyContainer: {
    marginRight: 15,
    width: '35%'
  },
  nbGamesPlayedTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nbGamesPlayedMonthlyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mostGamePlayed: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#CDDCDB',
    borderRadius: 30,
    padding: 15,
    marginTop: 30 
  }
});
