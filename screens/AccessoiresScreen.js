import React from 'react';
import { useState } from 'react';
import Accessories from '../components/Accessories';//on importe le composant Accessories
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Dice from '../components/Dice';//on importe le composant Dice
import Header from '../components/Header';//on importe le header

//Composant parent de Accessories.js

export default function AccessoiresScreen() {
  
  const [showModal, setShowModal] = useState(false);//initialisation l'état de la modale à false tant que l'on a pas cliqué sur une section


//Création d'une fonction pour cliquer une section accessoires.
  const handleZoneClick = (zone) => {
    console.log(`${zone}`);
    if (zone === 1) {
      setShowModal(true);//au clic sur la zone 1, la modale s'ouvre
    }
  };

  const closeModal = () => {
    setShowModal(false);//au clic sur la fonction closeModal, on set la fonction showModal pour l'initialiser à false
  };

    return (
      <View style={{ flex: 1, backgroundColor: '#F1F4F2' }}>{/*vue d'ensemble de la AccessoiresScreen*/}
       <Header title="Accessoires" height={100} />{/*header title + taille du header à modifier selon les pages*/}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{/*style des 3 zones cliquables*/}
            
                <View style={{ width: '90%' }}>{/*largeur des zones cliquables*/}
                {/*zone 1*/}
                    <Accessories
                      name="Lancer de dés"
                      image={require('../assets/dice.png')}
                      onPress={() => handleZoneClick(1)}
                    />
                    {/*zone 2*/}
                    <Accessories
                      name="Timer"
                      image={require('../assets/timer.png')}
                      onPress={() => handleZoneClick(2)}
                    />
                    {/*zone 3*/}
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
         <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text>Fermer</Text>{/*METTRE UNE ICONE A LA PLACE !!!!*/}
            </TouchableOpacity>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Dice />{/* Inclure le composant Dice dans la modal*/}
          </View>
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
