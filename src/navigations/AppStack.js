import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const headerShown = { headerShown: false };

  return (
    <Stack.Navigator screenOptions={headerShown} initialRouteName='BottomTab'>
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppStack;
