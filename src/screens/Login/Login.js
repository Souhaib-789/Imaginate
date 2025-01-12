import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { colors } from '../../utilities/colors';
import Image from '../../components/Image';
import TextComponent from '../../components/TextComponent';
import { fonts } from '../../utilities/fonts';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Icon, { IconTypes } from '../../components/Icon';
import { hideLoading, showAlert, showLoading } from '../../redux/Actions/GeneralActions';
import { login, userData } from '../../redux/Actions/AuthAction';
import Storage from '../../utilities/AsyncStorage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { validateEmail } from '../../utilities/validators';
import { FIREBASE_WEB_CLIENT_ID } from '../../../env';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: FIREBASE_WEB_CLIENT_ID,
    });
  }, []);


  const setDataForPersist = async (data) => {
    await Storage.set('@user', JSON.stringify(data));
    dispatch(userData(data));
    dispatch(login(true));
  }

  const onPressLogin = async () => {
    if (!email) {
      dispatch(showAlert({ message: 'Please enter email' }))
    }
    else if (validateEmail(email) == false) {
      dispatch(showAlert({ message: 'Please enter a valid email' }))
    }
    else if (!password) {
      dispatch(showAlert({ message: 'Please enter password' }))
    }
    else {
      dispatch(showLoading())
      await auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          const data = {
            id: user?.user?.uid,
            email: user?.user?.email,
          }
          setDataForPersist(data);
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            dispatch(showAlert({ message: 'User not found' }))
          }
          else if (error.code === 'auth/wrong-password') {
            dispatch(showAlert({ message: 'Wrong password' }))
          }
          else {
            dispatch(showAlert({ message: 'Invalid email or password!' }))
          }
        })
        .finally(() => {
          dispatch(hideLoading())
        })
    }
  }

  const signInWithGoogle = async () => {
    try {
      dispatch(showLoading())
      await GoogleSignin.hasPlayServices();
      // const currentUser = await GoogleSignin.getCurrentUser();
      // console.log('Current User', JSON.stringify(currentUser, null, 8));

      const userInfo = await GoogleSignin.signIn();

      let idToken = userInfo?.data?.idToken;
      if (idToken) {
      
      const googleCredential = auth?.GoogleAuthProvider?.credential(idToken);
      await auth()?.signInWithCredential(googleCredential)
        .then((user) => {
          const data = {
            id: user?.user?.uid,
            name: user?.user?.displayName,
            email: user?.user?.email,
            profile_photo: user?.user?.photoURL
          }
          setDataForPersist(data);
        }
        )
        .catch((error) => {
          console.log(error);
        });}
    } catch (error) {
      // console.log(error.code);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        dispatch(showAlert({ message: 'Cancelled' }))
      }
      else {
        dispatch(showAlert({ message: 'Something went wrong' }))
      }
    }
    finally {
      dispatch(hideLoading())
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      console.log('User signed out!');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.WHITE} />
      <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        <View style={{ width: '85%', marginBottom: 50, gap: 4, marginTop: 70, alignItems: 'center' }}>
          <TextComponent text={'Imaginate'} style={styles.heading} />
        </View>

        <TouchableOpacity
          onPress={signInWithGoogle}

          style={{ borderRadius: 5, flexDirection: 'row', alignItems: 'center', marginTop: 60, gap: 10, borderWidth: 0.5, borderColor: colors.BLACK, paddingVertical: 10, paddingHorizontal: 50 }}>
          <Image source={require('../../assets/images/google.png')} style={{ width: 25, height: 25 }} />
          <TextComponent text={'Continue with Google'} />
        </TouchableOpacity>


        <View style={styles.wide_row}>
          <View style={styles.hr} />
          <TextComponent text={'or'} style={{ fontSize: 12 }} />
          <View style={styles.hr} />
        </View>

        <Input
          label='Email'
          value={email}
          mainStyle={styles.input}
          onChangeText={e => setEmail(e)}
          leftIcon={<Icon name={'envelope-o'} type={IconTypes.FontAwesome} color={colors?.LIGHT_GREY} size={16} />}
        />

        <Input
          label='Password'
          value={password}
          onChangeText={e => setPassword(e)}
          style={styles.input}
          isPassword
          secureTextEntry
          leftIcon={<Icon name={'lock'} type={IconTypes.Feather} color={colors?.LIGHT_GREY} size={16} />}
        />

        <Button title={'Login'} onPress={onPressLogin} style={styles.button} />


      </ScrollView>

      <View style={[styles.row, { alignSelf: 'center', marginBottom: 10 }]}>
        <TextComponent text={'Dont have an account ?'} style={styles.span2} />
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <TextComponent text={'Create one'} style={styles.span3} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.WHITE,
  },
  logo: {
    width: 220,
    height: 170,
    marginVertical: 30,
  },
  heading: {
    fontSize: 20,
    fontFamily: fonts?.BOLD,
  },
  span2: {
    fontSize: 12,
  },
  span3: {
    color: colors?.BLUE,
    fontSize: 11,
    textDecorationLine: 'underline'
  },
  link: {
    color: colors?.BLUE,
    fontFamily: fonts?.SEMI_BOLD,
    textDecorationLine: 'underline',
    fontSize: 12,
  },
  button: {
    width: '90%',
    marginTop: 50
  },
  input: {
    marginVertical: 10
  },
  row: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  wide_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 35
  },
  hr: { width: '40%', backgroundColor: colors.LIGHT_GREY, height: 0.5 }
});
