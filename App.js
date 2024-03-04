import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AccessoiresScreen from './screens/AccessoiresScreen';
import ArmoireScreen from './screens/ArmoireScreen';
import CahierScreen from './screens/CahierScreen';
import StatScreen from './screens/StatScreen';
import LoginScreen from './screens/LoginScreen';
import { Provider } from 'react-redux';
import { configureStore} from '@reduxjs/toolkit';
import user from './reducers/user';
import login from './reducers/login';

const store = configureStore({
  reducer: {user, login},
 });


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: '#6E9D9C',
      },
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Armoire') {
          iconName = 'heart';
        } else if (route.name === 'Cahier') {
          iconName = 'heart';
        } else if (route.name === 'Stat') {
          iconName = 'heart';
        } else if (route.name === 'Accessoires') {
          iconName = 'heart';
        } 

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FFFFFF',
      tabBarInactiveTintColor: '#0A3332',
      headerShown: false,
    })}>
      <Tab.Screen name="Armoire" component={ArmoireScreen} />
      <Tab.Screen name="Cahier" component={CahierScreen} />
      <Tab.Screen name="Stat" component={StatScreen} />
      <Tab.Screen name="Accessoires" component={AccessoiresScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (

    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}