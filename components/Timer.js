import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import Countdown from './Countdown';
import Stopwatch from './Stopwatch';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Clé de stockage pour AsyncStorage
const STORAGE_KEY = 'timerState';

function Timer(height) {
  // État pour stocker les minuteries
  const [timers, setTimers] = useState([]);

  // Charger les données des minuteries sauvegardées lorsque le composant est monté
  useEffect(() => {
    const fetchTimers = async () => {
      try {
        const storedTimers = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTimers !== null) {
          setTimers(JSON.parse(storedTimers));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des minuteries depuis AsyncStorage :', error);
      }
    };
  
    fetchTimers();
  }, []);

  // Mettre à jour les données des minuteries et les sauvegarder dans AsyncStorage
  const updateAndSaveTimers = (updatedTimers) => {
    setTimers(updatedTimers);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTimers))
      .catch(error => console.error('Erreur lors de la sauvegarde des minuteries dans AsyncStorage :', error));
  };

  // Fonction pour ajouter une minuterie
  const addTimer = (type) => {
    const newTimer = {
      type,
      key: Date.now(),
      name: type === 'countdown' ? `Minuteur ${timers.length + 1}` : `Chrono ${timers.length + 1}`,
      ...(type === 'countdown' ? { duration: 60, isCountdownActive: false } : { time: 0, running: false }),
    };

    updateAndSaveTimers([...timers, newTimer]);
  };

  // Fonction pour supprimer une minuterie
  const removeTimer = (key) => {
    const updatedTimers = timers.filter(timer => timer.key !== key);
    updateAndSaveTimers(updatedTimers);
  };

  return (
    <View style={[styles.container, { height: height }]}>
      {/* Titre de la section */}
      <Text style={styles.addTimer}>Ajouter un timer :</Text>

      {/* Section pour ajouter une minuterie de type Countdown ou Stopwatch */}
      <View style={styles.addButtonsContainer}>
        {/* Bouton pour ajouter un minuteur */}
        <TouchableOpacity style={styles.addButton} onPress={() => addTimer('countdown')}>
          <FontAwesome5 style={styles.fabtn} name="plus-circle" size={24} color="#423D3D"/>
          {/* Logo + de FontAwesome5 */}
          <Text style={styles.buttonText}>Ajouter un minuteur</Text>
        </TouchableOpacity>

        {/* Bouton pour ajouter un chronomètre */}
        <TouchableOpacity style={styles.addButtonChrono} onPress={() => addTimer('stopwatch')}>
          <FontAwesome5 style={styles.fabtn} name="plus-circle" size={24} color="#423D3D" />
          {/* Logo + de FontAwesome5 */}
          <Text style={styles.buttonText}>Ajouter un chrono</Text>
        </TouchableOpacity>
      </View>

      {/* Utilisation de ScrollView pour permettre le défilement des minuteries */}
      <ScrollView>
        {/* Mapper les minuteries pour les afficher */}
        {timers.map((timer) => (
          <View key={timer.key} style={styles.timerContainer}>
            {/* Conteneur du nom de la minuterie */}
            <View style={styles.timerNameContainer}>
              <Text style={styles.timerName}>{timer.name}</Text>
            </View>
            {/* Affichage de Countdown ou Stopwatch en fonction du type de la minuterie */}
            {timer.type === 'countdown' ? (
              <Countdown timer={timer} removeTimer={removeTimer} />
            ) : (
              <Stopwatch timer={timer} removeTimer={removeTimer} />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  addTimer: {
    fontSize: 15,
    color: "#423D3D",
  },
  addButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: "#88B7B6",
    alignItems: 'center',
    borderRadius: 50,
    height: 40,
    width: 173,
    marginTop: 40,
    marginBottom: 20,
    marginRight: 40,
  },
  addButtonChrono: {
    flexDirection: 'row',
    backgroundColor: "#88B7B6",
    alignItems: 'center',
    borderRadius: 50,
    height: 40,
    width: 173,
    marginTop: 40,
    marginBottom: 20,
    marginRight: 10,
  },
  fabtn: {
    marginLeft: 5,
    marginRight: 5,
  },
  timerName: {
    fontSize: 16,
    color: "#423D3D",
  },
});

export default Timer;
