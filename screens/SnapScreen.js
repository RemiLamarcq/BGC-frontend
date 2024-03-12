import React, { useRef } from "react";
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setAddGamePlayVisible } from '../reducers/addGamePlayVisible';
import { useNavigation } from '@react-navigation/native';
import { setPhoto } from '../reducers/addGamePlayInfos';

export default function SnapScreen() {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(false);
  const isFocused = useIsFocused();
  const [type, setType] = useState(CameraType.back);
  let cameraRef = useRef(null);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const selectedPhoto = useSelector(state => state.addGamePlayInfos.value.selectedPhoto);

  useEffect(() => {
    if(isFocused){
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        if(status !== 'granted'){
          Alert.alert(
            'Permission requise',
            'Veuillez autoriser l\'accès à la caméra pour utiliser cette fonctionnalité',
            [{ text: 'OK' }],
            { cancelable: false }
          );
        }
      })();
    }
  }, []);

  // Par défaut, le SnapScreen est masqué par la modale AddGamePlay, il faut donc modifier l'état de la modale lorsqu'on navigue vers SnapScreen.
  isFocused && dispatch(setAddGamePlayVisible(false));

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    const uri = photo?.uri;
    const formData = new FormData();

    formData.append('photoFromFront', {
      uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    dispatch(setPhoto({ uri, selectedPhoto }));

    // fetch('http://192.168.1.12:3000/gamePlays/upload', {
    //   method: 'POST',
    //   body: formData,
    // }).then(response => response.json())
    //   .then(data => {
    //     data.result && dispatch(setPhoto({ uri: data.url, selectedPhoto }));
    //   });
  }

  function toggleFlash(){
    flashMode === FlashMode.off ?
    setFlashMode(FlashMode.on) : setFlashMode(FlashMode.off);
  }

  if(!hasPermission || !isFocused){
    return <View></View>;
  }

  return (
    <Camera flashMode={flashMode} ref={ref => cameraRef = ref} type={type} style={styles.container}>
      <View style={styles.topIcons}>
        <FontAwesome 
          onPress={() => { dispatch(setAddGamePlayVisible()); navigation.navigate('TabNavigator'); }} 
          name="arrow-left" 
          style={styles.button}
          color="white" 
        />
        <View style={styles.topRightIcons}>
          <FontAwesome 
            onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} 
            style={styles.button} 
            name="rotate-right" 
            color="white" 
          />
          <FontAwesome 
            onPress={() => toggleFlash()} 
            style={styles.button} 
            name="flash" 
            color="white" 
          />
        </View>
      </View>
      <View style={styles.bottomIcons}>
        <FontAwesome 
          name="circle-thin" 
          style={[styles.button, { fontSize: 80 }]} 
          color="white" 
          onPress={() => takePicture()} 
        />
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  topIcons:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topRightIcons:{
    justifyContent: 'center',
    gap: 30,
  },
  bottomIcons:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    fontSize: 50,
    textAlign: 'center',
  },
});
