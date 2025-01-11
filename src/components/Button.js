import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {colors} from '../utilities/colors';
import {fonts} from '../utilities/fonts';

const Button = props => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          // borderColor: props?.light ? colors?.BLUE + 80 : undefined,
          // borderWidth: props?.light ? 1 : 0,
          backgroundColor: props?.light
            ? colors?.BLUE + 20
            : props?.yellow
            ? colors?.YELLOW
            : colors?.PRIMARY,
          borderBottomColor: colors?.PRIMARY,
          ...props?.style,
        },
      ]}
      onPress={props?.onPress}
      disabled={props?.disabled}>
      <View>{props?.LeftIcon ? props?.LeftIcon : null}</View>

      <Text
        style={[
          styles.button_text,
          {
            color: props?.light
              ? colors?.BLUE
              : props?.yellow
              ? colors?.WHITE
              : colors?.WHITE,
              ...props?.Textstyle,
              fontFamily: fonts.BOLD,
          },
        ]}>
        {props?.title}
      </Text>
      <View>{props?.icon ? props?.icon : null}</View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    marginVertical: 10,
    gap: 7,
  },
  button_text: {
    fontSize: 13,
    fontFamily: fonts?.SEMI_BOLD,
  
  },
});
