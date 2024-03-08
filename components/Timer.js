import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function Timer() {
  const [timers, setTimers] = useState([{ id: 1, time: 0 }]);
  const [newTimer, setNewTimer] = useState(0);
  const timerIdCounter = useRef(2);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const TimerComponent = ({ timer }) => {
    return (
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timer.time} seconds</Text>
        <TouchableOpacity onPress={() => startStopTimer(timer.id)}>
          <Text style={styles.startButton}>{isActive ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const startStopTimer = (id) => {
    // Logic to start or stop the specific timer
    setTimers((prevTimers) => {
      return prevTimers.map((prevTimer) => {
        if (prevTimer.id === id) {
          return { ...prevTimer, time: seconds };
        }
        return prevTimer;
      });
    });
    setIsActive(!isActive);
  };

  const addTimer = () => {
    setTimers((prevTimers) => [...prevTimers, { id: timerIdCounter.current++, time: 0 }]);
  };

  return (
    <View style={styles.container}>
      {timers.map((timer) => (
        <TimerComponent key={timer.id} timer={timer} />
      ))}

      <View style={styles.addTimerContainer}>
        <TextInput
          style={styles.timerInput}
          placeholder="Enter initial time"
          keyboardType="numeric"
          value={newTimer.toString()}
          onChangeText={(text) => setNewTimer(text)}
        />
        <TouchableOpacity onPress={addTimer}>
          <Text style={styles.addButton}>Add Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timerText: {
    fontSize: 18,
    marginRight: 10,
  },
  startButton: {
    color: 'blue',
    fontSize: 16,
  },
  addTimerContainer: {
    marginTop: 20,
  },
  timerInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
    width: 200,
  },
  addButton: {
    color: 'green',
    fontSize: 18,
  },
});

export default Timer;
