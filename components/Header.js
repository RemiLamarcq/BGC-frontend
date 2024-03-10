import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//Composant enfant de AccessoiresScreen.js

/* Création d'une prop showMeeple dans le composant Header.
dans l' écran AccessoiresScreen, passer la valeur à true pour afficher le logo de déconnexion
Pour les autres écrans, passer la valeur à false*/

function Header({ 
  title, 
  height, 
  showSearchBar, 
  showMeeple, 
  toggleModalAddGame, 
  onSearchGameChange, 
  isInNotebook, 
  toggleModalAddGamePlay, 
}) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const user = useSelector((state) => state.user.value);
    const [searchGame, setSearchGame] = useState('');
    const handleLogout = () => {
        dispatch(logout());
        // Redirection vers la page de connexion
        navigation.navigate('Login');
    };

    // Permet de récupérer la valeur du champ de recherche et la renvoie au composant parent
    const handleSearchChange = (value) => {
      setSearchGame(value);
      onSearchGameChange(value);
    };

    // console.log(searchGame)

  return (
    <View style={[styles.headerContainer, { height: height }]}>{/* height à modifier dans les fichiers screens */}

    <View style={styles.header}>
      <View style={styles.staticHeader}>
        {showMeeple && (
        <TouchableOpacity style={styles.meepleBtn} onPress={handleLogout}>
          {/* <View style={styles.logoContainer}> */}
            <Image source={require('../assets/meeple.png')} style={styles.logoMeeple} />
          {/* </View> */}
        </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>{/* Titre du header à modifier dans les fichiers screeens */}
      </View>
      {/* Barre de recherche, conditionnellement affichée en fonction du screen */}
      {showSearchBar && (
      <View style={styles.modularHeader}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder={ !isInNotebook ? "Rechercher dans l'armoire..." : "Rechercher par jeu" }
            onChangeText={handleSearchChange}
            value={searchGame}
          />
        </View>
        <View style={styles.bottomHeader}>
          {!isInNotebook &&
          <View style={styles.filterButton}>
            <FontAwesome name="filter" color="#423D3D" size={20} />
          </View>
          }
          <TouchableOpacity onPress={ !isInNotebook ? toggleModalAddGame : toggleModalAddGamePlay } style={styles.buttonAddGame}>
            <View style={styles.plusButton}>
              <FontAwesome name="plus" color="#88B7B6" style={styles.AddIcon} />
            </View>
            <Text>{ !isInNotebook ? "Ajouter un jeu" : "Ajouter une partie" }</Text>
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
      },
      header: {
        flex: 1,
        marginTop: 10,
        padding: 20,
        gap: 25,
      },
      staticHeader:{
        justifyContent: 'center',
      },
      meepleBtn:{
        width: 40, 
        height: 40, 
        position: 'absolute',
      },   
      logoMeeple: {
        width: '100%',
        height: 40, 
        alignSelf: 'center',
      },
      headerTitle: {
        color: '#423D3D',
        fontSize: 24,
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
        padding: 12,
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
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      plusButton: {
        borderRadius: 50,
        marginRight: 5,
        backgroundColor:'#423D3D'
      },
      filterButton: {
        position: 'absolute',
        borderRadius: 50,
        backgroundColor: '#88B7B6',
        padding: 10,
        justifyContent: 'center',
      }
});

export default Header;