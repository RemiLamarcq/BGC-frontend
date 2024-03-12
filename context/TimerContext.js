// TimerContext.js

import React, { createContext, useState, useContext } from 'react';

// Création du contexte TimerContext
const TimerContext = createContext();

// Hook personnalisé pour accéder au contexte TimerContext
export const useTimer = () => {
  return useContext(TimerContext);
};

// Componente fournisseur TimerProvider pour fournir le contexte aux composants enfants
export const TimerProvider = ({ children }) => {
  // État pour stocker les minuteries ajoutées
  const [timers, setTimers] = useState([]);

  // Fonction pour ajouter une minuterie
  const addTimer = (newTimer) => {
    setTimers((prevTimers) => [...prevTimers, newTimer]);
  };

  // Fonction pour supprimer une minuterie en fonction de sa clé unique
  const removeTimer = (key) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.key !== key));
  };

  return (
    <TimerContext.Provider value={{ timers, addTimer, removeTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
