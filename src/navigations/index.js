import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import AuthStack from './AuthStack';
import { Text, View, Modal as RNModal, ActivityIndicator, Platform, SafeAreaView, StyleSheet, StatusBar, } from 'react-native';
import AppStack from './AppStack';
import { useDispatch, useSelector } from 'react-redux';
import Storage from '../utilities/AsyncStorage';
import { login, userData } from '../redux/Actions/AuthAction';
import { Snackbar } from 'react-native-paper';
import { hideAlert } from '../redux/Actions/GeneralActions';
import { colors } from '../utilities/colors';
import Image from '../components/Image';


const AppNavigation = () => {
  const islogin = useSelector(state => state.AuthReducer.isLogin);
  const loading = useSelector(state => state.GeneralReducer.loading);
  const showAlert = useSelector(state => state.GeneralReducer.showAlert);
  const alert = useSelector(state => state.GeneralReducer.alertOptions);
  const dispatch = useDispatch();


  useEffect(() => {
    isAuthentication();
  }, [islogin]);


  const isAuthentication = async () => {
    let user_data = await Storage.get('@user');
    if (user_data != null) {
      const userdata = JSON.parse(user_data);
      dispatch(userData(userdata));
      dispatch(login(true));
    } else {
      dispatch(login(false));
    }

  };


  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.WHITE} barStyle="light-content" />
      {Platform.OS === 'ios' ? (
        <SafeAreaView style={{ flex: 1 }}>
          {islogin == undefined ? (
            {/* SplashScreen.show() */ }
          ) : islogin ? (
            <AppStack />
          ) : (
            <AuthStack  />
          )}
        </SafeAreaView>
      ) : islogin == undefined ? (
        {/* SplashScreen.show() */ }
      ) : islogin ? (
        <AppStack />
      ) : (
        <AuthStack  />
      )}

      <RNModal visible={loading} transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={colors.WHITE} />
          <Text style={{ color: '#fff', margin: 10 }}>{'Loading , Please wait ...'}</Text>
        </View>
      </RNModal>


      <Snackbar
        onDismiss={() => dispatch(hideAlert())}
        duration={3000}
        style={{ backgroundColor: colors.BLACK }}
        visible={showAlert}>
        {alert?.message ? alert?.message : null}
      </Snackbar>
    </NavigationContainer>
  );
}

export default AppNavigation;


const styles = StyleSheet.create({

})
