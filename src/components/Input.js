import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { fonts } from '../utilities/fonts';
import { colors } from '../utilities/colors';
import Icon, { IconTypes } from './Icon';
import TextComponent from './TextComponent';

const Input = props => {
  const [isPassword, setIsPassword] = useState(props.isPassword);

  return (
    <View style={{ ...props?.mainStyle }}>
      {props?.label && (
        <TextComponent
          text={props?.label}
          style={[
            {
              color: props?.error ? colors?.RED : colors?.BLACK,
              fontSize: 11,
              position: 'absolute',
              left: 20,
              top: 3,
              backgroundColor: colors?.WHITE,
              zIndex: 1,
              paddingHorizontal: 5
            },
            { ...props?.labelStyle },
          ]}
        />
      )}

      <View
        style={[
          styles.inputContainer,
          { ...props?.style }
        ]}>
        {props?.leftIcon && (
        
            <TouchableOpacity onPress={props?.onleftIconPress} disabled={props?.onleftIconPress ? false : true}>
              {props?.leftIcon}
            </TouchableOpacity>

        )}


        <TextInput
          ref={props?.InputRef}
          cursorColor={props?.cursorColor}
          textAlignVertical={props?.textAlignVertical}
          onPressIn={props?.onPressIn}
          style={[
            styles.input,
            {
              textAlignVertical:props.numberOfLines? 'top':"center",
              width: (props?.rightIcon && props?.leftIcon) ? '85%' :
                (props?.rightIcon || props?.leftIcon) ? '90%' :
                  props?.isPassword ? '100%' : '100%',
              height: props?.multiline ? null : 40,
              ...props.TextInputStyle,
            },
          ]}
          onChangeText={props?.onChangeText}
          value={props?.value}
          placeholder={props?.placeholder}
          secureTextEntry={isPassword}
          maxLength={props?.maxLength}
          keyboardType={props?.keyboardType}
          onSubmitEditing={props.onSubmitEditing}
          numberOfLines={props?.numberOfLines}
          placeholderTextColor={
            props?.placeholderTextColor
              ? props?.placeholderTextColor
              : colors?.GREY
          }
          editable={props?.editable}
          multiline={props?.multiline}
          onFocus={props?.onFocus}
          onBlur={props?.onBlur}
        />

        {props?.rightIcon && (
          <>
            <View style={{ backgroundColor: colors?.LIGHT_GREY, height: 23, width: 1, marginLeft: 3 }} />

            <TouchableOpacity
              disabled={props?.error ? true : false}
              onPress={props?.onRightIconPress}>
              {props?.rightIcon}
            </TouchableOpacity>
          </>
        )}

        {props?.isPassword && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              bottom: 12,
              paddingVertical: 5
            }}
            onPress={() => setIsPassword(!isPassword)}>
            {isPassword ? (
              <Icon name={'eye-with-line'} type={IconTypes.Entypo} size={18} color={colors.LIGHT_GREY} />
            ) : (
              <Icon name={'eye'} type={IconTypes.Entypo} size={18} color={colors.LIGHT_GREY} />

            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: '98%',
    // elevation: 5,
    backgroundColor: 'rgba(54, 69, 79, 0.2)',
    borderColor: colors.APPGREY,
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    padding: 5,
    gap: 5,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 12,
    fontFamily: fonts?.REGULAR,
    color: colors?.BLACK,
    textAlignVertical: 'top',
  },
  search_icon: {
    width: 15,
    height: 15,
  },
  hr: {
    width: 37,
    height: 2,
    backgroundColor: colors?.LIGHT_YELLOW,
  },
});
