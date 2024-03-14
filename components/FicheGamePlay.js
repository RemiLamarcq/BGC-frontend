import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Alert, Image, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetFicheGamePlay } from '../reducers/ficheGamePlay';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const screenWidth = Dimensions.get('window').width;

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

    const photosJSX = gamePlayImages.map((imgUrl, i) => {
        return(
            <View key={i} style={styles.photoCtn}>
                <Image source={{ uri: imgUrl }} style={styles.photo} />
            </View>
        );
    });

    const playersJSX = players.map((player, i) => {
        const { friendName, isWinner, team, character, score } = player;
        return (
            <View key={i} style={styles.playerCtn}>
                <View style={styles.playerRowCtn}>
                    <Text style={ styles.player }>{friendName}</Text>
                    <View style={styles.radioBtnBloc}>
                        <Text>Vainqueur</Text>
                        <View style={styles.radioBtnCtn}>
                            <RadioButton
                                value="winner"
                                status={isWinner ? 'checked' : 'unchecked'}
                                style={styles.radioBtn}
                                color="#0A3332"
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.playerCtnBottom}>
                    { isTeam &&
                    <View style={styles.playerRowCtn}>
                        <Text>Equipe</Text>                        
                        <TextInput
                            style={[ styles.input, styles.playerInput ]}
                            inputMode='text'
                            editable={false}
                            value={team}
                        />
                    </View>
                    }
                    { isCharacter &&
                    <View style={styles.playerRowCtn}>
                        <Text>Personnage</Text>                        
                        <TextInput
                            style={[ styles.input, styles.playerInput ]}
                            inputMode='text'
                            editable={false}
                            value={character}
                        />
                    </View>                    
                    }
                    { isScore &&
                    <View style={styles.playerRowCtn}>
                        <Text>Score</Text>
                        <TextInput
                            style={[ styles.input, styles.playerInput ]}
                            inputMode='text'
                            editable={false}
                            value={score}
                        />
                    </View>
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
                { photosJSX.length !== 0 &&
                <View style={styles.swiperCtn}>
                    <SwiperFlatList 
                        showPagination
                        paginationDefaultColor={'#CDDCDB'}
                        paginationActiveColor={'#88B7B6'}
                        paginationStyle={{ bottom: - 35 }}
                    >
                        {photosJSX}
                    </SwiperFlatList>
                </View>
                }
                <View style={styles.playersCtn}>
                    {playersJSX}
                </View>
                <View style={styles.commentCtn}>
                    <Text style={styles.comment}>
                        {comment ? comment : `Aucune note enregistrée`}
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
        maxWidth: '60%',
        textAlign: 'center',
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
    swiperCtn: {
        height: 150,
        marginBottom: 20,
    },
    photoCtn:{
        width: screenWidth - 40,
    },
    photo:{
        flex: 1,
    },
    playersCtn: {
        gap: 15,
    },
    playerCtn: {
        backgroundColor: '#CDDCDB',
        borderRadius: 30,
        padding: 15,
        gap: 10,
    },
    playerRowCtn:{
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
        width: '60%',
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