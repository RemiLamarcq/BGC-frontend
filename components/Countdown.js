// Importation des modules nécessaires depuis React et React Native
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

//Composant petit-enfant de AccessoiresScreen.js
// Composant enfant de Timer.js
// Frère de Stopwatch.js => chrono

const Countdown = ({ timer, removeTimer }) => {
  // États locaux pour gérer la durée, l'état du compte à rebours, et la clé
  const [duration, setDuration] = useState(timer.duration);
  const [isCountdownActive, setIsCountdownActive] = useState(timer.isCountdownActive);
  const [key, setKey] = useState(timer.key);
  
  // Fonction pour démarrer le compte à rebours
  const handleStartCountdown = () => {
    setIsCountdownActive(true);
  };
  
  // Fonction pour mettre en pause le compte à rebours
  const handlePauseCountdown = () => {
    setIsCountdownActive(false);
  };
  
  // Fonction pour réinitialiser le compte à rebours
  const handleResetCountdown = () => {
    setIsCountdownActive(false);
    setDuration(timer.duration);
    setKey((prevKey) => prevKey + 1);
  };
  
  // Fonction pour gérer le changement de la durée du compte à rebours
  const handleDurationChange = (text) => {
    setIsCountdownActive(false);
    setDuration(parseInt(text) || 0);
    setKey((prevKey) => prevKey + 1);
  };
  
  // Effet useEffect pour mettre à jour la clé lors du changement de la durée
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [duration]);
    
  // Rendu du composant Countdown
  return (
    <View style={styles.cardContainer}>
      {/* Composant CountdownCircleTimer pour afficher le cercle de compte à rebours */}
      <CountdownCircleTimer
        key={key}
        isPlaying={isCountdownActive}
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[duration, duration / 1.5, duration / 2, 0]}
        size={80}
        strokeWidth={4}
      >
        {({ remainingTime }) => (
          <View style={styles.countdownContainer}>
            {/* Affichage du temps restant */}
            <Text style={styles.timeText}>{Math.ceil(remainingTime)}s</Text>
          </View>
        )}
      </CountdownCircleTimer>

      {/* Champ de texte pour la saisie de la durée */}
      <TextInput
        style={styles.timerInput}
        placeholder="Durée initiale (sec)"
        keyboardType="numeric"
        value={duration.toString()}
        onChangeText={handleDurationChange}
      />

      {/* Conteneur des boutons de contrôle du compte à rebours */}
      <View style={styles.buttonContainer}>
        {/* Bouton pour mettre en pause le compte à rebours */}
        {isCountdownActive ? (
          <TouchableOpacity style={styles.pauseButton} onPress={handlePauseCountdown}>
            <FontAwesome name="pause" size={35} color="#423D3D"  />
          </TouchableOpacity>
        ) : (
            <TouchableOpacity style={styles.playButton} onPress={handleStartCountdown}>
            {/* Bouton pour démarrer le compte à rebours */}
            <FontAwesome name="play" size={35} color="#423D3D"  />
          </TouchableOpacity>
        )}

        {/* Bouton pour réinitialiser le compte à rebours */}
        <TouchableOpacity style={styles.resetButton} onPress={handleResetCountdown}>
          <FontAwesome name="refresh" size={35} color="#423D3D"  />
        </TouchableOpacity>
      </View>

      {/* Bouton pour supprimer le minuteur */}
      <TouchableOpacity style={styles.removeButton} onPress={() => removeTimer(timer.key)}>
        <Octicons name="x-circle-fill" size={15} color="#6E9D9C" />
      </TouchableOpacity>

      {/* Affichage du nom du minuteur */}
      <Text style={styles.timerName}>{timer.name}</Text>
    </View>
  );
};

// Styles pour le composant Countdown
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 120,
    width: 300,
    margin:7,
    padding:10,
    backgroundColor: '#CDDCDB',
    borderRadius: 15,
    position: 'relative',
  },
  countdownContainer: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 30,
    color: 'black',
  },
  timerInput: {
    borderWidth: 1,
    borderColor: '#0A3332',
    borderRadius: 10,
    padding: 8,
    marginLeft: 10,
    width: 70,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    alignItems: 'center',
    width: 40,
    marginLeft: 10,
  },
  pauseButton: {
    alignItems: 'center',
    width: 40,
    marginLeft: 10,
  },
  resetButton: {
    alignItems: 'center',
    width: 40,
    marginLeft: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  timerName: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
});

// Exportation du composant Countdown
export default Countdown;
