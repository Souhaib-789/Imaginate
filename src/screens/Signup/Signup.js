import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { colors } from '../../utilities/colors';
import TextComponent from '../../components/TextComponent';
import { fonts } from '../../utilities/fonts';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import Icon, { IconTypes } from '../../components/Icon';
import { hideLoading, showAlert, showLoading } from '../../redux/Actions/GeneralActions';
import { login, userData } from '../../redux/Actions/AuthAction';
import Storage from '../../utilities/AsyncStorage';
import auth from '@react-native-firebase/auth';
import { validateEmail } from '../../utilities/validators';
import firestore from '@react-native-firebase/firestore';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const onPressSignup = async () => {
        if (!name) {
            dispatch(showAlert({ message: 'Please enter email' }))
        } else if (!email) {
            dispatch(showAlert({ message: 'Please enter email' }))
        }
        else if (validateEmail(email) == false) {
            dispatch(showAlert({ message: 'Please enter a valid email' }))
        }
        else if (!password) {
            dispatch(showAlert({ message: 'Please enter password' }))
        }
        else if (password !== confirm_password) {
            dispatch(showAlert({ message: 'Password does not match' }))
        }
        else {
            dispatch(showLoading())
            await auth().createUserWithEmailAndPassword(email, password)
            auth().currentUser.updateProfile({
                displayName: name
            })
                .then((user) => {
                    const data = {
                        id: user?.user?.uid,
                        email: user?.user?.email,
                        name: user?.user?.displayName,
                        profile_photo: user?.user?.photoURL
                    }
                    dispatch(showAlert('Your account has been created !'));
                    firestore()
                        .collection('Users')
                        .doc(auth().currentUser.uid)
                        .set({
                            name: name,
                            email: email,
                            uid: auth().currentUser.uid,
                        });

                    Storage.set('@user', JSON.stringify(data));
                    dispatch(userData(data));
                    dispatch(login(true));
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        dispatch(showAlert({ message: 'That email address is already in use!' }))
                    }
                    if (error.code === 'auth/invalid-email') {
                        dispatch(showAlert({
                            message: 'That email address is invalid!'
                        }))
                    }
                    console.error(error);
                })
                .finally(() => {
                    dispatch(hideLoading())
                })
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.WHITE} />
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                <View style={{ width: '85%', marginBottom: 50, gap: 4, marginTop: 70, alignItems: 'center' }}>
                    <TextComponent text={'Create your account'} style={styles.heading} />
                </View>

                <Input
                    label='Name'
                    value={name}
                    mainStyle={styles.input}
                    onChangeText={e => setName(e)}
                    leftIcon={<Icon name={'user'} type={IconTypes.AntDesign} color={colors?.LIGHT_GREY} size={16} />}
                />

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

                <Input
                    label='Confirm Password'
                    value={confirm_password}
                    onChangeText={e => setConfirmPassword(e)}
                    style={styles.input}
                    isPassword
                    secureTextEntry
                    leftIcon={<Icon name={'lock'} type={IconTypes.Feather} color={colors?.LIGHT_GREY} size={16} />}
                />

                <Button title={'Signup'} onPress={onPressSignup} style={styles.button} />


            </ScrollView>

            <View style={[styles.row, { alignSelf: 'center', marginBottom: 10 }]}>
                <TextComponent text={'Made with ❤️ by Souhaib'} style={styles.span2} />
            </View>
        </View>
    );
};

export default Signup;

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
