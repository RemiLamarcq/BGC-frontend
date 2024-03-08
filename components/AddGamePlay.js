import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';

export default function AddGamePlay({toggleModalAddGamePlay}) {

    const user = useSelector((state) => state.user.value);

    // Liste des noms de jeu dans le dropdown
    const [gameList, setGameList] = useState([]);
    const [friendsList, setfriendsList] = useState([]);
    // Données formatées(noms des jeux / friends) pour l'affichage du contenu des dropdowns
    const formattedGameList = [];
    const formattedFriendsList = [];

    // Nom du jeu sélectionné
    const [game, setGame] = useState(null);
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
    // Liste des joueurs de la partie et leurs infos
    const [players, setPlayers] = useState([]);

    console.log(players)

    // A l'initialisation récupère tous les noms des jeux de la BDD
    useEffect(() => {
        fetch(`https://bgc-backend.vercel.app/games/allNames/${user.token}`)
        .then(response => response.json())
        .then(data => {
            setGameList(data.gameNames);
        });
    }, []);

    useEffect(() => {
        fetch(`https://bgc-backend.vercel.app/friends/getFriends/${user.token}`)
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
                title: gameList[i]
            };
            formattedGameList.push(newObj);
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

    function handleAddFriend(){
        if(newFriend === ''){
            return;
        }
        fetch(`https://bgc-backend.vercel.app/friends/addFriend/${user.token}`, {
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

    function handleAddPlayer(friendName){
        setPlayers([...players, {
            friendName,
            isWinner: false,
            team: null,
            character: null,
            score: null,
        }]);
    }

    function handleIsWinner(player){
        const { friendName, isWinner, team, character, score } = player;
        setPlayers([
            ...players.filter(obj => obj.friendName !== friendName),
            { friendName, isWinner: !isWinner, team, character, score }
        ]);
    }
    function handleTeam(player, value){
        const { friendName, isWinner, character, score } = player;
        setPlayers([
            ...players.filter(obj => obj.friendName !== friendName),
            { friendName, isWinner, team: value, character, score }
        ]);
    }
    function handleCharacter(player, value){
        const { friendName, isWinner, team, score } = player;
        setPlayers([
            ...players.filter(obj => obj.friendName !== friendName),
            { friendName, isWinner, team, character: value, score }
        ]);
    }
    function handleScore(player, value){
        const { friendName, isWinner, team, character } = player;
        setPlayers([
            ...players.filter(obj => obj.friendName !== friendName),
            { friendName, isWinner, team, character, score: value }
        ]);
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
                                onPress={() => handleIsWinner(player)}
                                style={styles.radioBtn}
                                color="#0A3332"
                            />
                        </View>
                        <Text>Vainqueur</Text>
                    </View>
                    <TouchableOpacity style={styles.closeBtn} >
                        <FontAwesome name="close" color="#0A3332" backgroundColor="#88B7B6" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.playerCtnBottom}>
                    <TextInput
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Equipe"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        onChangeText={value => handleTeam(player, value)}
                        value={team}
                    />
                    <TextInput
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Personnage"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        onChangeText={value => handleCharacter(player, value)}
                        value={character}
                    />
                    <TextInput
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Score"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        onChangeText={value => handleScore(player, value)}
                        value={score}
                    />
                </View>
            </View>            
        );
    })

    return(
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.topContainer} >
                    <TouchableOpacity style={styles.goBackTouchable} onPress={toggleModalAddGamePlay}>
                        <FontAwesome name="arrow-left" color="#0A3332" backgroundColor="#88B7B6" size={20} />
                    </TouchableOpacity>
                    <Text style={ styles.title }>Ajouter une partie</Text>
                </View>
                <View style={{ position: 'relative', zIndex: 10 }}>
                    <AutocompleteDropdownContextProvider>
                        <AutocompleteDropdown
                            dataSet={formattedGameList}
                            onSelectItem={item => setGame(item?.title)}
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
                        />
                    </AutocompleteDropdownContextProvider>
                </View>
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
                <TextInput
                    style={ styles.input }
                    placeholder="Lieu"
                    placeholderTextColor= 'grey'
                    inputMode='text'
                    onChangeText={value => setLocation(value)}
                    value={location}
                />
                <View style={styles.addPlayerToGameplay}>
                    <AutocompleteDropdownContextProvider>
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
                            }}
                            inputContainerStyle={{
                                backgroundColor: 'white',
                                borderRadius: 25,
                                padding: 3,
                                paddingLeft: 25,
                            }}
                        />
                    </AutocompleteDropdownContextProvider>
                    <AntDesign name="adduser" style={{color: '#423D3D', position: "absolute", left: 12}} size={20}/>
                </View>
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
        height: 40,
        width: 40,
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
    }
});