import React from 'react';
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Modal, Button, Image, Dimensions, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import formatDate from '../modules/formatDate';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { setDefaultGameName } from '../reducers/selectedGameName';
import { PieChart } from "react-native-chart-kit";
import { SwiperFlatList } from 'react-native-swiper-flatlist';

export default function StatScreen() {

  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user.value);
  const [statsByGame, setStatsByGame] = useState(true);
  const [gameStats, setGameStats] = useState(false);
  const [playerStats, setPlayersStats] = useState(false);
  const [generalStats, setGeneralStats] = useState([]);
  const [gameStatsInfos, setGameStatsInfos] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [friendStats, setFriendStats] = useState({})
  const [statsByTypes, setStatsByTypes] = useState([]);
  const formattedGameList = [];
  let topPlayersInfos;
  let formattedFriendsList = [];
  const [idInitialValue, setIdInitialValue] = useState(0);

  const defaultGameName = useSelector(state => state.defaultGameName.value);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://bgc-backend.vercel.app/stats/getGeneralsStats/${user.token}`)
      .then(response => response.json())
      .then(data => {
        if(data.result){
          setGeneralStats(data);
          const gameListFilter = data.userCloset.map(game => game.idGame.name);
          setGameList(gameListFilter);
        }
      });
      fetch(`https://bgc-backend.vercel.app/friends/getFriends/${user.token}`)
      .then(response => response.json())
      .then(data => {
        setFriendsList(data.friendsName)
      });
      fetch(`https://bgc-backend.vercel.app/stats/statsByTypes/${user.token}`)
      .then(response => response.json())
      .then(data => {
        const filteredEntries = Object.entries(data.percentages).filter(([_, valeur]) => valeur !== 0).map(([key,value]) => [key, Math.round(value)]).sort((a, b) => b[1] - a[1]);
        const sum = filteredEntries.reduce((acc, [, value]) => acc + value, 0);
        const adjustedData = filteredEntries.map(([name, value]) => [name, Math.round((value / sum) * 100)]);
        const filteredObject = Object.fromEntries(adjustedData);
        setStatsByTypes(filteredObject)
      })
  }, [isFocused]); 

  // Initialisation de la valeur de la composante rouge (R)
  let redValue = 131;
  let greenValue = 157;
  let blueValue = 156;
  let alphaValue = 1;
  const dataTypesChart  = Object.entries(statsByTypes).map(([name, valeur]) => {
    redValue -=30;
    alphaValue -=0.15;
    greenValue +=10;
    blueValue +=10;
    return{
    name,
    valeur,
    color:`rgba(${redValue}, ${greenValue}, ${blueValue}, ${alphaValue})`,
    legendFontColor: "#423D3D",
    legendFontSize: 10
    }
  });

  if (friendsList.length > 0) {
    for (let i = 0; i< friendsList.length; i++) {
        let newObj = {
            id: i+1,
            title: friendsList[i]
        };
        formattedFriendsList.push(newObj);
      }
  }

  if (gameList.length > 0) {
    for (let i = 0; i< gameList.length; i++) {
        let newObj = {
            id: i+1,
            title: gameList[i]
        };
        formattedGameList.push(newObj);
      }
  }

  const handleSelect = (item) => {
    if (item) {
        fetch(`https://bgc-backend.vercel.app/stats/gameInfo/${item.title}/${user.token}`)
        .then(response => response.json())
        .then(data => {
            setGameStatsInfos(data);
            setGameStats(true);
        })
    }
};

  const handleSelectFriend = (item) => {
    if (item){
      fetch(`https://bgc-backend.vercel.app/stats/friendStats/${user.token}/${item.title}`)
      .then(response => response.json())
      .then(data => {
          setFriendStats(data);
      })
    }
  }

  if (gameStatsInfos) {
     topPlayersInfos = gameStatsInfos.gameInfo.topPlayers.map(player => player._id);
  };


  const handleClear = () => {
    setGameStats(false);
    setIdInitialValue(0); 
  }

  const handleClearFriends = () => {
    setFriendStats({})
  }
                                                                                 

  const handleChessButton = () => {
    setStatsByGame(true)
    setGameStats(false) 
  }

  const handleUsersButton = () => {
    setStatsByGame(false);
    setIdInitialValue(0);
  }


  let backgroundColorStyle;
  let backgroundColorUsersButtonStyle;
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

  useEffect(() => {
    if(isFocused) {
              // console.log(selectedGameName);
         // Le titre que vous cherchez
         const titreRecherche = defaultGameName;

         // Recherche de l'objet correspondant
         const objetTrouve = formattedGameList.find(obj => obj.title === titreRecherche);
 
         // Extraction de l'id si l'objet est trouvé, sinon null
         const idTrouve = objetTrouve ? objetTrouve.id : null;
 
         // console.log("ID correspondant :", idTrouve);
 
         setIdInitialValue(idTrouve);
         console.log('okkkk');
         console.log(defaultGameName);
         console.log(idTrouve)
         console.log(idInitialValue);
    } else {
      dispatch(setDefaultGameName(null));
      setIdInitialValue(0);
      console.log('lalalala');
      console.log(defaultGameName);
      console.log(idInitialValue);
    }

  }, [isFocused, defaultGameName]);


  return (
    <AutocompleteDropdownContextProvider>
    <View style={styles.container}>
      <Header title="Stats" height={100}  showMeeple={true} currentScreen="StatScreen"/>
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
                    <AutocompleteDropdown
                        dataSet={formattedGameList}
                        onSelectItem={(item) => handleSelect(item)}
                        onClear={() => handleClear()}
                        textInputProps={{ placeholder: 'Rechercher un jeu' }}
                        closeOnSubmit
                        suggestionsListContainerStyle={{
                          backgroundColor: '#CDDCDB',
                          borderRadius: 20
                          }}
                        inputContainerStyle={{
                          backgroundColor: 'white',
                          borderRadius: 25,
                          width: 350
                          }}
                        ignoreAccents
                        initialValue={{id: idInitialValue}}
                    />
                  </View>
                  
             {gameStats && (
            <View style={styles.infoStatsContainer}>
              <View style={styles.nbGamesInClosetContainer}>
                <View style={styles.imgContainer}>
                  <Image
                  source={{uri: gameStatsInfos.gameInfo.imageUrl }}
                  style={{height: 150, width: 150}} />
                </View>
                {topPlayersInfos.length > 0 && (
                <View style={styles.topPlayersContainer}>
                  <Text style={{fontWeight: 700, color:'#423D3D'}}>Top 3</Text>
                  <Text>1: {topPlayersInfos[0]}</Text>
                  <Text>2: {topPlayersInfos[1]}</Text>
                  <Text>3: {topPlayersInfos[2]}</Text>
                </View>)}
                {topPlayersInfos.length === 0 && (
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: 700, color:'#423D3D'}}>Pas de vainqueur</Text>
                  </View>
                )}
              </View>
              <View style={styles.nbGamesPlayedContainer}>
                <View style={styles.nbGamesPlayedTextContainer}>
                  <Text style={{fontWeight: 700, color:'#423D3D'}}>Parties Jouées</Text>
                </View>
                <View style={styles.nbGamesPlayedByFrequencyContainer}>
                  <View style={styles.nbGamesPlayedTotalContainer}>
                    <Text>Total</Text>
                    <Text>{gameStatsInfos.gameInfo.numberOfGames}</Text>
                  </View>
                  <View style={styles.nbGamesPlayedMonthlyContainer}>
                    {/* <Text>Ce mois-ci</Text>
                    <Text>--</Text> */}
                  </View>
                </View>
              </View>
              <View style={styles.mostGamePlayed}>
                <Text style={{fontWeight: 700, color:'#423D3D'}}>Durée moyenne d'une partie</Text>
                {gameStatsInfos.gameInfo.numberOfGames !== 0 && (<Text>{gameStatsInfos.gameInfo.averageDuration}</Text>)}
                {gameStatsInfos.gameInfo.numberOfGames === 0 && (<Text>--</Text>)}
              </View> 
              <View style={styles.mostGamePlayed}>
                <Text style={{fontWeight: 700, color:'#423D3D'}}>Dernière partie</Text>
                {gameStatsInfos.gameInfo.numberOfGames !== 0 && (<Text>{gameStatsInfos.gameInfo.lastGameDate}</Text>)}
                {gameStatsInfos.gameInfo.numberOfGames === 0 && (<Text>--</Text>)}
              </View>  
          </View> )}
          {!gameStats && (
            <View style={styles.generalStatsContainer}>
            <View style={styles.infoStatsContainer}>
              <View style={styles.nbGamesInClosetContainer}>
                <Text style={{fontWeight: 700, color:'#423D3D'}}>Nb de jeux dans l'armoire</Text>
                <Text>{generalStats.gamesNumber}</Text>
              </View>
              <View style={styles.nbGamesPlayedContainer}>
                <View style={styles.nbGamesPlayedTextContainer}>
                  <Text style={{fontWeight: 700, color:'#423D3D'}}>Parties Jouées</Text>
                </View>
                <View style={styles.nbGamesPlayedByFrequencyContainer}>
                  <View style={styles.nbGamesPlayedTotalContainer}>
                    <Text style={{fontWeight: 500, color:'#423D3D'}}>Total</Text>
                    <Text>{generalStats.gamePlaysNumber}</Text>
                  </View>
                  <View style={styles.nbGamesPlayedMonthlyContainer}>
                    <Text style={{fontWeight: 500, color:'#423D3D'}}>Ce mois-ci</Text>
                    <Text>5</Text>
                  </View>
                </View>
              </View>
              <View style={styles.mostGamePlayed}>
                <Text style={{fontWeight: 700, color:'#423D3D'}}>Jeu le plus joué</Text>
                <Text>{generalStats.mostCommonGame}</Text>
              </View>
            </View>
              <View style={styles.pieChart}>
                <SwiperFlatList showPagination paginationActiveColor={'#CDDCDB'}>
                  <View style={styles.child}>
                    <PieChart
                    data={dataTypesChart}
                    width={Dimensions.get('window').width}
                    height={250}
                    chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    accessor={"valeur"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[0, 10]}
                    absolute
                    />
                    <Text style={{fontWeight: 500, color:'#423D3D', alignSelf:'center'}}>Répartition des types de jeux dans l'armoire (en %)</Text>
                  </View>
                  <View style={styles.child}>
                    <PieChart
                    data={dataTypesChart}
                    width={Dimensions.get('window').width}
                    height={250}
                    chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    accessor={"valeur"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[0, 10]}
                    absolute
                    />
                    <Text style={{fontWeight: 500, color:'#423D3D', alignSelf:'center'}}>Répartition des types de jeux dans l'armoire (en %)</Text>
                  </View>
                </SwiperFlatList> 
              </View>
            </View>
          )}
          
        </View>)}
        {!statsByGame && (
          <View style={styles.playerStatsContainer}>
            <AutocompleteDropdown
            dataSet={formattedFriendsList}
            onSelectItem={(item) => handleSelectFriend(item)}
            onClear={() => handleClearFriends()}
            textInputProps={{ placeholder: 'Rechercher un joueur' }}
            closeOnSubmit
            suggestionsListContainerStyle={{
              backgroundColor: '#CDDCDB',
              borderRadius: 20
              }}
            inputContainerStyle={{
              backgroundColor: 'white',
              borderRadius: 25,
              width: 350
              }}
            ignoreAccents
            />
          {friendStats.friendStats && (
          <View style={styles.infoStatsContainer}>
            <View style={styles.nbGamesPlayedContainer}>
              <View style={styles.nbGamesPlayedTextContainer}>
                <Text style={{fontWeight: 700, color:'#423D3D'}}>Parties Jouées</Text>
              </View>
              <View style={styles.nbGamesPlayedByFrequencyContainer}>
                <View style={styles.nbGamesPlayedTotalContainer}>
                  <Text style={{fontWeight: 500, color:'#423D3D'}}>Total</Text>
                  <Text>{friendStats.friendStats.totalGames}</Text>
                </View>
                {/* <View style={styles.nbGamesPlayedMonthlyContainer}>
                  <Text style={{fontWeight: 500, color:'#423D3D'}}>Ce mois-ci</Text>
                  <Text>5</Text>
                </View> */}
              </View>
            </View>
            <View style={styles.mostGamePlayed}>
                <Text style={{fontWeight: 700, color:'#423D3D'}}>Nb de victoires</Text>
                <Text>{friendStats.friendStats.totalWins}</Text>
            </View>
            <View style={styles.mostGamePlayed}>
                <Text style={{fontWeight: 700, color:'#423D3D'}}>Jeu le plus joué</Text>
                <Text>{friendStats.friendStats.mostPlayedGame}</Text>
            </View>
            <View style={styles.mostGamePlayed}>
                <Text style={{fontWeight: 700, color:'#423D3D'}}>Dernière partie</Text>
                <Text>{friendStats.friendStats.lastGame}</Text>
            </View>
          </View> )}
          {friendStats.message && (
            <View style={styles.infoStatsContainer}>
              <Text>Aucune stat disponible pour ce joueur.</Text>
            </View>
          )}
        </View>
        )}
      
      </View>
    </View>
    </AutocompleteDropdownContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F1',
  },
  dropdownContainer: {
    alignItems: 'center'
    },
  gameOrPlayerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 25
  },
  gameStatsContainer: {
    alignItems: 'center'
  },
  playerStatsContainer: {
    alignItems:'center'
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
  generalStatsContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoStatsContainer: {
    alignItems: 'center',
    marginTop: 50,
    width: '70%',
  },
  pieChart: {
    height: 310
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
