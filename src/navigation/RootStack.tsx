import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {HomeStackParamList} from '../interfaces/navigation.interface';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator<HomeStackParamList>();

const RootStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
