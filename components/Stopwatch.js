import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

//Composant petit-enfant de AccessoiresScreen.js
// Composant enfant de Timer.js
// Frère de Countdown.js => minuteur

const Stopwatch = ({ timer, removeTimer }) => {
  // États locaux pour gérer le temps, l'état du chronomètre et une référence pour l'intervalle
  const [time, setTime] = useState(timer.time);
  const [running, setRunning] = useState(timer.running);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  // Fonction pour démarrer le chronomètre
  const startStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  };

  // Fonction pour mettre en pause le chronomètre
  const pauseStopwatch = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  // Fonction pour réinitialiser le chronomètre
  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
  };

  // Fonction pour reprendre le chronomètre après la pause
  const resumeStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  };

  // Effet useEffect pour démarrer le chronomètre au chargement initial
  useEffect(() => {
    if (running) {
      startStopwatch();
    }
  }, []);

  // Rendu du composant Stopwatch
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        {/* Affichage du temps écoulé */}
        <Text style={styles.timeText}>{time}s</Text>
  
        {/* Conteneur des boutons de contrôle du chronomètre */}
        <View style={styles.buttonContainer}>
          {/* Bouton pour démarrer ou mettre en pause le chronomètre */}
          <TouchableOpacity
            style={styles.playButton}
            onPress={running ? pauseStopwatch : startStopwatch}
          >
            <FontAwesome name={running ? "pause" : "play"} size={24} color="white" />
          </TouchableOpacity>
  
          {/* Bouton pour réinitialiser le chronomètre (disponible uniquement lorsque le chronomètre est arrêté) */}
          {!running && (
            <TouchableOpacity style={styles.resetButton} onPress={resetStopwatch}>
              <FontAwesome name="refresh" size={24} color="white" />
            </TouchableOpacity>
          )}
  
          {/* Bouton pour supprimer le chronomètre */}
          <TouchableOpacity style={styles.removeButton} onPress={() => removeTimer(timer.key)}>
            <Octicons name="x-circle-fill" size={24} color="#6E9D9C" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles pour le composant Stopwatch
const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    width: 340,
    padding: 10,
    backgroundColor: '#CDDCDB',
    margin: 20,
    borderRadius: 15,
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  timeText: {
    fontSize: 48,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  playButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#2ecc71',
  },
  resetButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#e74c3c',
  },
  pauseButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#f39c12',
  },
  removeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#c0392b',
  },
});

// Exportation du composant Stopwatch
export default Stopwatch;
