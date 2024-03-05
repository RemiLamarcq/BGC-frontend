import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Importer FontAwesome5

function Dice() {
  const [diceValues, setDiceValues] = useState([null]);

  const addDice = () => {
    setDiceValues([...diceValues, null]);
  };

  const generateRandomNumber = (index) => {
    const newDiceValues = [...diceValues];
    newDiceValues[index] = Math.floor(Math.random() * 20) + 1;
    setDiceValues(newDiceValues);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addDice}>
        <TouchableOpacity onPress={addDice}>
          <AntDesign name="plus" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {diceValues.map((value, index) => (
        <View key={index} style={styles.cardContainer}>
          <TouchableOpacity onPress={() => generateRandomNumber(index)}>
            <View style={styles.iconTextContainer}>
              <FontAwesome5 name="dice" size={20} color="black" />
              <Text style={styles.lancerText}>Lancer le dé</Text>
            </View>
          </TouchableOpacity>
          {value !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.result}>Résultat : {value}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
  },

  addDice: {
    marginBottom: 10,
  },

  cardContainer: {
    height: 120,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#CDDCDB',
    margin: 3,
    borderRadius: 15,
  },

  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  lancerText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  roundButton: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: 'black',
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#CDDCDB',
    borderRadius: 15,
  },
  result: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dice;
