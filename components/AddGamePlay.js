import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';

export default function AddGamePlay({toggleModalAddGamePlay}) {

    const user = useSelector((state) => state.user.value);
    const [isInterrupted, setIsInterrupted] = useState(false);
    // Liste des noms de jeu dans le dropdown
    const [gameList,setGameList] = useState([]);
    // Objets contenant les noms des jeux pour le dropdown
    const formattedGameList = [];
    const [date, setDate] = useState({ startDate: null, endDate: null });

    // A l'initialisation récupère tous les noms des jeux de la BDD
    useEffect(() => {
        fetch(`https://bgc-backend.vercel.app/games/allNames/${user.token}`)
        .then(response => response.json())
        .then(data => {
            setGameList(data.gameNames)
        })
    }, []);

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

    // Gére la saisie des dates dans les inputs "Date de début" et "Date de fin"
    const handleDateChange = (text, isEndDate) => {
        // Supprimer tout caractère non numérique de la saisie de l'utilisateur
        text = text.replace(/\D/g, '');
    
        // Ajouter automatiquement les "/" après les 2 premiers et les 4 premiers caractères
        if (text.length > 2 && text.charAt(2) !== '/') {
          text = text.slice(0, 2) + '/' + text.slice(2);
        }
        if (text.length > 5 && text.charAt(5) !== '/') {
          text = text.slice(0, 5) + '/' + text.slice(5);
        }

        // Limiter la longueur du texte à 10 caractères (JJ/MM/AAAA)
        if (text.length <= 10) {
            !isEndDate && setDate({ ...date, startDate: text });
            isEndDate && setDate({ ...date, endDate: text })
        }
    };

    return(
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.topContainer} >
                    <TouchableOpacity style={styles.goBackTouchable} onPress={toggleModalAddGamePlay}>
                        <FontAwesome name="arrow-left" color="#0A3332" backgroundColor="#88B7B6" size={20} />
                    </TouchableOpacity>
                    <Text style={ styles.title }>Ajouter une partie</Text>
                </View>
                <AutocompleteDropdownContextProvider>
                    <AutocompleteDropdown
                        dataSet={formattedGameList}
                        onSelectItem={item => console.log(item)}
                        textInputProps={{ placeholder: 'Rechercher un jeu' }}
                        closeOnSubmit
                        suggestionsListContainerStyle={{
                            backgroundColor: '#CDDCDB',
                        }}
                        inputContainerStyle={{
                            backgroundColor: 'white',
                            borderRadius: 25,
                            padding: 3,
                        }}
                    />
                </AutocompleteDropdownContextProvider>
                <View>
                    <RadioButton
                        value="first"
                        status={isInterrupted ? 'checked' : 'unchecked'}
                        onPress={() => setIsInterrupted(!isInterrupted)}
                    />
                    <Text>Partie interrompue</Text>
                </View>
                <View style={styles.dateContainer}>
                    <TextInput
                        style={{ ...styles.dateInput, ...styles.input }}
                        placeholder="Début JJ/MM/AAAA"
                        placeholderTextColor= '#423D3D'
                        inputMode='numeric'
                        onChangeText={value => handleDateChange(value, false)}
                        value={date.startDate}
                    />
                    <TextInput
                        style={[ styles.dateInput, styles.input ]}
                        placeholder="Fin JJ/MM/AAAA"
                        placeholderTextColor= '#423D3D'
                        inputMode='numeric'                        
                        onChangeText={value => handleDateChange(value, true)}
                        value={date.endDate}
                    />
                </View>
                <TextInput
                    style={ styles.input }
                    placeholder="Lieu"
                    placeholderTextColor= '#423D3D'
                    inputMode='text'
                    // onChangeText={handleLocation}
                    // value={location}
                />
                <AutocompleteDropdownContextProvider>
                    <AutocompleteDropdown
                        dataSet={formattedGameList}
                        onSelectItem={item => console.log(item)}
                        textInputProps={{ placeholder: 'Rechercher un joueur' }}
                        closeOnSubmit
                        suggestionsListContainerStyle={{
                            backgroundColor: '#CDDCDB',
                        }}
                        inputContainerStyle={{
                            backgroundColor: 'white',
                            borderRadius: 25,
                            padding: 3,
                        }}
                    />
                </AutocompleteDropdownContextProvider>
                <TouchableOpacity style={styles.addPlayerBtn}>
                    <AntDesign name="adduser" style={{color: '#423D3D'}} size={20}/>
                    <Text style={{color: '#423D3D'}}>Ajouter un joueur</Text>
                </TouchableOpacity>
                <View style={styles.playerCtn}>
                    <View style={styles.playerCtnTop}>
                        <Text style={ styles.player }>Joueur 1</Text>
                        <Text></Text>
                        <TouchableOpacity style={styles.close} >
                            <FontAwesome name="close" color="#0A3332" backgroundColor="#88B7B6" size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.playerCtnBottom}>
                        <TextInput
                            style={[ styles.input, styles.playerInput ]}
                            placeholder="Equipe"
                            placeholderTextColor= '#423D3D'
                            inputMode='text'
                            // onChangeText={handleTeam}
                            // value={team}
                        />
                        <TextInput
                            style={[ styles.input, styles.playerInput ]}
                            placeholder="Personnage"
                            placeholderTextColor= '#423D3D'
                            inputMode='text'
                            // onChangeText={handleCharacter}
                            // value={character}
                        />
                        <TextInput
                            style={[ styles.input, styles.playerInput ]}
                            placeholder="Score"
                            placeholderTextColor= '#423D3D'
                            inputMode='text'
                            // onChangeText={handleScore}
                            // value={score}
                        />
                    </View>
                </View>
                <View style={styles.photosCtn} >
                    <TouchableOpacity style={styles.photo}>
                        <FontAwesome name="camera" color="#0A3332" backgroundColor="#88B7B6" size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photo}>
                        <FontAwesome name="camera" color="#0A3332" backgroundColor="#88B7B6" size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photo}>
                        <FontAwesome name="camera" color="#0A3332" backgroundColor="#88B7B6" size={50} />
                    </TouchableOpacity>
                </View>
                <View style={styles.commentCtn}>
                    <TextInput
                        style={[ styles.input, { paddingLeft: 35 } ]}
                        placeholder="Commentaire"
                        placeholderTextColor= '#423D3D'
                        inputMode='text'
                        // onChangeText={handleComment}
                        // value={comment}
                    />
                    <FontAwesome name="pencil" color="#0A3332" size={20} style={{ position: "absolute", left: 10 }} />                    
                </View>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#F2F4F1',
        width: '100%',
        borderRadius: 40,
        padding: 20, 
        gap: 10,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    goBackTouchable: {
        height: 45,
        width: 55,
        borderRadius: 50,
        backgroundColor: "#88B7B6",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
        color: '#423D3D'
    },
    dateContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateInput:{
        width: '48%',
        textAlign: 'center',
    },
    input:{
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 15,
        fontSize: 15,
    },
    addPlayerBtn: {
        backgroundColor: '#88B7B6',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 15,
    },
    playerCtn: {
        backgroundColor: '#CDDCDB',
        borderRadius: 30,
        padding: 15,
        gap: 10,
    },
    playerCtnTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    player: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    close: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: "#88B7B6",
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerCtnBottom: {
        gap: 8,
    },
    playerInput: {
        width: '80%',
    },
    photosCtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    photo: {
        width: 80,
        height: 80,
        backgroundColor: "#88B7B6",
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentCtn: {
        justifyContent: 'center',
    }
});