import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function Dice() {
  const [counter, setCounter] = useState(6); // Initialisation du compteur à 6 faces

  const decrementCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  
const incrementCounter = () => {
    if (counter < 20) { //Incrémentation du nb de faces du dé si inférieur à 20
      setCounter(counter + 1);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, borderWidth: 1, borderColor: 'gray', alignItems: 'center' }}>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={decrementCounter} disabled={counter === 1}>
          <Text style={{ fontSize: 20, color: counter === 1 ? 'gray' : 'black', marginRight: 10 }}>-</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{counter}</Text>
        <TouchableOpacity onPress={incrementCounter} disabled={counter === 20}>{/*Le compteur ne peut pas s'incrémenter au delà de 20 faces*/}
          <Text style={{ fontSize: 20, color: counter === maxValue ? 'gray' : 'black', marginLeft: 10 }}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Section pour afficher le compteur */}
      <View>
        <Text>Nombre de faces : {counter}</Text>
      </View>
    </View>
  );
}

export default Dice;
