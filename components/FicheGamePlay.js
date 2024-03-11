import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function FicheGamePlay(){

    const players = [];

    const playersJSX = players.map((player, i) => {
        const { friendName, isWinner, team, character, score } = player;
        return (
            <View key={i} style={styles.playerCtn}>
                <View style={styles.playerCtnTop}>
                    <Text style={ styles.player }>{friendName}</Text>
                    <View style={styles.radioBtnBloc}>
                        <View style={styles.radioBtnCtn}>
                            <RadioButton
                                // value="winner"
                                // status={isWinner ? 'checked' : 'unchecked'}
                                // onPress={() => handleIsWinner(i)}
                                style={styles.radioBtn}
                                color="#0A3332"
                            />
                        </View>
                        <Text>Vainqueur</Text>
                    </View>
                </View>
                <View style={styles.playerCtnBottom}>
                    <TextInput
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Equipe"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        // onChangeText={value => handleTeam(i, value)}
                        // value={team}
                    />
                    <TextInput
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Personnage"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        // onChangeText={value => handleCharacter(i, value)}
                        // value={character}
                    />
                    <TextInput
                        style={[ styles.input, styles.playerInput ]}
                        placeholder="Score"
                        placeholderTextColor= 'grey'
                        inputMode='text'
                        // onChangeText={value => handleScore(i, value)}
                        // value={score}
                    />
                </View>
            </View>
        );
    });

    return(
        <ScrollView contentContainerStyle={ styles.scrollView } >
            <View style={styles.container}>
                <View style={styles.topCtn}>
                    <View style={styles.gameAndBtns}>
                        <TouchableOpacity style={styles.goBackTouchable}>
                            <FontAwesome name="arrow-left" color="#0A3332" backgroundColor="#88B7B6" size={20} />
                        </TouchableOpacity>
                        <Text style={styles.game}>7Wonders</Text>
                        <TouchableOpacity style={styles.trash}>
                            <FontAwesome name="trash" color="#0A3332" backgroundColor="#88B7B6" size={20} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.date}>14/03/2014 - 14H30</Text>
                </View>
                <View style={styles.slider}>
                    <View style={styles.photo}></View>
                    <View style={styles.sliderCircles}>
                        <View style={styles.circle}></View>
                        <View style={styles.circle}></View>
                        <View style={styles.circle}></View>
                    </View>
                </View>
                <View style={styles.playersCtn}>
                    {playersJSX}
                </View>
                <Text style={styles.comment}></Text>
            </View>
        </ScrollView>
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
    playerCtnBottom: {
        gap: 8,
    },
    playerInput: {
        width: '80%',
    },
    comment: {
        borderRadius: 25,
        textAlign: 'center',
        borderWidth: 2
    },
});