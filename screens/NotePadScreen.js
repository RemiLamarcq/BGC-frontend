import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';
import Header from '../components/Header';

export default function StatScreen({ navigation }) {
    const [notes, setNotes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [selectedNote, setSelectedNote] = useState(null);

    const token = useSelector(state => state.user.value.token);

    const handleBackToAccessoriesScreen = () => {
        navigation.navigate('TabNavigator', { screen: 'Accessoires' });
    };

    useEffect(() => {
        fetch(`https://bgc-backend.vercel.app/notePad/${token}`)
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setNotes(data.notePad);
                } else {
                    console.error(data.error);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [notes]);

    const deleteNote = (id, title) => {
        Alert.alert(
            'Confirmation',
            `Voulez-vous vraiment supprimer la note "${title}" ?`,
            [
                {
                    text: 'Annuler',
                    style: 'cancel',
                },
                {
                    text: 'Supprimer',
                    onPress: () => {
                        fetch(`https://bgc-backend.vercel.app/notePad/${token}/${id}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        })
                            .then(response => response.json())
                            .then(() => {
                                const updatedNotes = notes.filter(note => note._id !== id);
                                setNotes(updatedNotes);
                                console.log('Note supprimée');
                            })
                            .catch(error => {
                                console.error('Erreur lors de la suppression de la note:', error);
                            });
                    },
                },
            ]
        );
    };

    const resetNoteFields = () => {
      setNoteTitle('');
      setNoteContent('');
      setSelectedNote(null);
      console.log('je suis ici')
  };

  const truncateTitle = (title) => {
    const maxLength = 30;
    if (title.length > maxLength) {
        return title.substring(0, maxLength) + '...';
    }
    return title;
};
  
  const handlPressNewNote = () => {
    resetNoteFields ();
    setIsModalVisible(true);
  };

  const handlePressNote = (selectedNote) => {
    setSelectedNote(selectedNote);
    setIsModalVisible(true);
    if (!selectedNote) {
      console.log("Nouvelle note sélectionnée, réinitialisation des champs");
      resetNoteFields(); // Réinitialiser les champs si c'est une nouvelle note
  } else {
      console.log("Note existante sélectionnée, pas de réinitialisation des champs");
  }
};

    const handlPressAddNote = () => {
        const notePad = {
            title: noteTitle,
            content: noteContent
        }
        fetch(`https://bgc-backend.vercel.app/notePad`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, notePad })
        })
            .then(response => response.json())
            .then((data) => {
                console.log("fetch ok", data)
                setIsModalVisible(false)
            })
    };

    const notesCards = notes.map((savedNote, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => handlePressNote(savedNote)}>
                <View style={styles.notesCards}>
                    <View style={styles.headLine}>
                        <Text style={styles.title}>{truncateTitle(savedNote.title)}</Text>
                        <TouchableOpacity style={styles.deleteTouchable} onPress={() => deleteNote(savedNote._id, savedNote.title)}>
                            <FontAwesome
                                size={16}
                                name="trash"
                                color="#0A3332"
                                backgroundColor="#88B7B6" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textContent}>
                        <Text style={styles.content}>{savedNote.content}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    });

    return (
        <View style={styles.container}>
            <Header title="Bloc-notes" height={100} showMeeple={false} style={styles.header} />
            <TouchableOpacity style={styles.returnButton} onPress={handleBackToAccessoriesScreen}>
                <AntDesign name="arrowleft" size={24} color="#423D3D" />
            </TouchableOpacity>

            <Modal visible={isModalVisible} animationType="fade" transparent={true}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.returnButton} onPress={() => setIsModalVisible(false)}>
                        <AntDesign name="arrowleft" size={24} color="#423D3D" />
                    </TouchableOpacity>
                    {selectedNote ? (
                        <>
                            <Text style={{ alignSelf: 'center', fontSize: 20, margin: 10 }}>Détails de la note</Text>
                            <Text style={styles.selectedNoteTitle}>{selectedNote.title}</Text>
                            <View style={styles.selectedNoteContentArea}>
                              <Text style={styles.selectedNoteContent}>{selectedNote.content}</Text>
                            </View>
                            
                        </>
                    ) : (
                        <>
                            <Text style={{ alignSelf: 'center', fontSize: 20, margin: 10 }}>Nouvelle note</Text>
                            <TextInput
                                style={styles.noteTitle}
                                placeholder="Titre"
                                value={noteTitle}
                                onChangeText={(value) => setNoteTitle(value)}
                            />
                            <TextInput
                                style={styles.noteContent}
                                placeholder="Contenu"
                                multiline={true}
                                value={noteContent}
                                onChangeText={(value) => setNoteContent(value)}
                            />
                            <TouchableOpacity onPress={() => handlPressAddNote()} style={styles.buttonX}>
                                <Text style={{ color: '#423D3D', fontWeight: 600 }} >Enregistrer la note</Text>
                            </TouchableOpacity>
                        </>
                    )}

                </View>
            </Modal>

            <TouchableOpacity style={styles.addButton} onPress={() => handlPressNewNote()}>
                <FontAwesome5 style={styles.fabtn} name="plus-circle" size={24} color="#423D3D" />
                <Text style={styles.buttonText}>Nouvelle note</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollView}>
                {notesCards}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F1',
    alignItems : 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  returnButton:{
    backgroundColor: "#88B7B6",
    height: 40, 
    width:40,
    borderRadius: 50,
    margin: 5,
    alignItems:'center',
    justifyContent:'center',
    margin : 20,
    alignSelf: 'flex-start', // Aligner le bouton à gauche
  },
  notesCards:{
    width: 350,
    height: 100,
    backgroundColor: '#CDDCDB', 
    padding: 5,
    margin: 5,
    borderRadius: 20,
  }, 
  fabtn:{
    marginLeft:5,
  },

  buttonText:{
    marginLeft:5,
  },

  addButton: {
    flexDirection: 'row',
    backgroundColor :"#88B7B6",
    alignItems: 'center',
    borderRadius: 50,
    height: 40,
    width : 150,
    marginTop: 20,
    margin : 20,
    marginBottom: 20,
    alignSelf: 'flex-start', // Aligner le bouton à gauche

  },
  title:{
    margin: 10,
    fontSize: 20,
    fontWeight:'bold',
  }, 
  textContent:{
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft:10,
    height: 40,
    padding:5,

  },
  content:{
    marginLeft:10,    
  },
  headLine:{
    flexDirection:'row',
    justifyContent:'space-between',
    },
  deleteTouchable:{
    position: 'absolute',
    right: -5,
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: "#88B7B6",
    justifyContent: 'center',
    alignItems: 'center',
   },
  modalContainer: {
    flex: 1,
    top: 45, 
    width: '100%',
    backgroundColor: '#F2F4F1',
    alignItems: 'center',
    borderTopLeftRadius: 40, // Adjust the radius as needed
    borderTopRightRadius: 40,
   },        
   buttonX: {
    borderRadius: 50,
    backgroundColor: "#88B7B6",
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 150, 
    margin: 10,
    marginTop: 10
},
    noteTitle:{
      backgroundColor:'white', 
      borderRadius: 20,
      height: 50,
      width:'80%',
      marginBottom: 20,
},
    noteContent:{
      backgroundColor:'white', 
      borderRadius: 20,
      height: 200,
      width:'80%',
},
    selectedNoteTitle:{
      textAlign:'center',
      fontSize: 20,
      fontWeight:'bold',
      border : '#000000', 
      marginBottom: 20
    },
    selectedNoteContentArea:{
      padding: 10,
      backgroundColor:'white', 
      borderRadius: 20,
      width: '90%',
      height: 500,
    }
})
