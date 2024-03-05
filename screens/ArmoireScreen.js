import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Armoirecreen() {

  const [gamesData, setGamesData] = useState([]);
  const token = useSelector(state => state.user.value.token);
  console.log(token);

  const handleAddGame = () => {
    console.log('love chocolate');
  }
  
  let armoire;
  
  useEffect(() => {
    fetch(`https://bgc-backend.vercel.app/games/closet/${token}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.result){
            const formatedData = data.games.map(game => {
              console.log(formatedData);
            return { personalNote, objectID, name, urlImg, minPlayers, maxPlayers, duration, gameType };
          });
            setGamesData(formatedData);
            if(data.gameNames.length > 0){
              armoire = gamesData.map((data, i) => {
                return <Game key={i} image={data.urlImg} minPlayers={data.minPlayers} maxPlayers={data.maxPlayers} duration={data.duration} gameType={data.gameType} personalNote={data.personalNote} id={objectID} />;
              });
            } else {
              armoire = 
                <View>
                  <View>
                    <Text style={styles.textAucunJeu}>Aucun jeu dans l'armoire</Text>
                  </View>
                  <View style={styles.divBigAjouterJeu}>
                    <TouchableOpacity style={styles.bigPlusButton} onPress={handleAddGame}>
                      <FontAwesome name="plus" size={40} color='#F2F4F1' backgroundColor='#423D3D' style={styles.bigAddIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.textBigAjouterJeu}>Ajouter un jeu</Text>
                  </View>
                </View>
            }
        }
      });
  }, []); 

    

  return (
    <KeyboardAvoidingView style={styles.container}>
      {armoire}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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


});
   
  