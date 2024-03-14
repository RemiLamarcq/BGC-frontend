import React, { useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
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
  const isFocused = useIsFocused();
  const [type, setType] = useState(CameraType.back);
  let cameraRef = useRef(null);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const selectedPhoto = useSelector(state => state.addGamePlayInfos.value.selectedPhoto);
  const hasCameraPermission = useSelector(state => state.cameraPermission.value);

  // Par défaut, le SnapScreen est masqué par la modale AddGamePlay, il faut donc modifier l'état de la modale lorsqu'on navigue vers SnapScreen.
  isFocused && dispatch(setAddGamePlayVisible(false));

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    const uri = photo?.uri;
    dispatch(setPhoto({ uri, selectedPhoto }));
  }

  function toggleFlash(){
    flashMode === FlashMode.off ?
    setFlashMode(FlashMode.on) : setFlashMode(FlashMode.off);
  }

  if(!hasCameraPermission || !isFocused){
    return <View></View>;
  }

  return (
    <Camera flashMode={flashMode} ref={ref => cameraRef = ref} type={type} style={styles.container}>
      <View style={styles.topIcons}>
        <TouchableOpacity>
          <FontAwesome 
            onPress={() => { dispatch(setAddGamePlayVisible(true)); navigation.navigate('TabNavigator'); }} 
            name="arrow-left" 
            style={styles.icons}
            color="white" 
          />
        </TouchableOpacity>
        <View style={styles.topRightIcons}>
          <TouchableOpacity>
            <FontAwesome 
              onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} 
              style={styles.icons} 
              name="rotate-right" 
              color="white" 
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome 
              onPress={() => toggleFlash()} 
              style={styles.icons}
              name="flash" 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity>
        <FontAwesome 
          name="circle-thin" 
          style={[styles.icons, { fontSize: 80 }]} 
          color="white" 
          onPress={() => takePicture()} 
        />
      </TouchableOpacity>
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
  icons:{
    fontSize: 50,
    textAlign: 'center',
  }
});
