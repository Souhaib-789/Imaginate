import React from 'react';
import {
  View,
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {colors} from '../utilities/colors';
import {fonts} from '../utilities/fonts';
import Button from './Button';
import Icon, {IconTypes} from './Icon';
import TextComponent from './TextComponent';

const Modal = props => {
  return (
    <RNModal
      onRequestClose={props?.onClose}
      animationType={props?.animationType ? props?.animationType : 'fade'}
      transparent={true}
      visible={props?.visible}>
         <KeyboardAvoidingView
    style={{ flex: 1, marginBottom: 20 }}
    behavior={Platform.OS == 'ios' ? 'padding' : undefined}
    >
      <View style={styles.main_container}>
        <View style={[styles.container, {...props?.style}]}>
          {props?.title && (
            <TextComponent text={props?.title} style={props.short_text ? styles.titlex : styles.title} />
          )}

          {props?.description && (
            <TextComponent
              text={props?.description}
              style={styles.description}
            />
          )}

          {props?.children}

          <View style={styles.row}>
            {props?.buttonTitle && (
              <Button
                title={props?.buttonTitle}
                onPress={props?.onDone}
                style={{
                  width: props?.cancelButton ? '47%' : '100%',
                  backgroundColor: colors.YELLOW,
                  ...props.buttonStyle,
                }}
              />
            )}
            {props?.cancelButton && (
              <Button
                title={
                  props?.cancelButtonTitle ? props?.cancelButtonTitle : 'Cancel'
                }
                onPress={props?.onClose}
                light
                style={styles.cancel_button}
              />
            )}
          </View>

          {props?.cross && (
            <TouchableOpacity onPress={props?.onClose} style={styles.cross}>
              <Icon
                name={'close-circle-outline'}
                type={IconTypes.MaterialCommunityIcons}
                size={25}
                color={colors?.BORDER}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255,0.5)',
  },
  container: {
    backgroundColor: colors.PRIMARY,
    width: '90%',
    padding: 20,
    borderRadius: 10,
  },
  cross: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 10,
    right: 10,
  },
  description: {
    color: colors.BLACK,
    fontFamily: fonts.REGULAR,
    paddingBottom: 5,
    fontSize: 13,
    textAlign: 'center',
  },
  titlex:{
    color: colors.WHITE,
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 18,
    marginVertical: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  title: {
    color: colors.WHITE,
    fontFamily: fonts.BOLD,
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
  cancel_button: {
    width: '47%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
});
