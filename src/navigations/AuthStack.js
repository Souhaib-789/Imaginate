import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';


const Stack = createNativeStackNavigator();

const AuthStack = props => {
  const headerShown = { headerShown: false };
  return (
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen name="Login" component={Login} options={headerShown} /> 
    </Stack.Navigator>
  );
};

export default AuthStack;
