import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { setAddGamePlayVisible } from '../reducers/addGamePlayVisible';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';

function Header({ 
  title, 
  height, 
  showSearchBar, 
  showMeeple, 
  toggleModalAddGame, 
  onSearchGameChange, 
  handleGamePlaysFilter,
  isInNotebook, 
  showGameCounter,
  initialGames, 
}) {
    // Dispatch pour exécuter les actions Redux
    const dispatch = useDispatch();
    // Navigation pour la navigation entre les écrans
    const navigation = useNavigation();
    // Utilisateur actuel récupéré depuis le Redux store
    const user = useSelector((state) => state.user.value);
    // Visibilité du composant d'ajout de partie de jeu récupéré depuis le Redux store
    const addGamePlayVisible = useSelector(state => state.addGamePlayVisible.value);
    // État local pour la valeur de recherche dans la section "jeu"
    const [searchGame, setSearchGame] = useState('');
    // État local pour la valeur de recherche dans la section "partie de jeu"
    const [searchGamePlay, setSearchGamePlay] = useState('');
    // État local pour déterminer si la section "meeple" est ouverte ou non
    const [isMeepleSectionOpen, setIsMeepleSectionOpen] = useState(false); 
    // État pour contrôler la visibilité de la modal
    const [showModal, setShowModal] = useState(false); // État pour contrôler la visibilité de la modal

    // Fonction pour gérer le changement de recherche
    const handleSearchChange = (value) => {
      if(!isInNotebook){
        setSearchGame(value);
        onSearchGameChange(value);
      } else {
        setSearchGamePlay(value);
        handleGamePlaysFilter(value);
      }
    };

    // Fonction pour gérer la déconnexion de l'utilisateur
    const handleLogout = () => {
      setShowModal(true); // Ouvrir la modal
      Alert.alert(
        'Confirmation',
        'Êtes-vous sûr de vouloir vous déconnecter ?',
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'Déconnexion',
            onPress: () => {
              dispatch(logout());
              navigation.navigate('Login');
              setTimeout(() => {
                Alert.alert(
                  'Au revoir',
                  `${user.username} !`,
                  [
                    {
                      text: 'OK',
                    },
                  ]
                );
              }, 500);
            },
          },
        ]
      );
    };

    // Fonction pour basculer l'état de la section "meeple" entre ouverte et fermée
    const toggleMeepleSection = () => {
      setIsMeepleSectionOpen(!isMeepleSectionOpen);
      setShowModal(!showModal); // Ouvrir ou fermer la modal
      console.log("isMeepleSectionOpen:", isMeepleSectionOpen);
    };


    return (
      <View style={[styles.headerContainer, { height: height }]}>
        <View style={styles.header}>
          <View style={styles.staticHeader}>
            {/* Bouton pour basculer l'état de la section "meeple" */}
            {showMeeple && (
              <TouchableOpacity style={styles.meepleBtn} onPress={toggleMeepleSection}>
                <Image source={require('../assets/meeple.png')} style={styles.logoMeeple} />
              </TouchableOpacity>
            )}
            {/* Titre de la section */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.headerTitle}>{title}</Text>
            </View>
          </View>
              {/* Modal pour la déconnexion */}
              <Modal isVisible={showModal} onBackdropPress={() => setShowModal(false)} animationType='none'>
                <View style={styles.modalContent}> 
                  {/* Message de bienvenue à l'utilisateur */}
                  <Text style={styles.meepleText}>Bonjour {user.username} !</Text>
                  {/* Bouton de déconnexion */}
                  <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.meepleTextLogout}>Déconnexion</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
          {/* Barre de recherche, filtre et bouton d'ajout */}
          {showSearchBar && (
            <View style={styles.modularHeader}>
              {/* Barre de recherche */}
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchBar}
                  placeholder={!isInNotebook ? "Rechercher dans l'armoire..." : "Rechercher par jeu"}
                  onChangeText={handleSearchChange}
                  value={!isInNotebook ? searchGame : searchGamePlay}
                />
              </View>
              {/* Conteneur pour le filtre, le compteur de jeux et le bouton d'ajout */}
              <View style={styles.bottomHeader}>
                {/* Bouton de filtre */}
                {!isInNotebook &&
                  <View style={styles.filterButton}>
                    <FontAwesome name="filter" color="#423D3D" size={20} />
                  </View>
                }
                {/* Compteur de jeux */}
                {showGameCounter && (
                  <View>
                   <Text style={styles.gameCounter}>
                    {initialGames.length} {initialGames.length === 0 || initialGames.length === 1 ? 'jeu' : 'jeux'}
                  </Text>
                  </View>
                )}
                {/* Bouton d'ajout de jeu ou de partie de jeu */}
                <TouchableOpacity onPress={!isInNotebook ? toggleModalAddGame : () => dispatch(setAddGamePlayVisible(!addGamePlayVisible))} style={styles.buttonAddGame}>
                  <View style={styles.plusButton}>
                  <FontAwesome5 name="plus-circle" size={24} color="#423D3D" style={styles.AddIcon} />
                  </View>
                  <Text>{!isInNotebook ? "Ajouter un jeu" : "Ajouter une partie"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6E9D9C',
        marginBottom:20,
      },
      header: {
        flex: 1,
        marginTop: 20,
        padding: 20,
        gap: 25,
      },
      staticHeader:{
        flexDirection: 'row',
        alignItems: 'center',
      },
      meepleBtn:{
        width: 40, 
        height: 40, 
        position: 'absolute',
      },
      goBackButton: {
        position: 'absolute',
      },  
      logoMeeple: {
        width: '100%',
        height: 40, 
        alignSelf: 'center',
      },
      headerTitle: {
        color: '#423D3D',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
      },
      modularHeader:{
        gap: 10,
      },
      searchContainer: {
        width: '100%',
        alignSelf: 'center',
      },
      searchBar: {
        padding: 4,
        borderRadius: 15,
        paddingLeft: 10,
        backgroundColor: "white",
      },
      bottomHeader: {
        justifyContent: 'center',
      },
      buttonAddGame: {
        alignSelf: 'flex-end',
        backgroundColor: '#88B7B6',
        borderRadius: 20,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      plusButton: {
        borderRadius: 50,
        marginRight: 5,
      },
      filterButton: {
        position: 'absolute',
        borderRadius: 50,
        backgroundColor: '#88B7B6',
        padding: 10,
        justifyContent: 'center',
      },

      gameCounter: {
        alignSelf: 'center',
        marginRight: 30,
        marginBottom: -20,
        marginTop: 15, 
        color: '#423D3D',
      },
     
      logoutButton: {
        backgroundColor: "#88B7B6",
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
      },
      meepleText: {
        color: '#423D3D',
        fontWeight:'bold',
        fontSize:20,
      },
      meepleTextLogout: {
        color: '#423D3D',
      },
      modalContent: {
        backgroundColor: '#F2F4F1',
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: 20, // Espacement par rapport au haut de l'écran
        marginRight: 20, // Espacement par rapport à la droite de l'écran
        width: 200, // Largeur de la modal (ajustez selon vos besoins)
      },
});

export default Header;
