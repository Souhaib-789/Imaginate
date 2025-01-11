import React, { useState } from 'react';
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
import { validateEmail } from '../../utilities/validators';
import { login, userData } from '../../redux/Actions/AuthAction';
import Storage from '../../utilities/AsyncStorage';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Remember, setRemember] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressLogin = async () => {
    // if (!email) {
    //   dispatch(showAlert({ message: 'Please enter email' }))
    // }
    // else if (validateEmail(email) == false) {
    //   dispatch(showAlert({ message: 'Please enter a valid email' }))
    // }
    // else if (!password) {
    //   dispatch(showAlert({ message: 'Please enter password' }))
    // }
    // else {
    dispatch(showLoading())
    await Storage.set('@user', JSON.stringify({ email: email }));
    dispatch(userData({ email: email }));
    dispatch(login(true));
    setTimeout(() => {
      dispatch(hideLoading())
    }, 1000)
    // }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.WHITE} />
      <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        <View style={{ width: '85%', marginBottom: 50, gap: 4 , marginTop: 70, alignItems: 'center' }}>
          <TextComponent text={'Welcome to Test App'} style={styles.heading} />
          <TextComponent text={'Enter any random credentials to login'} style={styles.span2} />
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
        <TextComponent text={'Made with ❤️ by Souhaib'} style={styles.span2} />
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
    width: '85%',
    marginTop: 50
  },
  input: {
    width: '85%',
    marginVertical: 2
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
  },

});
