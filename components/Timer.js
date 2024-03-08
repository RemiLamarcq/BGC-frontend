import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import Countdown from './Countdown';
import Stopwatch from './Stopwatch';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Importer FontAwesome5

// Composant enfant de AccessoiresScreen.js
// Composant parent de Countdown.js => minuteur et Stopwatch.js => chrono

function Timer() {
  // État pour stocker les minuteries ajoutées
  const [timers, setTimers] = useState([
    { type: 'countdown', key: Date.now(), duration: 60, isCountdownActive: false },
    { type: 'stopwatch', key: Date.now() + 1, time: 0, running: false },
  ]);

  // Fonction pour ajouter une minuterie de type spécifié
  const addTimer = (type) => {
    // Création d'une nouvelle minuterie avec des propriétés initiales en fonction du type
    const newTimer = {
      type,
      key: Date.now(),
      ...(type === 'countdown' ? { duration: 60, isCountdownActive: false } : { time: 0, running: false }),
    };

    // Mise à jour de l'état avec la nouvelle minuterie
    setTimers((prevTimers) => [...prevTimers, newTimer]);
  };

  // Fonction pour supprimer une minuterie en fonction de sa clé unique
  const removeTimer = (key) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.key !== key));
  };

  return (
    <View style={styles.container}>
      {/* Titre de la section */}
      <Text style={styles.addTimer}>Ajouter un timer</Text>

      {/* Section pour ajouter une minuterie de type Countdown ou Stopwatch */}
      <View style={styles.addButtonsContainer}>
        {/* Bouton pour ajouter un minuteur */}
        <TouchableOpacity style={styles.addButton} onPress={() => addTimer('countdown')}>
          <FontAwesome5 style={styles.fabtn} name="plus-circle" size={24} color="black" />{/* Logo + de FA5 */}
          <Text style={styles.buttonText}>Ajouter un minuteur</Text>
        </TouchableOpacity>

        {/* Bouton pour ajouter un chronomètre */}
        <TouchableOpacity style={styles.addButton} onPress={() => addTimer('stopwatch')}>
          <FontAwesome5 style={styles.fabtn} name="plus-circle" size={24} color="black" />{/* Logo + de FA5 */}
          <Text style={styles.buttonText}>Ajouter un chrono</Text>
        </TouchableOpacity>
      </View>

      {/* Utilisation de ScrollView pour permettre le défilement des minuteries */}
      <ScrollView>
        {timers.map((timer) => (
          <View key={timer.key}>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop:30,
  },
  addButtonsContainer: {
    flexDirection: 'row', // Disposition verticale des éléments enfants
    justifyContent: 'space-around', // Espace équitable autour des éléments
  },
  addButton: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#88B7B6',
    borderRadius: 35,
    width: 140,
    height: 40,
    margin: 5,
  },
  buttonText: {
    fontSize: 10,
  },
  fabtn: {
    marginLeft: 5,
    marginRight: 5,
    height: 25,
  },
  addTimer: {
    fontSize: 14,
  },
});

export default Timer;
