import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Octicons } from '@expo/vector-icons';

// Composant enfant de AccessoiresScreen.js
function Dice() {
  // État pour stocker les valeurs des dés
  const [diceValues, setDiceValues] = useState([null]);
  // État pour suivre le nombre de faces du dé
  const [numFaces, setNumFaces] = useState(6); // Initialisé à 6 faces, par exemple

  // Fonction pour ajouter un nouveau dé
  const addDice = () => {
    setDiceValues([...diceValues, null]); // Ajout d'un dé
  };

  // Fonction pour générer un nombre aléatoire positif au lancer de dés
  const generateRandomNumber = (index) => {
    const newDiceValues = [...diceValues];
    // Math.floor() pour arrondir le résultat à un nombre entier
    // Math.random() pour obtenir un nombre décimal entre 1 et le nombre de faces du dé lancé.
    newDiceValues[index] = Math.floor(Math.random() * numFaces) + 1;
    setDiceValues(newDiceValues);
  };

  // Fonction pour incrémenter le nombre de faces du dé
  const incrementFaces = () => {
    // Assure que le nombre de faces n'excède pas 100
    setNumFaces((prevNumFaces) => (prevNumFaces < 100 ? prevNumFaces + 1 : prevNumFaces));
  };

  // Fonction pour décrémenter le nombre de faces du dé
  const decrementFaces = () => {
    // Assure que le nombre de faces reste supérieur à 1
    setNumFaces((prevNumFaces) => (prevNumFaces > 1 ? prevNumFaces - 1 : prevNumFaces));
  };

  // Fonction pour supprimer un dé
  const removeDice = (index) => {
    const newDiceValues = [...diceValues];
    newDiceValues.splice(index, 1);
    setDiceValues(newDiceValues);
  };

  return (
    <View style={styles.container}>
      {/* Bouton pour ajouter un nouveau dé */}
      <View style={styles.addDiceSection}>
        <TouchableOpacity style={styles.addButton} onPress={addDice}>
          <FontAwesome5 style={styles.fabtn} name="plus-circle" size={24} color="#423D3D" />
          {/* Logo + de FA5 */}
          <Text style={styles.buttonText}>Ajouter un dé</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {diceValues.map((value, index) => (
          <View key={index} style={styles.cardContainer}>
            <View style={styles.iconTextContainer}>
              <View style={styles.buttonContainer}>
                {/* Boutons d'incrémentation et de décrémentation pour choisir le nombre de faces du dé */}
                <View style={styles.numberOfFaces}>
                  <TouchableOpacity onPress={decrementFaces}>
                    <AntDesign name="minus" size={20} color="#423D3D" />
                  </TouchableOpacity>
                  {/* Si nombre de face === 1 : afficher face, sinon afficher faces */}
                  <Text>{numFaces} {numFaces === 1 ? 'face' : 'faces'}</Text>
                  <TouchableOpacity onPress={incrementFaces}>
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
                  {value !== null ? (
                    <Text style={styles.resultNumber}>{value}</Text>
                  ) : (
                    <Text style={styles.resultNumber}>dé</Text>
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
    alignItems: 'center',
    backgroundColor: '#88B7B6',
    borderRadius: 35,
    width: 110,
    height: 40,
  },
  addDiceSection:{
    marginTop:-20,
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
    marginTop:50,
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
  buttonText: {
    fontSize: 10,
  },
  resultContainer: {
    height: 80,
    padding: 17,
    backgroundColor: '#CDDCDB',
    borderRadius: 15,
    alignItems: 'center',
  },
  resultCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F2F4F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultNumber: {
    color: '#423D3D',
    fontSize: 18,
  },
  redo: {
    paddingLeft: 100,
    marginRight:20,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
});

export default Dice;
