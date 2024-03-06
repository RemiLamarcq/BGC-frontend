import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

export default function AddGame(props) {
    const user = useSelector((state) => state.user.value);

    // Liste des infos lié à un jeu suite au clic dans le dropdown
    const [gameInfos,setGameInfos] = useState({});
    // Liste des noms de jeu dans le dropdown
    const [gameList,setGameList] = useState ([]);
    // Type(s) d'un jeu isolé pour pouvoir mappé dessus après
    const [gameType, setGameType] = useState ([]); 

    const formattedGameList = [];
    let gameCard;
    let formatedGameType;
    let buttonCard;
    let gameDuration;

    // Formate la durée d'un jeu en fonction de son numéro
    if (gameInfos.game) {
        if (gameInfos.game.duration === 1) {
            gameDuration = '<30min'
        }
        else if (gameInfos.game.duration === 2) {
            gameDuration = 'entre 30 et 60min'
        }
        else if (gameInfos.game.duration === 3) {
            gameDuration = 'entre 1 et 2h'
        }
        else if (gameInfos.game.duration === 4) {
            gameDuration = 'plus de 2h'
        }
    }

    // A l'initialisation récupère tous les noms des jeux de la BDD
    useEffect(() => {
        fetch(`https://bgc-backend.vercel.app/games/allNames/${user.token}`)
        .then(response => response.json())
        .then(data => {
            setGameList(data.gameNames)
        })
    }, []);

    // Au clic sur un jeu dans le dropdown, va chercher les infos liées à ce jeu
    const handleSelect = (item) => {
        if (item) {
            fetch(`https://bgc-backend.vercel.app/games/${item.title}/${user.token}`)
            .then(response => response.json())
            .then(data => {
                setGameInfos(data);
                setGameType(data.game.gameType)
                console.log(gameInfos)
            })
        }
    };

    // Action lorsqu'on clic sur le bouton disponible si le jeu n'est pas dans le closet
    const handleAdd = () => {
        fetch(`https://bgc-backend.vercel.app/games/closet/add/${gameInfos.game.name}/${user.token}`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            }).then(response=> response.json())
        .then(() => {
        props.toggleModalAddGame()
        })
    }
    
    // Formate les noms d'un jeu sous forme d'objet avec un id et un title(nécessaire pour le dropdown)
    if (gameList.length > 0) {
        for (let i = 0; i< gameList.length; i++) {
            let newObj = {
                id: i+1,
                title: gameList[i]
            };
            formattedGameList.push(newObj);
        }
    }

    // Formate le(s) type(s) d'un jeu et l'affiche dans la card
    if (gameType.length > 0) {
        formatedGameType = gameType.map((e,i) => {
            return <Text key={i}>•{e.type}</Text>
        })
    }

    // Affichage conditionnel en fonction de la présence ou non du jeu dans le closet
    if (gameInfos.isInCloset) {
        buttonCard = 
        <View style={styles.alreadyInCloset}>
            <Text>Ce jeu est déjà dans votre armoire</Text>
            <TouchableOpacity onPress={() => props.toggleModalAddGame()} style={styles.buttonClose}>
            <Text style={styles.textButtonClose}>Fermer</Text>
            </TouchableOpacity>
        </View>
    }
    else {
        buttonCard =
        <TouchableOpacity onPress={() => handleAdd()} style={styles.button}>
        <Text style={styles.textButton}>Ajouter à l'armoire</Text>
        </TouchableOpacity>
    }

    // Affichage des infos du jeu suite au choix du jeu dans le dropdown
    if (gameInfos.game) {
        gameCard =
        <View style={styles.gameCardContainer}>
            <Text>{gameInfos.game.name}</Text>
            <Image style={styles.image} source={{uri:(gameInfos.game.urlImg)}} />
            <View style={styles.gameInfosContainer}>
                <View style={styles.gameTypeContainer}>
                    <Text>{formatedGameType}</Text>
                </View>
                <View style={styles.gameDurationContainer}>
                    <Text>{gameDuration}</Text>
                </View>
                <View style={styles.gamePlayerNumber}>
                    <Text>De {gameInfos.game.minPlayers} à {gameInfos.game.maxPlayers} joueurs</Text>
                </View>
            </View>
            {buttonCard}
        </View>
    }


    

        return (
            <View style={styles.container}>
                <AutocompleteDropdownContextProvider>
                <Text >Ajoutez un jeu</Text>
                <AutocompleteDropdown
                    dataSet={formattedGameList}
                    onSelectItem={(item) => handleSelect(item)}
                    textInputProps={{ placeholder: 'Rechercher un jeu' }}
                    closeOnSubmit
                    suggestionsListContainerStyle={{
                        backgroundColor: 'red',
                        
                      }}
                    containerStyle={{flewGrow: 1, flexShrink: 1}}
                />
                </AutocompleteDropdownContextProvider>
                {gameCard}
            </View>
        );
      }

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#F2F4F1',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          marginTop: 100,
          width: '100%'
        },
        gameCardContainer: {
            backgroundColor: '#F2F4F1',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            height: 400,
            marginTop: 150
        },
        image: {
            height: 200,
            width: 200
        },
        gameInfosContainer: {
            borderWidth: 1,
        },
      });