import React from 'react';
import { useState } from 'react';
import Accessories from '../components/Accessories';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Dice from '../components/Dice'

//Composant parent de Accessories.js

export default function AccessoiresScreen() {
  
  const [showModal, setShowModal] = useState(false);


//Création d'une fonction pour cliquer une zone. Zone 1 = lancer de dés, Zone 2 = timer, Zone 3 = bloc-notes.
  const handleZoneClick = (zone) => {
    console.log(`Zone ${zone} cliquée`);
    if (zone === 1) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
          <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {/* Contenu de la modale */}
          <TouchableOpacity style={styles.modalContent} onPress={closeModal}>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
    );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F1F4F2', // Fond semi-transparent pour masquer le contenu
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    height: '80%',  // Ajustez la taille de la modale selon vos besoins
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});
