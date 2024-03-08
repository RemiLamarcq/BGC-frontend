import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Importer FontAwesome5
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
      <View >
        <TouchableOpacity style={styles.addButton} onPress={addDice}>
        <FontAwesome5 style={styles.fabtn} name="plus-circle" size={24} color="#423D3D" />{/* Logo + de FA5 */}
          <Text style={styles.buttonText}>Ajouter un dé</Text>
        </TouchableOpacity>
      </View>

      {/* Afficher les composants de dés en fonction de l'état */}
      {diceValues.map((value, index) => (
        <View key={index} style={styles.cardContainer}>
          {/* Bouton pour lancer le dé */}
          <TouchableOpacity onPress={() => generateRandomNumber(index)}>
            <View style={styles.iconTextContainer}>
              {/* Boutons d'incrémentation et de décrémentation pour choisir le nombre de faces du dé */}
              <View style={styles.numberOfFaces}>
                <View style={styles.resultCircle}>
                  <TouchableOpacity onPress={decrementFaces}>
                    <AntDesign name="minus" size={20} color="#423D3D" />
                  </TouchableOpacity>
                </View>
                {/* Si nombre de face === 1 : afficher face, sinon afficher faces */}
                <Text>{numFaces} {numFaces === 1 ? 'face' : 'faces'}</Text>
                <View style={styles.resultCircle}>
                  <TouchableOpacity onPress={incrementFaces}>
                    <AntDesign name="plus" size={20} color="#423D3D" />
                  </TouchableOpacity>
                </View>
              </View>
              <FontAwesome5 name="redo-alt" size={35} color="#423D3D" style={styles.redo} />
              {/* Logo flèche tournée de FontAwesome5 */}
            </View>
          </TouchableOpacity>

          {/* Afficher le résultat s'il y a une valeur générée */}
          {value !== null && (
            <View style={styles.resultContainer}>
              {/* Afficher le résultat dans un cercle */}
              <View style={styles.resultCircle}>
                <Text style={styles.resultNumber}>{value}</Text>
              </View>
            </View>
          )}
           {/* Bouton pour supprimer le dé */}
           <TouchableOpacity onPress={() => removeDice(index)} style={styles.removeButton}>
           <Octicons name="x-circle-fill" size={24} color="#423D3D" />
          </TouchableOpacity>
        </View>
      ))}
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

  cardContainer: {
    height: 150,
    width: 340,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#CDDCDB',
    margin: 20,
    borderRadius: 15,
    justifyContent: 'space-around',
  },

  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: '70%', 
  },

  roundButton: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
  },

  buttonText: {
    fontSize: 10,
  },

  resultContainer: {
    height: 80,
    padding: 10,
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
    marginRight:15,
  },

  resultNumber: {
    color: '#423D3D',
    fontSize: 18,
  },

  redo: {
    paddingLeft: 10,
    marginBottom: 15,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Dice;
