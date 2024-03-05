import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

export default function AddGame() {
    const user = useSelector((state) => state.user.value);
    const [game,setGame] = useState('');
    const [gameList,setGameList] = useState ([]);
    const [gamePicked, setGamePicked] = useState (false);

    const dataSet = [];

    useEffect(() => {
        fetch(`https://bgc-backend.vercel.app/games/allNames/${user.token}`)
        .then(response => response.json())
        .then(data => {
            setGameList(data.gameNames)
            console.log(gameList);
        })
    }, []);

    if (gameList.length > 0) {
        for (let i = 0; i< gameList.length; i++) {
            let newObj = {
                id: i+1,
                title: gameList[i]
            };
            dataSet.push(newObj);
        }
    }
    

        return (
            <AutocompleteDropdownContextProvider>
              <Text >Ajoutez un jeu</Text>
              <AutocompleteDropdown
                dataSet={dataSet}
                textInputProps={{ placeholder: 'Rechercher un jeu' }}
                closeOnSubmit
              />
          </AutocompleteDropdownContextProvider>
        );
      }