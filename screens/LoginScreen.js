import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard , Text} from 'react-native';
import { useSelector } from 'react-redux';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

export default function LoginScreen({navigation}) {

  const login = useSelector((state) => state.login.value)

  if (login === 'Signin') {
<<<<<<< HEAD
    return <Signin navigation={navigation}/>
  }

  else if (login === 'Signup') {
    return <Signup navigation={navigation}/>
=======
    console.log(navigation)
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
>>>>>>> ad32243d11cac73c1db3d71265b4a2548bda8237
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
