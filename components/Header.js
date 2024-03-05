import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

function Header({ title, height, showSearchBar, onSearchChange }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const user = useSelector((state) => state.user.value);
    const handleLogout = () => {
        dispatch(logout());
        // Redirection vers la page de connexion
        navigation.navigate('Login');
    };
  return (
    <View style={[styles.headerContainer, { height: height }]}>{/* height à modifier dans les fichiers screens */}
        <TouchableOpacity onPress={handleLogout}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/meeple.png')} style={styles.logoMeeple} />
        </View>
      </TouchableOpacity>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>{/* Titre du header à modifier dans les fichiers screeens */}
      {/* Barre de recherche, conditionnellement affichée en fonction du screen */}
      {showSearchBar && (
          <TextInput
            style={styles.searchBar}
            placeholder="Rechercher dans l'armoire..."
            onChangeText={onSearchChange}
          />
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
        width: 50, //largeur
        height: 50, //hauteur
        marginLeft: 20, //espace gauche logoContainer
        marginTop: 12, //espace haut logoContainer
      },

      header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerTitle: {//titre de la section
        color: '#423D3D',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: '20%',
      },
     
      logoMeeple: {
        width: '80%',//largeur du meeple
        height: 40, //hauteur du meeple
        alignSelf: 'center', // Pour centrer l'image horizontalement dans son conteneur
      },

      searchBar: { //barre de reserche à modifier !!!!
        width: '80%',
        height: 40,
        borderRadius: 15,
        marginTop: 5,
        paddingLeft: 10,
      },
  
});

export default Header;