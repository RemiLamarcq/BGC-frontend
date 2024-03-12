import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetFicheGamePlay } from '../reducers/ficheGamePlay';

export default function FicheGamePlay(){

    const dispatch = useDispatch();
    const gamePlay = useSelector(state => state.ficheGamePlay.value.gamePlay);
    const token = useSelector(state => state.user.value.token);
    const { id, game, endDate, players, gamePlayImages, comment } = gamePlay;
    const { name, isTeam, isScore, isCharacter } = game;

    function handleRemoveGamePlay(){
        fetch(`https://bgc-backend.vercel.app/gamePlays/${token}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(result => result.json())
        .then(data => {
            if(data.result){
                Alert.alert(`Partie de ${name} du ${endDate} supprimée`);
                dispatch(resetFicheGamePlay());
            } else {
                Alert.alert(error);
            }
        }).catch(error => Alert.alert(error));
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
                                style={styles.radioBtn}
                                color="#0A3332"
                            />
                        </View>
                        <Text>Vainqueur</Text>
                    </View>
                </View>
                <View style={styles.playerCtnBottom}>
                    { isTeam &&
                    <TextInput
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Equipe"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        // onChangeText={value => handleTeam(i, value)}
                        value={team}
                    />
                    }
                    { isCharacter &&
                    <TextInput
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Personnage"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        // onChangeText={value => handleCharacter(i, value)}
                        value={character}
                    />
                    }
                    { isScore &&
                    <TextInput
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Score"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        // onChangeText={value => handleScore(i, value)}
                        value={score}
                    />
                    }
                </View>
            </View>
        );
    });

    return(
        <ScrollView contentContainerStyle={ styles.scrollView } >
            <View style={styles.container}>
                <View style={styles.topCtn}>
                    <View style={styles.gameAndBtns}>
                        <TouchableOpacity style={styles.goBackTouchable} onPress={() => dispatch(resetFicheGamePlay())}>
                            <FontAwesome name="arrow-left" color="#0A3332" backgroundColor="#88B7B6" size={20} />
                        </TouchableOpacity>
                        <Text style={styles.game}>
                            {name}
                        </Text>
                        <TouchableOpacity style={styles.trash} onPress={handleRemoveGamePlay} >
                            <FontAwesome name="trash" color="#0A3332" backgroundColor="#88B7B6" size={20} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.date}>{endDate}</Text>
                </View>
                <View style={styles.slider}>
                    <View style={styles.photo}>

                    </View>
                    <View style={styles.sliderCircles}>
                        <View style={styles.circle}></View>
                        <View style={styles.circle}></View>
                        <View style={styles.circle}></View>
                    </View>
                </View>
                <View style={styles.playersCtn}>
                    {playersJSX}
                </View>
                <View style={styles.commentCtn}>
                    <Text style={styles.comment}>
                        {comment}
                    </Text>
                </View>
            </View>
        </ScrollView>
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
        gap: 20,
    },
    topCtn: {
        gap: 10,
    },
    gameAndBtns: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    goBackTouchable: {
        height: 45,
        width: 55,
        borderRadius: 25,
        backgroundColor: "#88B7B6",
        position: 'absolute',
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    game: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    trash:{
        height: 45,
        width: 45,
        borderRadius: 25,
        backgroundColor: "#88B7B6",
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    date: {
        alignSelf:'center',
        fontSize: 20,
    },
    slider: {
        alignItems: 'center',
        gap: 10,
    },
    photo: {
        width:'100%',
        height: 150,
        backgroundColor: 'pink',
    },
    sliderCircles: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    circle: {
        width: 15,
        height: 15,
        backgroundColor: '#88B7B6',
        borderRadius: 25,
    },
    playersCtn: {
        gap: 20,
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
    playerCtnBottom: {
        gap: 8,
    },
    playerInput: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 10,
        fontSize: 16,
    },
    commentCtn: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 25,
    },
    comment: {
        fontSize: 16,
    }
});