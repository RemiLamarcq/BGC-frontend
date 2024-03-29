import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';

export default function AddGame({props, toggleModalAddGame}) {
    const user = useSelector((state) => state.user.value);

    // Liste des infos lié à un jeu suite au clic dans le dropdown
    const [gameInfos,setGameInfos] = useState({});
    // Liste des noms de jeu dans le dropdown
    const [gameList,setGameList] = useState ([]);
    // Type(s) d'un jeu isolé pour pouvoir mappé dessus après
    const [gameType, setGameType] = useState ([]); 
    
    const [gameCardVisible, setGameCardVisible] = useState(false);

    const [addPersonalNote, setAddPersonalNote] = useState(0);

    const formattedGameList = [];
    let gameCard;
    let formatedGameType;
    let buttonCard;
    let gameDuration;

    // Formate la durée d'un jeu en fonction de son numéro
    if (gameInfos.game) {
        if (gameInfos.game.duration === 1) {
            gameDuration = '< 30min'
        }
        else if (gameInfos.game.duration === 2) {
            gameDuration = '30 à 60min'
        }
        else if (gameInfos.game.duration === 3) {
            gameDuration = '1 à 2h'
        }
        else if (gameInfos.game.duration === 4) {
            gameDuration = '> 2h'
        }
    }

    // A l'initialisation récupère tous les noms des jeux de la BDD
    useEffect(() => {
        fetch(`https://bgc-backend.vercel.app/games/allNames/${user.token}`)
        .then(response => response.json())
        .then(data => {
            const gameNames = data.gameData.map(game => game.name);
            setGameList(gameNames);
        })
    }, []);

    // Au clic sur un jeu dans le dropdown, va chercher les infos liées à ce jeu
    const handleSelect = (item) => {
        if (item) {
            fetch(`https://bgc-backend.vercel.app/games/${item.title}/${user.token}`)
            .then(response => response.json())
            .then(data => {
                setGameInfos(data);
                setGameType(data.game.gameType);
                // console.log(gameInfos);
                setGameCardVisible(true);
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
            fetch(`https://bgc-backend.vercel.app/games/score/${gameInfos.game.name}/${user.token}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({score: addPersonalNote}),
            }).then(response=> response.json())
                .then(() => {
                    toggleModalAddGame()
                })
        })    
        
    }

    const handleClearGameCard = () => {
        setGameCardVisible(false);
        setGameInfos({});
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
            return <Text key={i}>   • {e.type}</Text>
        })
    }

    // Affichage conditionnel en fonction de la présence ou non du jeu dans le closet
    if (gameInfos.isInCloset) {
        buttonCard = 
        <View style={styles.alreadyInCloset}>
            <Text style={{color: '#88B7B6', marginTop: 10}}>Ce jeu est déjà dans votre armoire</Text>
            <TouchableOpacity onPress={handleClearGameCard} style={styles.buttonClose}>
                <FontAwesome name="times" style={{color: '#423D3D'}}/>
            </TouchableOpacity>
        </View>
    }
    else {
        buttonCard =
        <TouchableOpacity onPress={() => handleAdd()} style={styles.buttonX}>
            <Text style={{color: '#F2F4F1', fontWeight: 600}}>Ajouter à l'armoire</Text>
        </TouchableOpacity>
    }

    //Affichage des étoiles (cliquables si le jeu n'est pas encore dans l'armoire)

    let starsAddGame = [];
    for(let i= 0; i < 5; i++){
        if (i < gameInfos.personalNote -1) {
            starsAddGame.push(<AntDesign key={i} name="star" style={{color: '#0A3332'}}/>);
        } else {
            starsAddGame.push(<AntDesign key={i} name="staro" style={{color: '#0A3332'}}/>);
        }
        
    }

    if(!gameInfos.isInCloset){
        starsAddGame = [];
        for(let i= 0; i < 5; i++){
            if (i < addPersonalNote) {
                starsAddGame.push(
                <TouchableOpacity key={i} onPress={() => setAddPersonalNote(i+1)}>
                    <AntDesign name="star" style={{color: '#0A3332', margin: 3}} size={20}/>
                </TouchableOpacity>
                );
            } else {
                starsAddGame.push(
                <TouchableOpacity key={i} onPress={() => setAddPersonalNote(i+1)}>
                    <AntDesign name="staro" style={{color: '#0A3332', margin: 3}} size={20}/>
                </TouchableOpacity>
                );
                // console.log(addPersonalNote);
            }
            
        }
    }

    // Affichage des infos du jeu suite au choix du jeu dans le dropdown
    if (gameInfos.game) {
        gameCard =
        <View style={styles.gameCardContainer}>
            <Text style={{color: '#423D3D', fontWeight:800, fontSize: 18}}>{gameInfos.game.name}</Text>
            <Image style={styles.image} source={{uri:(gameInfos.game.urlImg)}} />
            <View style={styles.gameInfosContainer}>
                <View style={styles.gameTypeContainer}>
                    <Text style={{color: '#423D3D'}}>{formatedGameType}</Text>
                </View>
                <View style={styles.gameDurationContainer}>
                    <Text style={{color: '#423D3D'}}>{gameDuration}</Text>
                </View>
                <View style={styles.gamePlayerNumber}>
                    <Text style={{color: '#423D3D'}}>De {gameInfos.game.minPlayers} à {gameInfos.game.maxPlayers} joueurs</Text>
                </View>
            </View>
            <View style={styles.starsAddGame}>
                {starsAddGame}
            </View>
            {buttonCard}
        </View>
    }


    

        return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.goBackTouchable} onPress={toggleModalAddGame}>
                    <AntDesign 
                        name="arrowleft" 
                        size={24} 
                        color="#423D3D" 
                    />
                    </TouchableOpacity>
                    <AutocompleteDropdownContextProvider>
                        <Text style={{alignSelf: 'center', fontSize: 20, margin: 10}}>Ajouter un jeu</Text>
                    <AutocompleteDropdown
                        dataSet={formattedGameList}
                        onSelectItem={(item) => handleSelect(item)}
                        textInputProps={{ placeholder: 'Rechercher un jeu' }}
                        closeOnSubmit
                        suggestionsListContainerStyle={{
                            backgroundColor: '#CDDCDB',
                            marginTop: -40,
                            borderRadius: 20
                        }}
                        inputContainerStyle={{
                            backgroundColor: 'white',
                            borderRadius: 25,
                            width: 350
                        }}
                        onClear={handleClearGameCard}
                        onOpenSuggestionsList={handleClearGameCard}
                        ignoreAccents
                    />
                    </AutocompleteDropdownContextProvider>
                    <ScrollView>
                        {gameCardVisible && gameCard}
                    </ScrollView>
                </View>
        );
      }

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#F2F4F1',
          width: '100%',
          borderRadius: 40,
          padding: 20, 
          alignItems: 'center',
        },

        goBackTouchable: {
            height: 30,
            width: 30,
            borderRadius: 50,
            backgroundColor: "#88B7B6",
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
            marginLeft: 10,
          },

          containerStyle: {
            borderRadius: 40,
          },

        gameCardContainer: {
            backgroundColor: '#CDDCDB',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
            marginTop: 80, 
            width: 300,
            borderRadius: 40,
            padding: 20
        },

        image: {
            height: 200,
            width: 200,
            marginTop: 10,
            marginBottom: 10
        },

        gameInfosContainer: {
            alignItems: 'center'
        },

        gameDurationContainer: {
            padding: 10
        },

        alreadyInCloset: {
            alignItems: 'center'
        },

        starsAddGame: {
            marginTop: 15,
            flexDirection: 'row',
        },

        buttonClose: {
            borderRadius: 50,
            backgroundColor: "#88B7B6",
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,
            width: 30, 
            margin: 10,
            marginTop: 10
        },

        buttonX: {
            borderRadius: 50,
            flexDirection:'row',
            backgroundColor: "#0A3332",
            justifyContent: 'center',
            alignItems:'center',
            height: 30,
            width: 150, 
            margin: 10,
        }

      });