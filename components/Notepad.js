import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';

//Composant enfant de AccessoiresScreen.js

function Notepad() {
    // États pour gérer le titre, la note et la liste des notes
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);
  
    // Fonction pour ajouter une nouvelle note à la liste
    const addNote = () => {
      if (title || note) {
        // Ajoutez la nouvelle note à la liste des notes
        const newNote = { title, note };
        setNotes([...notes, newNote]);
  
        // Réinitialise le titre et la note après avoir ajouté la note
        setTitle('');
        setNote('');
      }
    };
  
    // Structure du composant
    return (
      <View style={styles.container}>
        {/* Bouton pour ajouter une note */}
        <TouchableOpacity style={styles.addButton} onPress={addNote}>
            <AntDesign name="plus" size={24} color="#0A3332" />
            <Text>Ajouter une note</Text>
        </TouchableOpacity>
        {/* Liste des notes */}
        <ScrollView style={styles.notesContainer}>
          {notes.map((savedNote, index) => (
            <View key={index} style={styles.savedNote}>
              <Text style={styles.noteTitle}>{savedNote.title}</Text>
              <Text style={styles.noteContent}>{savedNote.note}</Text>
            </View>
          ))}
        </ScrollView>
       
        <View style={styles.inputContainer}>
          {/* titre de la note */}
          <TextInput
            style={styles.titleInput}
            placeholder="Titre de la note"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          {/* Champ de saisie */}
          <TextInput
            style={styles.noteInput}
            multiline
            placeholder="Commencez à écrire..."
            value={note}
            onChangeText={(text) => setNote(text)}
          />
        </View>
      </View>
    );
}

// Styles pour le composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F1',
  },
  notesContainer: {
    flex: 1,
    padding: 20,
  },
  
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteContent: {
    fontSize: 16,
  },
  inputContainer: {
    padding: 20,
  },
  titleInput: {
    fontSize: 18,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  noteInput: {
    fontSize: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  
  // Styles pour le bouton +
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#88B7B6',
    padding: 10,
    borderRadius: 35,
    width: 160,
    height: 40,
  },
});

export default Notepad;
