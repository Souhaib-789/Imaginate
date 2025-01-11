import { Text, View } from 'react-native';
import React from 'react';
import { colors } from '../utilities/colors';
import { fonts } from '../utilities/fonts';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const TextComponent = (props) => {
  return (
    <View>
      <Text
        onPress={props?.onPress}
        key={props?.key}
        onTextLayout={props?.onTextLayout}
        numberOfLines={props?.numberOfLines}
        style={[
          {
            color: colors?.BLACK,
            fontFamily: fonts?.REGULAR,
            opacity: props.activeOpacity,
          },
          props?.style,
        ]}
        allowFontScaling={false}
      >
        {props?.text}
      </Text>
      {props?.underLine && (
        <View style={{ height: 2, backgroundColor: colors.YELLOW }} />
      )}
    </View>
  );
};

export default TextComponent;
