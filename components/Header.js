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
      {showMeeple && (
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/meeple.png')} style={styles.logoMeeple} />
          </View>
        </TouchableOpacity>
      )}
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>{/* Titre du header à modifier dans les fichiers screeens */}
      {/* Barre de recherche, conditionnellement affichée en fonction du screen */}
      {showSearchBar && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder={ !isInNotebook ? "Rechercher dans l'armoire..." : "Rechercher par jeu" }
            onChangeText={handleSearchChange}
            value={searchGame}
          />
          <View style={styles.bottomHeader}>
            {!isInNotebook &&
            <View style={styles.filterButton}>
              <FontAwesome name="filter" color="#423D3D" style={styles.filterIcon} />
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
        flexDirection: 'row',//contenu du header en row
        alignItems: 'center',//contenu centré à la vertical
        backgroundColor: '#6E9D9C',//couleur du background
      },

      logoContainer: {
        width: 40, //largeur
        height: 40, //hauteur
        marginLeft: 20, //espace gauche logoContainer
        marginTop: 12, //espace haut logoContainer
      },

      header: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
        marginTop: 20
      },
      headerTitle: {//titre de la section
        color: '#423D3D',
        fontSize: 24,
        fontWeight: 'bold',
      },
     
      logoMeeple: {
        width: '80%',//largeur du meeple
        height: 40, //hauteur du meeple
        alignSelf: 'center', // Pour centrer l'image horizontalement dans son conteneur
      },
      searchContainer: {
        justifyContent: 'space-around',
        height: 100
      },
      searchBar: { //barre de reserche à modifier !!!!
        height: 40,
        borderRadius: 15,
        marginTop: 5,
        paddingLeft: 10,
        backgroundColor: "white",
      },
      bottomHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
      buttonAddGame: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 75,
        marginBottom: 10,
        backgroundColor: '#88B7B6',
        borderRadius: 20,
        width: 130,
        height: 30
      },
      plusButton: {
        borderRadius: 50,
        marginRight: 5,
        backgroundColor:'#423D3D'
      },

      filterButton: {
        justifyContent: 'center',
        marginRight: 75,
        borderRadius: 50,
        backgroundColor: '#88B7B6'
      }
  
});

export default Header;