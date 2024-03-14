import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Clé de stockage pour AsyncStorage
const STORAGE_KEY = 'diceValues';

// Composant enfant de AccessoiresScreen.js
function Dice() {
  // État pour stocker les valeurs des dés
  const [diceValues, setDiceValues] = useState([]);
 


  // Charger les données des dés sauvegardées lorsque le composant est monté
  useEffect(() => {
    const fetchDiceValues = async () => {
      try {
        // Récupérer les valeurs des dés sauvegardées dans AsyncStorage
        const storedDiceValues = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedDiceValues !== null) {
          // Si des valeurs sont présentes, les définir comme état initial
          setDiceValues(JSON.parse(storedDiceValues));
        }
      } catch (error) {
        // Gérer les erreurs de récupération des valeurs des dés
        console.error('Erreur lors du chargement des dés depuis AsyncStorage :', error);
      }
    };

    fetchDiceValues();
  }, []);

  // Mettre à jour les données des dés et les sauvegarder dans AsyncStorage
  const updateAndSaveDiceValues = (updatedDiceValues) => {
    setDiceValues(updatedDiceValues);
    // Sauvegarder les nouvelles valeurs des dés dans AsyncStorage
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDiceValues))
      .catch(error => console.error('Erreur lors de la sauvegarde des dés dans AsyncStorage :', error));
  };

  // Fonction pour ajouter un nouveau dé
  const addDice = () => {
    // Créer un nouveau dé avec des valeurs par défaut
    const defaultName = `Dé ${diceValues.length + 1}`;
    const newDice = { value: null, numFaces: 6, name: defaultName };
    // Mettre à jour les valeurs des dés et les sauvegarder
    updateAndSaveDiceValues([...diceValues, newDice]);
  };

  // Fonction pour générer un nombre aléatoire positif au lancer de dés
  const generateRandomNumber = (index) => {
    const newDiceValues = [...diceValues];
    // Générer un nombre aléatoire entre 1 et le nombre de faces du dé
    newDiceValues[index].value = Math.floor(Math.random() * newDiceValues[index].numFaces) + 1;
    // Mettre à jour les valeurs des dés et les sauvegarder
    setDiceValues(newDiceValues);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDiceValues))
      .catch(error => console.error('Erreur lors de la sauvegarde des dés dans AsyncStorage :', error));
  };

  // Fonction pour incrémenter le nombre de faces du dé
  const incrementFaces = (index) => {
    const newDiceValues = [...diceValues];
    // Incrémenter le nombre de faces du dé tout en vérifiant la limite supérieure
    newDiceValues[index].numFaces = Math.min(newDiceValues[index].numFaces + 1, 100);
    // Mettre à jour les valeurs des dés
    setDiceValues(newDiceValues);
  };

  // Fonction pour décrémenter le nombre de faces du dé
  const decrementFaces = (index) => {
    const newDiceValues = [...diceValues];
    // Décrémenter le nombre de faces du dé tout en vérifiant la limite inférieure
    newDiceValues[index].numFaces = Math.max(newDiceValues[index].numFaces - 1, 1);
    // Mettre à jour les valeurs des dés
    setDiceValues(newDiceValues);
  };

  // Fonction pour lancer tous les dés en même temps
  const rollAllDice = () => {
    const newDiceValues = [...diceValues];
    // Générer une valeur aléatoire pour chaque dé
    newDiceValues.forEach((die, index) => {
      die.value = Math.floor(Math.random() * die.numFaces) + 1;
    });
    // Mettre à jour les valeurs des dés et les sauvegarder
    setDiceValues(newDiceValues);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDiceValues))
      .catch(error => console.error('Erreur lors de la sauvegarde des dés dans AsyncStorage :', error));
  };

  // Fonction pour supprimer un dé
  const removeDice = (index) => {
    const updatedDiceValues = [...diceValues];
    // Supprimer le dé à l'index spécifié
    updatedDiceValues.splice(index, 1);
    // Mettre à jour les valeurs des dés et les sauvegarder
    updateAndSaveDiceValues(updatedDiceValues);
  };

  return (
    <View style={styles.container}>
      {/* Bouton pour ajouter un nouveau dé */}
      <View style={styles.addDiceSection}>
        <View style={styles.buttonAddRoll}>
          <TouchableOpacity style={styles.addButton} onPress={addDice}>
            <FontAwesome5 style={styles.fabtn} name="plus-circle" size={24} color="#423D3D" />
            {/* Logo + de FA5 */}
            <Text style={styles.buttonText}>Ajouter un dé</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={rollAllDice} style={styles.rollAllButton}>
            <FontAwesome5 style={styles.fabtn} name="redo-alt" size={24} color="#423D3D" />
            <Text style={styles.rollAllButtonText}>Lancer les dés</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {diceValues.map((die, index) => (
          <View key={index}>
            {/* Affichage du numéro du dé au-dessus de cardContainer */}
            <View style={styles.dieNumberContainer}>
              <Text style={styles.dieNumberText}>{`Dé ${index + 1}`}</Text>
            </View>

            <View style={styles.cardContainer}>
              {/* Contenu du cardContainer */}
              <View style={styles.iconTextContainer}>
                <View style={styles.buttonContainer}>
                  {/* Boutons d'incrémentation et de décrémentation pour choisir le nombre de faces du dé */}
                  <View style={styles.numberOfFaces}>
                    <TouchableOpacity onPress={() => decrementFaces(index)}>
                      <AntDesign name="minus" size={20} color="#423D3D" />
                    </TouchableOpacity>
                    {/* Si le nombre de faces === 1 : afficher "face", sinon afficher "faces" */}
                    <Text>{die.numFaces} {die.numFaces === 1 ? 'face' : 'faces'}</Text>
                    <TouchableOpacity onPress={() => incrementFaces(index)}>
                      <AntDesign name="plus" size={20} color="#423D3D" />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Logo flèche tournée de FontAwesome5 */}
              </View>
              {/* Afficher le résultat dans un cercle s'il y a une valeur générée, sinon afficher le resultCircle par défaut */}
              <View style={styles.resultContainer}>
                <View style={styles.centeredResultContainer}>
                  <View style={styles.resultCircle}>
                    {die.value !== null ? (
                      <Text style={styles.resultNumber}>{die.value}</Text>
                    ) : (
                      <Text style={styles.resultNumber}>Dé</Text>
                    )}
                  </View>
                </View>
              </View>
              {/* Bouton pour supprimer le dé */}
              <TouchableOpacity onPress={() => removeDice(index)} style={styles.removeButton}>
                <Octicons name="x-circle-fill" size={24} color="#6E9D9C" />
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                {/* Bouton "redo" à droite */}
                <TouchableOpacity onPress={() => generateRandomNumber(index)} style={styles.redo}>
                  <FontAwesome5 name="redo-alt" size={35} color="#423D3D" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    marginTop:30,
    height: '70%', 

  },
  numberOfFaces: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft:30,
  },
  fabtn: {
    marginLeft: 5,
    marginRight: 5,
    height: 25,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor :"#88B7B6",
    alignItems: 'center',
    borderRadius: 50,
    height: 40,
    width : 150,
    marginTop: 60,
    margin : 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  addDiceSection:{
    marginTop:-30,
    marginBottom:10,
  },
  cardContainer: {
    height: 120,
    width: 300,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#CDDCDB',
    margin: 7,
    borderRadius: 15,
    justifyContent: 'space-around',
    marginTop:10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: '70%', 
  },
  
  resultContainer: {
    height: 80,
    backgroundColor: '#CDDCDB',
    borderRadius: 15,
    alignItems: 'center',
   
  },
  resultCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#F2F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  resultNumber: {
    color: '#423D3D',
    fontSize: 30,
    fontWeight:'bold',
  },
  redo: {
    paddingLeft:100,
    marginRight:40,
    marginBottom:10,
  },
  removeButton: {
    position: 'absolute',
    top: -1,
    right: -1,
  },
  rollAllButton: {
    flexDirection: 'row',
    backgroundColor :"#88B7B6",
    alignItems: 'center',
    borderRadius: 50,
    height: 40,
    width : 150,
    marginTop: 60,
    margin : 20,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  rollAllButtonText: {
    color: '#fff',
    margin:3,
  },
  buttonAddRoll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    paddingHorizontal: 10,
  },
  dieNumberContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  dieNumberText: {
    fontSize: 16,
    color: '#423D3D',
    marginBottom:-15,
  },
  
});


export default Dice;
