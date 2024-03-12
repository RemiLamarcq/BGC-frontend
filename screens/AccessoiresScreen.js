import React, { useState } from 'react';
import { View } from 'react-native';
// Import du composant Header
import Header from '../components/Header';
// Import du composant Accessories
import Accessories from '../components/Accessories';
// Import du composant Modal
import AccessoryModal from '../components/AccessoryModal';
// Import du composant Dice
import Dice from '../components/Dice';
// Import du composant Timer
import Timer from '../components/Timer';
// Import du composant Notepad
//import Notepad from '../components/Notepad';
import { useNavigation } from '@react-navigation/native';


export default function AccessoiresScreen() {
  // États pour gérer l'affichage de la modal et son contenu
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('Accessoires');
  const navigation = useNavigation();


  // Fonction pour gérer le clic sur une zone accessoire
  const handleZoneClick = (zone) => {
    console.log(`${zone}`);
    let title = '';
   
    // Définir le contenu et le titre en fonction de la zone
    if (zone === 1) {
      setModalContent(<Dice />);
      title = 'Dés';
    } else if(zone === 2) {
      setModalContent(<Timer />); 
      title = 'Timer';
    };/* else if (zone === 3) {
      setModalContent(<Notepad />); 
      title = 'Bloc-notes';
    }*/

    // Mettre à jour le titre dynamique
    setModalTitle(title);

    // Afficher la modal
    setShowModal(true);
  };

  // Fonction pour fermer la modal
  const closeModal = () => {
    setShowModal(false);
    
  };

  // Retourner la structure de la page AccessoiresScreen
  return (
    <View style={{ flex: 1, backgroundColor: '#F1F4F2' }}>
      {/* Affichage du composant Header avec le titre 'Accessoires' , une hauteur de 100, et le meeple à true pour logout depuis le screen */}
      <Header title="Accessoires" height={100} showMeeple={true} />
      {/* Vue principale de la page */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Vue contenant les zones cliquables avec une largeur de 90% de la vue parente */}
        <View style={{ width: '90%' }}>
          {/* Composant Accessories pour la zone 1 (Lancer de dés) avec une fonction onPress */}
          <Accessories
            name="Lancer de dés"
            image={require('../assets/dice.png')}
            onPress={() => handleZoneClick(1)}
          />
          {/* Composant Accessories pour la zone 2 (Timer) avec une fonction onPress */}
          <Accessories
            name="Timer"
            image={require('../assets/timer.png')}
            onPress={() => handleZoneClick(2)}
          />
          {/* Composant Accessories pour la zone 3 (Bloc-notes) avec une fonction onPress*/} 
          <Accessories
            name="Bloc-notes"
            image={require('../assets/notepad.png')}
            onPress={() => navigation.navigate('NotPad')}
          />
        </View>
      </View>

      {/* Affichage de la modal avec les propriétés isVisible, closeModal, et modalContent */}
      <AccessoryModal 
      isVisible={showModal} 
      closeModal={closeModal} 
      modalContent={modalContent} 
      modalTitle={modalTitle} 
      />
    </View>
  );
};
