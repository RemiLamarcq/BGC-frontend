import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard , Text} from 'react-native';
import { useSelector } from 'react-redux';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

export default function LoginScreen({navigation}) {

  const login = useSelector((state) => state.login.value)

  if (login === 'Signin') {
    // console.log(navigation)
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <Signin navigation={navigation}/>
      </TouchableWithoutFeedback>
    )
    
  }

  else if (login === 'Signup') {
    return (      
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <Signup navigation={navigation}/>
      </TouchableWithoutFeedback>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  version:{
    alignContent:'flex-end',
    fontSize:500,
  }
});
