import React from 'react';
import { Modal, TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/Header';

//Composant enfant de AccessoiresScreen.js

// Le composant AccessoryModal est utilisé dans AccessoiresScreen.js pour les différentes zones cliquables
// Props :
// - isVisible : Contrôle la visibilité de la modal.
// - closeModal : Fonction pour fermer la modal.
// - modalContent : Le contenu à afficher à l'intérieur de la modal.
function AccessoryModal({ isVisible, closeModal, modalContent, modalTitle }) {
  return (
    <View style={styles.AccessoryModal}>
    {/*Modal pour afficher le contenu de la zone cliquée*/}
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={closeModal}>
      {/* Afficher le composant Header avec le titre dynamique */}
      <Header title={modalTitle} height={100} />
      {/* Conteneur principal de la modal */}
      <View style={styles.modalContainer}>
        {/* Bouton de fermeture de la modal */}
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        {/* Contenu de la modal */}
        <View style={styles.modalContent}>{modalContent}</View>
      </View>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F4F1',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F4F1',
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
});

export default AccessoryModal;
