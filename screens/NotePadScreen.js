import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity,ScrollView ,Modal, TextInput, KeyboardAvoidingView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Importer FontAwesome5
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function StatScreen({navigation}) {

    const [notes, setNotes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [noteTitle, setNoteTitle] = useState(''); 
    const [noteContent, setNoteContent] = useState('');
  
    const token = useSelector(state => state.user.value.token);

    const handleBackToAccessooiresScreen = () => {
        // Return to accesoires Screen
        navigation.navigate('TabNavigator',{ screen: 'Accessoires' })
      };

    //Fetch GET pour récuperer les notes existantes de l'utilisateur en BDD
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

  const deleteNote = (id) =>{
    console.log('yo');
    console.log(notes._id, token)
    fetch(`https://bgc-backend.vercel.app/notePad/${token}/${id}`,{
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      }).then(response=> response.json())
    .then(() => {
      const updatedNotes = notes.filter(note => note._id !== id);
      setNotes(updatedNotes);
      console.log('delete')
    })
  }

  const handlPressAddNote = () => {
    // POST d'ajout de note
    // construction de l'objet notePade 
        const notePad = {
          title : noteTitle,
          content : noteContent
        }
      console.log('clic')
      console.log('token : ', token)
      console.log('notePad', notePad)
      fetch(`https://bgc-backend.vercel.app/notePad`,{
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({token,notePad})
              })
          .then(response=> response.json())
          .then((data) => {
            console.log("fetch ok",data)
            setIsModalVisible(false)
          })
      
  }

  const notesCards = notes.map((savedNote, index) => {
    return (
    <View style={styles.notesCards}key={index}>
        <View style={styles.headLine}>
            <Text style={styles.title}>{savedNote.title}</Text>
            <TouchableOpacity style={styles.deleteTouchable} onPress={() => deleteNote(savedNote._id)} >
                        <FontAwesome 
                            name="trash"
                            color="#0A3332" 
                            size={15}
                            marginTop={10}
                            marginRight={10}/>
   
                    </TouchableOpacity>
        </View>
        <View style={styles.textContent}>
        <   Text style={styles.content}>{savedNote.content}</Text>
        </View>
    </View>
    )
    
  })

  
  return (
    
    
    <View style={styles.container}>
         <Header title="Bloc-notes" height={100}  showMeeple={true} style={styles.header} />
        <TouchableOpacity style={styles.returnButton} onPress={handleBackToAccessooiresScreen}>
            <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        
        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.returnButton} onPress={() => setIsModalVisible(false)}>
            <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
          <Text style={{alignSelf: 'center', fontSize: 20, margin: 10}}>Nouvelle note</Text>
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
            <Text style={{color: '#423D3D', fontWeight: 600}} >Enregistrer la note</Text>
        </TouchableOpacity>
        </View>
      </Modal>
      
        <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
      <FontAwesome5 style={styles.fabtn} name="plus-circle" size={24} color="black"  />{/* Logo + de AntDesign */}
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
    justifyContent:"center",
    alignContent:'center',
    textAlign:'center',
    borderRadius:50,
    height:25,
    width:25,
    backgroundColor:'#88B7B6'
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
}
})

