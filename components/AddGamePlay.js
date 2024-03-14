import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Alert, Platform, Image } from 'react-native';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Octicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { transformInDate, checkFormatDate } from '../modules/formatDate';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { setAddGamePlayVisible } from '../reducers/addGamePlayVisible';
import {
    setSelectedGameName,
    toggleIsInterrupted,
    setStartDate,
    setEndDate,
    setLocation,
    setNewPlayer,
    removePlayer,
    toggleIsWinner,
    setTeam,
    setCharacter,
    setScore,
    resetPlayersInfos,
    setSelectedPhoto,
    setComment,
    resetAddGamePlay,
} from '../reducers/addGamePlayInfos';
import { setDefaultGameName } from '../reducers/selectedGameName';

export default function AddGamePlay() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const token = useSelector((state) => state.user.value.token);
    const addGamePlayVisible = useSelector(state => state.addGamePlayVisible.value);
    const gamePlayInfos = useSelector(state => state.addGamePlayInfos.value);
    const { selectedGameName, isInterrupted, date, location, players, photosUri, comment } = gamePlayInfos;
    const defaultGameName = useSelector(state => state.defaultGameName.value);
console.log(gamePlayInfos)
    // gameList stocke tous les jeux sous forme {name, isTeam, isCharacter, isScore} 
    // pour l'affichage dans la dropdown et pour filtrer les View dans les players
    const [gameList, setGameList] = useState([]);
    // Liste d'amis de l'user
    const [friendsList, setfriendsList] = useState([]);
    // Données formatées(noms des jeux / friends) pour l'affichage du contenu des dropdowns
    const formattedGameNames = [];
    const formattedFriendsList = [];
    // Objet jeu sélectionné par l'user
    const chosenGame = gameList.find(game => game.name === selectedGameName);
    // Nom du nouveau joueur à enregistrer dans la friendsList
    const [newFriend, setNewFriend] = useState('');
    // Booléen déclenchant le fetch GET de la liste des friends lorsque celle-ci change
    const [friendRegistered, toggleFriendRegistered] = useState(false);
    //Affiche des messages lorsque certains champs entrés dans le formulaire sont incomplets
    const [invalidField, setInvalidField] = useState({
        globalMessage: false,
        gameMissing: false,
        invalidDate: false,
        playerMissing: false
    });
    const [idInitialValue, setIdInitialValue] = useState(0);
