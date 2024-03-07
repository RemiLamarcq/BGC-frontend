import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Importer FontAwesome5
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// Composant enfant de AccessoiresScreen.js
function Notepad() {
  // États pour gérer le titre, la note et la liste des notes
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const token = useSelector(state => state.user.value.token);

  //Fetch GET pour récuperer les notes existantes de l'utilisateur en BDD
  useEffect(() => {
    fetch(`https://bgc-backend.vercel.app/notePad/${token}`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setNotes(data.notePad);
          console.log(data.notePad)
        } else {
          console.error(data.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  

  // Fonction pour ajouter une nouvelle note à la liste
  const addNote = () => {
    if (title || note) {

      // Réinitialise le titre et la note après avoir ajouté la note
      setTitle('');
      setNote('');
    }
  };

  // Fonction pour supprimer une note de la liste
  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  // Structure du composant
  return (
    <View style={styles.container}>
      {/* Bouton pour ajouter une note */}
      <TouchableOpacity style={styles.addButton} onPress={addNote}>
        <FontAwesome5 name="plus-circle" size={24} color="black" />{/* Logo + de AntDesign */}
        <Text>Ajouter une note</Text>
      </TouchableOpacity>
      <View style={styles.cardContainer}>
      {/* Liste des notes */}
      <ScrollView style={styles.notesContainer}>
        {notes.map((savedNote, index) => (
          <View key={index} style={styles.savedNote}>
            <TouchableOpacity onPress={() => deleteNote(index)} style={styles.deleteButton}>
            <Feather name="x-circle" size={24} color="black" />            
            </TouchableOpacity>
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
    </View>
  );
}

// Styles pour le composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F1',
    alignItems: 'center'
  },

  cardContainer: {
    height: 120,
    width: 340,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#CDDCDB',
    margin: 20,
    borderRadius: 15,
    justifyContent: 'space-around',
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
    padding: 20,
    borderRadius: 35,
    width: 180,
    height: 65,
  },

  savedNote: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    position: 'relative',
  },

  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default Notepad;
