import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function Dice() {
 

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1; //générer un nombre aléatoire entre 1 et 20
    alert(`Nombre aléatoire : ${randomNumber}`);
  };

  return (
    <View style={{ flex: 1, padding: 10, borderWidth: 1, borderRadius: 15, alignItems: 'center' }}>
      <TouchableOpacity onPress={generateRandomNumber} style={{ marginTop: 20, backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white' }}>Lancer le dé : </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Dice;