// console.log(addGamePlayVisible)
    // A l'initialisation, récupère tous les jeux de la BDD sous forme {name, isTeam, isCharacter, isScore}
    useEffect(() => {
        fetch(`https://bgc-backend.vercel.app/games/allNames/${token}`)
        .then(response => response.json())
        .then(data => {
            data.result && setGameList(data.gameData);
        });
    }, [isFocused]);

    // A l'initialisation et à chaque nouvel enregistrement d'un ami, récupère tous les noms des amis
    useEffect(() => {
        fetch(`https://bgc-backend.vercel.app/friends/getFriends/${token}`)
        .then(response => response.json())
        .then(data => {
            setfriendsList(data.friendsName);
        });
    }, [friendRegistered])

    // Formate les noms d'un jeu sous forme d'objet avec un id et un title(nécessaire pour le dropdown)
    if (gameList?.length > 0) {
        for (let i = 0; i < gameList?.length; i++) {
            let newObj = {
                id: i + 1,
                title: gameList[i].name
            };
            formattedGameNames.push(newObj);
        }
    }
    // Formate les noms des amis sous forme d'objet avec un id et un title(nécessaire pour le dropdown)
    if (friendsList.length > 0) {
        for (let i = 0; i < friendsList.length; i++) {
            let newObj = {
                id: i + 1,
                title: friendsList[i]
            };
            formattedFriendsList.push(newObj);
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
            !isEndDate && dispatch(setStartDate(text));
            isEndDate && dispatch(setEndDate(text));
        }
    };
 
    //Ajout d'un nouveau joueur à la liste d'amis
    function handleAddFriend(){
        if(newFriend === ''){
            return;
        }
        fetch(`https://bgc-backend.vercel.app/friends/addFriend/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newFriend }),
        })
        .then(result => result.json())
        .then(data => {
            if(data.result){
                setNewFriend('');
                toggleFriendRegistered(!friendRegistered);
            };
        })
    }
const [isPlayerToGPSelected, setIsPlayerToGPSelected] = useState(false);
const [inputValue, setInputValue] = useState('');
    //Modifie l'état players en ajoutant un joueur
    function handleAddPlayer(friendName){
        dispatch(setNewPlayer({
            friendName,
            isWinner: false,
            team: '',
            character: '',
            score: '',
        }));
        setIsPlayerToGPSelected(true);
        setInputValue('');
        setTimeout(() => setIsPlayerToGPSelected(false), 1000);
    }

    function handleNavigation(photoNumber){
        dispatch(setSelectedPhoto(photoNumber));
        navigation.navigate('Snap');
    }

    //Enregistre la nouvelle partie
    function handleSaveGamePlay(){
        //Si un des champs suivants sont manquants(nom du jeu, date et 1 joueur minimum obligatoire), affiche un message d'erreur
        if(
            !selectedGameName ||
            !checkFormatDate(date.startDate) || 
            !checkFormatDate(date.endDate) ||
            players.length === 0)
        {
            invalidField.globalMessage = true;
            !selectedGameName ? (invalidField.gameMissing = true) : (invalidField.gameMissing = false);
            (!checkFormatDate(date.startDate) || !checkFormatDate(date.endDate)) ?
                (invalidField.invalidDate = true)
            :
                (invalidField.invalidDate = false);
            players.length === 0 ? (invalidField.playerMissing = true) : (invalidField.playerMissing = false);
            setInvalidField({ ...invalidField });
        }
        else{
            // Formatage des données avant le fetch POST
            const formData = new FormData();
            photosUri.forEach((uri, index) => {
                const photoName = `photoFromFront${index + 1}.jpg`;
                formData.append(photoName, {
                    uri,
                    name: photoName,
                    type: 'image/jpeg',
                });
            });
            const otherData = {
                token,
                name: selectedGameName,
                startDate: transformInDate(date.startDate),
                endDate: transformInDate(date.endDate),
                isInterrupted,
                place: location,
                players,
                comment,
            };
            formData.append('json', JSON.stringify(otherData));
            // Envoi des données pour création de la nouvelle partie
            fetch(`https://bgc-backend.vercel.app/gamePlays`, {
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData,
            })
            .then(result => result.json())
            .then(data => {
                if(data.result){
                    Alert.alert(
                        "Succès",
                        "La partie a été enregistrée avec succès",
                        [
                            { text: "OK", onPress: () => {
                                // console.log(1);
                                dispatch(resetAddGamePlay());
                                dispatch(setDefaultGameName(null));
                                dispatch(setAddGamePlayVisible(!addGamePlayVisible));
                            }}
                        ]
                    );
                } else {
                    Alert.alert(data.error);
                }
            })
            .catch(error => Alert.alert(error));
        }
    }

    const handleGoBack = () => {
        dispatch(setAddGamePlayVisible(!addGamePlayVisible));
        dispatch(resetAddGamePlay());
        dispatch(setDefaultGameName(null));
    }

    const playersJSX = players.map((player, i) => {
        const { friendName, isWinner, team, character, score } = player;
        return (
            <View key={i} style={styles.playerCtn}>
                <View style={styles.playerCtnTop}>
                    <Text style={ styles.player }>{friendName}</Text>
                    <View style={styles.radioBtnBloc}>
                        <View style={styles.radioBtnCtn}>
                            <RadioButton
                                value="winner"
                                status={isWinner ? 'checked' : 'unchecked'}
                                onPress={() => dispatch(toggleIsWinner(i))}
                                style={styles.radioBtn}
                                color="#0A3332"
                            />
                        </View>
                        <Text>Vainqueur</Text>
                    </View>
                    <TouchableOpacity onPress={() => dispatch(removePlayer(i))} style={styles.closeBtn} >
                    <Octicons name="x-circle-fill" size={24} color="#6E9D9C" />
                    </TouchableOpacity>
                </View>
                <View style={styles.playerCtnBottom}>
                    { chosenGame?.isTeam &&
                    <TextInput
                        key="teamTextInput"
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Equipe"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        onChangeText={value => dispatch(setTeam({ index: i, team: value }))}
                        value={team}
                    />
                    }
                    { chosenGame?.isCharacter &&
                    <TextInput
                        key="characterTextInput"
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Personnage"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        onChangeText={value => dispatch(setCharacter({ index: i, character: value }))}
                        value={character}
                    />
                    }
                    { chosenGame?.isScore &&
                    <TextInput
                        key="scoreTextInput"
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Score"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        onChangeText={value => dispatch(setScore({ index: i, score: value }))}
                        value={score}
                    />
                    }
                </View>
            </View>
        );
    })

    useEffect(() => {
        if (formattedGameNames) {
             // Le titre que vous cherchez
            const titreRecherche = defaultGameName;
            // Recherche de l'objet correspondant
            const objetTrouve = formattedGameNames.find(obj => obj.title === titreRecherche);
            // Extraction de l'id si l'objet est trouvé, sinon null
            const idTrouve = objetTrouve ? objetTrouve.id : null;
            setIdInitialValue(idTrouve);
        }
    }, [formattedGameNames, addGamePlayVisible]);

    let initialValue = idInitialValue;

    return(
        <AutocompleteDropdownContextProvider>
            {/* <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
                <ScrollView contentContainerStyle={ styles.scrollView } >
                    <View style={styles.container}>
                        <View style={styles.topContainer} >
                            <TouchableOpacity style={styles.goBackTouchable} onPress={() => handleGoBack()}>
                                <AntDesign name="arrowleft" size={24} color="#423D3D" />                            
                            </TouchableOpacity>
                            <Text style={styles.title}>Ajouter une partie</Text>
                        </View>
                        <AutocompleteDropdown
                            dataSet={formattedGameNames}
                            onSelectItem={item => {
                                if(item){
                                    dispatch(setSelectedGameName(item.title));
                                    dispatch(resetPlayersInfos());
                                }
                            }}
                            onClear={() => {
                                dispatch(setSelectedGameName(null));
                                dispatch(resetPlayersInfos());
                            }}
                            textInputProps={{
                                placeholder: 'Rechercher un jeu',
                                placeholderTextColor: 'grey',
                            }}
                            closeOnSubmit
                            suggestionsListContainerStyle={{
                                backgroundColor: '#CDDCDB',
                            }}
                            inputContainerStyle={{
                                backgroundColor: 'white',
                                borderRadius: 25,
                                padding: 3, 
                            }}
                            initialValue={{id: initialValue}}

                        />
                        { invalidField.gameMissing && <Text style={styles.invalidField}>Sélectionner un jeu</Text> }
                        <View style={styles.radioBtnBloc}>
                            <View style={styles.radioBtnCtn}>
                                <RadioButton
                                    value="interrupt"
                                    status={isInterrupted ? 'checked' : 'unchecked'}
                                    onPress={() => dispatch(toggleIsInterrupted())}
                                    style={styles.radioBtn}
                                    color="#0A3332"
                                />
                            </View>
                            <Text>Partie interrompue</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <TextInput
                                style={{ ...styles.dateInput, ...styles.input }}
                                placeholder="Début JJ/MM/AAAA"
                                placeholderTextColor= 'grey'
                                inputMode='numeric'
                                onChangeText={value => handleDateChange(value, false)}
                                value={date.startDate}
                            />
                            <TextInput
                                style={[ styles.dateInput, styles.input ]}
                                placeholder="Fin JJ/MM/AAAA"
                                placeholderTextColor= 'grey'
                                inputMode='numeric'                        
                                onChangeText={value => handleDateChange(value, true)}
                                value={date.endDate}
                            />
                        </View>
                        { invalidField.invalidDate && <Text style={styles.invalidField}>Entrer les dates au format JJ/MM/AAAA</Text> }
                        <TextInput
                            style={ styles.input }
                            placeholder="Lieu"
                            placeholderTextColor= 'grey'
                            inputMode='text'
                            onChangeText={value => dispatch(setLocation(value))}
                            value={location}
                        />
                        <View style={styles.addPlayerCtn}>
                            <TextInput 
                                style={ styles.input }
                                placeholder="Ajouter un joueur à votre liste"
                                placeholderTextColor= 'grey'
                                inputMode='text'
                                onChangeText={value => setNewFriend(value)}
                                value={newFriend}
                            />
                            <TouchableOpacity onPress={handleAddFriend} style={styles.addPlayerBtn}>
                                <FontAwesome name="plus" color="#0A3332" size={20} />
                            </TouchableOpacity>
                        </View>                        
                        <View>
                            <AutocompleteDropdown
                                dataSet={formattedFriendsList}
                                onSelectItem={item => item && handleAddPlayer(item.title)}
                                textInputProps={{ 
                                    placeholder: 'Ajouter un joueur à la partie',
                                    placeholderTextColor: 'grey',
                                    value: isPlayerToGPSelected ? '' : inputValue,
                                    onChangeText: value => setInputValue(value),
                                }}
                                closeOnSubmit
                                suggestionsListContainerStyle={{
                                    backgroundColor: '#CDDCDB',
                                    position: 'relative',
                                    
                                }}
                                inputContainerStyle={{
                                    backgroundColor: 'white',
                                    borderRadius: 25,
                                    padding: 3,
                                    paddingLeft: 30,
                                    height: 40, 
                                }}
                            />
                            {!isPlayerToGPSelected ?
                                <AntDesign name="adduser" style={styles.adduser} size={24} color='#423D3D'/>
                            :
                                <AntDesign name="checkcircle" style={styles.adduser} size={24} color='#88B7B6'/>
                            }
                        </View>
                        { invalidField.playerMissing && <Text style={styles.invalidField}>Sélectionner un joueur</Text> }
                        {playersJSX}
                        <View style={styles.photosCtn} >
                            <TouchableOpacity style={styles.photoBtn} onPress={() => handleNavigation(0)} >
                                {photosUri[0] ?
                                    <Image source={{ uri: photosUri[0] }} style={styles.photo} />
                                :
                                    <FontAwesome name="camera" color="#0A3332" backgroundColor="#88B7B6" size={30} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.photoBtn} onPress={() => handleNavigation(1)} >
                                {photosUri[1] ?
                                    <Image source={{ uri: photosUri[1] }} style={styles.photo} />
                                :
                                    <FontAwesome name="camera" color="#0A3332" backgroundColor="#88B7B6" size={30} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.photoBtn} onPress={() => handleNavigation(2)} >
                                {photosUri[2] ?
                                    <Image source={{ uri: photosUri[2] }} style={styles.photo} />
                                :
                                    <FontAwesome name="camera" color="#0A3332" backgroundColor="#88B7B6" size={30} />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.commentCtn}>
                            <TextInput
                                style={[ styles.input, { paddingLeft: 35 } ]}
                                placeholder="Commentaire"
                                placeholderTextColor= 'grey'
                                inputMode='text'
                                onChangeText={value => dispatch(setComment(value))}
                                value={comment}
                            />
                            <FontAwesome name="pencil" color="#0A3332" size={20} style={{ position: "absolute", left: 10 }} />                    
                        </View>
                        { invalidField.globalMessage && <Text style={styles.invalidField}>Renseigner le nom du jeu, la date et au moins 1 joueur</Text> }
                        <TouchableOpacity onPress={() => handleSaveGamePlay()} style={styles.saveBtn}>
                            <Text style={{color: '#F2F4F1', fontWeight: 600}}>Enregistrer</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            {/* </KeyboardAvoidingView> */}
        </AutocompleteDropdownContextProvider>
    );

}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        width: '100%',
        marginTop: 50,
        backgroundColor: '#F2F4F1',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20, 
        gap: 10,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    goBackTouchable: {
        borderRadius: 50,
        backgroundColor: "#88B7B6",
        position: 'absolute',
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        alignSelf: 'flex-start',
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 50,
        color: '#423D3D'
    },
    radioBtnBloc: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginRight:90,
    },
    radioBtnCtn: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#0A3332',
        borderRadius: 50,
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
        fontSize: 12,
    },
    addPlayerToGameplay: {
        position: 'relative',
        zIndex: 9,
        justifyContent: 'center',
    },
    adduser: {
        position: "absolute",
        left: 14,
        top: 12,
    },
    addPlayerCtn: {
        width: '85%',
        alignSelf: 'flex-end',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    addPlayerBtn: {
        position: "absolute",
        right: 15,
        borderRadius: 50,
        backgroundColor: "#88B7B6",
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
    },
    playerCtn: {
        backgroundColor: '#CDDCDB',
        borderRadius: 15,
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
    closeBtn: {
        position: 'absolute',
        top: -15,
        right: -15,
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
    photoBtn: {
        width: 60,
        height: 60,
        backgroundColor: "#88B7B6",
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    commentCtn: {
        justifyContent: 'center',
    },
    invalidField:{
        color: 'red',
        alignSelf: 'center',
        textAlign: 'center',
    },
    saveBtn: {
        alignSelf: 'center',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0A3332",
        height: 30,
        width: 150, 
        marginTop:10,
    },
    saveText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});