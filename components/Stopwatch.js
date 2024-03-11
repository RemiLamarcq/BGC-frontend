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
        {/* Affichage du temps écoulé */}
        
        <Text style={styles.timeText}>{time}s</Text>
  
        {/* Conteneur des boutons de contrôle du chronomètre */}
        <View style={styles.buttonContainer}>
          {/* Bouton pour démarrer ou mettre en pause le chronomètre */}
          <TouchableOpacity
            style={styles.playButton}
            onPress={running ? pauseStopwatch : startStopwatch}
          >
            <FontAwesome name={running ? "pause" : "play"} size={35} color="#423D3D" />
          </TouchableOpacity>
  
          {/* Bouton pour réinitialiser le chronomètre (disponible uniquement lorsque le chronomètre est arrêté) */}
          {!running && (
            <TouchableOpacity style={styles.resetButton} onPress={resetStopwatch}>
              <FontAwesome name="refresh" size={35} color="#423D3D" />
            </TouchableOpacity>
          )}
        </View>
          {/* Bouton pour supprimer le chronomètre */}
          <TouchableOpacity style={styles.removeButton} onPress={() => removeTimer(timer.key)}>
            <Octicons name="x-circle-fill" size={24} color="#6E9D9C" />
          </TouchableOpacity>
       
    </View>
  );
};

// Styles pour le composant Stopwatch
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 120,
    width: 300,
    margin:7,
    padding:30,
    backgroundColor: '#CDDCDB',
    borderRadius: 15,
    position: 'relative',
  },
  timeText: {
    fontSize: 30,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems:'center',
  },
  playButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor:  '#CDDCDB',
  },
  resetButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor:  '#CDDCDB',
  },
  pauseButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor:  '#CDDCDB',
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
});

// Exportation du composant Stopwatch
export default Stopwatch;
