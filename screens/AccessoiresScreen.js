import React from 'react';
import Accessories from '../components/Accessories';
import { View, Text } from 'react-native';

//Composant parent de Accessories.js

export default function AccessoiresScreen() {
//Création d'une fonction pour cliquer une zone. Zone 1 = lancer de dés, Zone 2 = timer, Zone 3 = bloc-notes.
  const handleZoneClick = (zone) => {
    console.log(`Zone ${zone} cliquée`);
  };

    return (
      <View style={{ flex: 1, backgroundColor: '#F1F4F2' }}>{/*vue d'ensemble de la AccessoiresScreen*/}

          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>Accessoires</Text>{/*Futur HEADER*/}

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{/*style des 3 zones cliquables*/}
            
                <View style={{ width: '90%' }}>{/*largeur des zones cliquables*/}
                    <Accessories
                      name="Lancer de dés"
                      image={require('../assets/dice.png')}
                      onPress={() => handleZoneClick(1)}
                    />
                    <Accessories
                      name="Timer"
                      image={require('../assets/timer.png')}
                      onPress={() => handleZoneClick(2)}
                    />
                    <Accessories
                      name="Bloc-notes"
                      image={require('../assets/notepad.png')}
                      onPress={() => handleZoneClick(3)}
                    />
                </View>
          </View>
    </View>
    );
}



