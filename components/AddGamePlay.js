import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { transformInDate, checkFormatDate } from '../modules/formatDate';
import addGamePlayVisible from '../reducers/addGamePlayVisible';
import { setSelectedGameName } from '../reducers/selectedGameName';
import selectedGameName from '../reducers/selectedGameName';

export default function AddGamePlay({toggleModalAddGamePlay}) {

    const token = useSelector((state) => state.user.value.token);

    const addGamePlayVisible = useSelector(state => state.addGamePlayVisible.value);
    const selectedGameName = useSelector(state => state.selectedGameName.value);

    const dispatch = useDispatch();

    // gameList stocke tous les jeux sous forme {name, isTeam, isCharacter, isScore} 
    // pour l'affichage dans la dropdown et pour filtrer les View dans les players
    const [gameList, setGameList] = useState([]);
    // Liste d'amis de l'user
    const [friendsList, setfriendsList] = useState([]);
    // Données formatées(noms des jeux / friends) pour l'affichage du contenu des dropdowns
    const formattedGameNames = [];
    const formattedFriendsList = [];
    // Nom du jeu sélectionné par l'user
    const [chosenGameName, setChosenGameName] = useState(null);
    // Objet jeu sélectionné par l'user
    const chosenGame = gameList.find(game => game.name === chosenGameName);
    // Booléen indiquant si la partie est interrompue(true) ou terminée (false)
    const [isInterrupted, setIsInterrupted] = useState(false);
    // Stocke l'heure de début et de fin de la partie
    const [date, setDate] = useState({ startDate: null, endDate: null });
    // Lieu où est joué la partie
    const [location, setLocation] = useState('');
    // Nom du nouveau joueur à enregistrer dans la friendsList
    const [newFriend, setNewFriend] = useState('');
    // Booléen déclenchant le fetch GET de la liste des friends lorsque celle-ci change
    const [friendRegistered, toggleFriendRegistered] = useState(false);
    // Liste des joueurs de la partie et leurs infos(définies dans handleAddPlayer)
    const [players, setPlayers] = useState([]);
    // Commentaires à enregistrer avec la partie
    const [comment, setComment] = useState('');
    //Affiche des messages lorsque certains champs entrés dans le formulaire sont incomplets
    const [invalidField, setInvalidField] = useState({
        globalMessage: false,
        gameMissing: false,
        invalidDate: false,
        playerMissing: false
    });

    const [idInitialValue, setIdInitialValue] = useState(0);


    // A l'initialisation, récupère tous les jeux de la BDD sous forme {name, isTeam, isCharacter, isScore}
    useEffect(() => {
        fetch(`https://bgc-backend.vercel.app/games/allNames/${token}`)
        .then(response => response.json())
        .then(data => {
            setGameList(data.gameData);
        });
    }, [addGamePlayVisible]);

    // A l'initialisation et à chaque nouvel enregistrement d'un ami, récupère tous les noms des amis
    useEffect(() => {
        fetch(`https://bgc-backend.vercel.app/friends/getFriends/${token}`)
        .then(response => response.json())
        .then(data => {
            setfriendsList(data.friendsName);
        });
    }, [friendRegistered])

    // Formate les noms d'un jeu sous forme d'objet avec un id et un title(nécessaire pour le dropdown)
    if (gameList.length > 0) {
        for (let i = 0; i < gameList.length; i++) {
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
            !isEndDate && setDate({ ...date, startDate: text });
            isEndDate && setDate({ ...date, endDate: text })
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

    //Modifie l'état players en ajoutant un joueur
    function handleAddPlayer(friendName){
        setPlayers([...players, {
            friendName,
            isWinner: false,
            team: '',
            character: '',
            score: '',
        }]);
    }

    //Au clic du RadioButton vainqueur, modifie l'état players pour stocker le champ isWinner du joueur concerné
    function handleIsWinner(i){
        players[i] = { ...players[i], isWinner: !players[i].isWinner }
        setPlayers([...players])
    }

    //Modifie l'état players pour stocker le nom de l'équipe du joueur concerné
    function handleTeam(i, team){
        players[i] = { ...players[i], team }
        setPlayers([...players])
    }

    //Modifie l'état players pour stocker le nom du personnage utilisé par le joueur concerné
    function handleCharacter(i, character){
        players[i] = { ...players[i], character }
        setPlayers([...players])
    }

    //Modifie l'état players pour stocker le score du joueur concerné
    function handleScore(i, score){
        players[i] = { ...players[i], score }
        setPlayers([...players])
    }

    //Supprime un joueur de la partie
    function handleRemovePlayer(player){
        setPlayers(
            players.filter(obj => obj.friendName !== player.friendName)
        );
    }

    //Enregistre la partie
    function handleSaveGamePlay(){

        //Si un des champs suivants sont manquants(nom du jeu, date et 1 joueur minimum obligatoire), affiche un message d'erreur
        if(
            !chosenGameName ||
            !checkFormatDate(date.startDate) || 
            !checkFormatDate(date.endDate) ||
            players.length === 0)
        {
            invalidField.globalMessage = true;
            !chosenGameName ? (invalidField.gameMissing = true) : (invalidField.gameMissing = false);
            (!checkFormatDate(date.startDate) || !checkFormatDate(date.endDate)) ?
                (invalidField.invalidDate = true)
            :
                (invalidField.invalidDate = false);
            players.length === 0 ? (invalidField.playerMissing = true) : (invalidField.playerMissing = false);
            setInvalidField({ ...invalidField });
        }
        else{
            fetch(`https://bgc-backend.vercel.app/gamePlays`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    name: chosenGameName,
                    startDate: transformInDate(date.startDate),
                    endDate: transformInDate(date.endDate),
                    isInterrupted,
                    place: location,
                    players,
                    urlImage: ['test'],
                    comment,
                }),
            })
            .then(result => result.json())
            .then(data => data.result ? toggleModalAddGamePlay() : Alert(data.error))
            .catch(error => Alert(error));

        }
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
                                onPress={() => handleIsWinner(i)}
                                style={styles.radioBtn}
                                color="#0A3332"
                            />
                        </View>
                        <Text>Vainqueur</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleRemovePlayer(player)} style={styles.closeBtn} >
                        <FontAwesome name="close" color="#0A3332" backgroundColor="#88B7B6" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.playerCtnBottom}>
                    { chosenGame?.isTeam &&
                    <TextInput
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Equipe"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        onChangeText={value => handleTeam(i, value)}
                        value={team}
                    />
                    }
                    { chosenGame?.isCharacter &&
                    <TextInput
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Personnage"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        onChangeText={value => handleCharacter(i, value)}
                        value={character}
                    />
                    }
                    { chosenGame?.isScore &&
                    <TextInput
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Score"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        onChangeText={value => handleScore(i, value)}
                        value={score}
                    />
                    }
                </View>
            </View>
        );
    })

    useEffect(() => {
        if (formattedGameNames) {
            console.log(selectedGameName);
             // Le titre que vous cherchez
            const titreRecherche = selectedGameName;

            // Recherche de l'objet correspondant
            const objetTrouve = formattedGameNames.find(obj => obj.title === titreRecherche);

            // Extraction de l'id si l'objet est trouvé, sinon null
            const idTrouve = objetTrouve ? objetTrouve.id : null;

            console.log("ID correspondant :", idTrouve);

            setIdInitialValue(idTrouve);

        }
      }, [formattedGameNames]);

        let initialValue = idInitialValue;
    


    return(
            <AutocompleteDropdownContextProvider>
                <ScrollView contentContainerStyle={ styles.scrollView } >
                    <View style={styles.container}>
                        <View style={styles.topContainer} >
                            <TouchableOpacity style={styles.goBackTouchable} onPress={toggleModalAddGamePlay}>
                                <FontAwesome name="arrow-left" color="#0A3332" backgroundColor="#88B7B6" size={20} />
                            </TouchableOpacity>
                            <Text style={ styles.title }>Ajouter une partie</Text>
                        </View>
                        <AutocompleteDropdown
                            dataSet={formattedGameNames}
                            onSelectItem={item => item && setChosenGameName(item.title)}
                            onClear={() => setChosenGameName(null)}
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
                                    onPress={() => setIsInterrupted(!isInterrupted)}
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
                            onChangeText={value => setLocation(value)}
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
                                }}
                            />
                            <AntDesign name="adduser" style={styles.adduser} size={22}/>
                        </View>
                        { invalidField.playerMissing && <Text style={styles.invalidField}>Sélectionner un joueur</Text> }
                        {playersJSX}
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
                                placeholderTextColor= 'grey'
                                inputMode='text'
                                onChangeText={value => setComment(value)}
                                value={comment}
                            />
                            <FontAwesome name="pencil" color="#0A3332" size={20} style={{ position: "absolute", left: 10 }} />                    
                        </View>
                        { invalidField.globalMessage && <Text style={styles.invalidField}>Renseigner le nom du jeu, la date et au moins 1 joueur</Text> }
                        <TouchableOpacity onPress={() => handleSaveGamePlay()} style={styles.saveBtn}>
                            <Text style={styles.saveText}>Enregistrer</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </AutocompleteDropdownContextProvider>
    );

}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        width: '100%',
        minHeight:'95%',
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
        height: 45,
        width: 55,
        borderRadius: 50,
        backgroundColor: "#88B7B6",
        position: 'absolute',
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
        color: '#423D3D'
    },
    radioBtnBloc: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
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
        fontSize: 15,
    },
    addPlayerToGameplay: {
        position: 'relative',
        zIndex: 9,
        justifyContent: 'center',
    },
    adduser: {
        color: '#423D3D',
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
        height: 35,
        width: 35,
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
    closeBtn: {
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
    },
    invalidField:{
        color: 'red',
        alignSelf: 'center',
        textAlign: 'center',
    },
    saveBtn: {
        alignSelf: 'center',
        backgroundColor: "#88B7B6",
        borderRadius: 25,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});