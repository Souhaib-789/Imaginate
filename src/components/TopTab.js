import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import TextComponent from './TextComponent';
import {colors} from '../utilities/colors';
import {fonts} from '../utilities/fonts';

const TopTab = props => {
  return (
    <View style={[styles.container, props.style]}>
      <FlatList
        horizontal
        data={props?.options}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          width: props?.options?.length > 3 ? 'auto' : '100%',
          ...props?.contentContainerStyle,
        }}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
            disabled={props?.disabled}
              key={index}
              onPress={() => props?.onActivePress(item?.name)}
              style={[
                styles.tab,
                {
                  paddingLeft: 0,
                  backgroundColor:
                    item?.name == props?.focused
                      ? props?.focusColor
                      : props?.unFocusColor,
                  ...props.customStyle,
                },
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {item?.name == props?.focused && (
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 4,
                      fontFamily: fonts?.SEMI_BOLD,
                      backgroundColor: colors.PRIMARY,
                      marginRight: 5,
                    }}
                  />
                )}
                <TextComponent
                  style={{
                    color: props.textColor
                      ? props?.textColor
                      : item?.name == props?.focused
                      ? colors.PRIMARY
                      : colors.BLACK,
                    fontFamily: item?.name == props?.focused ? fonts?.BLACK : fonts?.SEMI_BOLD,
                    fontSize: 10,
                    textAlign: 'center',
                    // fontWeight: item?.name == props?.focused ? '700' : '400',
                    ...props.textstyle,
                  }}
                  text={item?.name}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default TopTab;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 13,
  },
  tab: {
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingVertical: 10,

    // borderWidth: 1,
    // borderColor: colors?.BORDER,
    // borderRadius: 30,
  },
});
