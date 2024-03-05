
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Dice from './Dice';
import Timer from './Timer';
import Notepad from './Notepad';

//Composant enfant de AccessoiresScreen.js

function Accessories({ name, image, onPress }) {
   
      return (

            <TouchableOpacity onPress={onPress}>{/*Composition d'une zone cliquable*/}
              <View style={{ 
                  height: 120, 
                  flexDirection: 'row', 
                  padding: 10, 
                  alignItems: 'center', 
                  backgroundColor: '#CDDCDB', 
                  margin: 3,
                  borderRadius: 20,
                }}>
                <Image 
                  source={image} 
                  style={{ width: 100, 
                  height: 100, 
                  marginRight: 10 }} 
                />
                <Text style={{ }}>{name}</Text>
              </View>
            </TouchableOpacity>
      );
    };

export default Accessories;