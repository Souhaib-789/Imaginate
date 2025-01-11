import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon, { IconTypes } from './Icon';
import { colors } from '../utilities/colors';
import { fonts } from '../utilities/fonts';
import TextComponent from './TextComponent';

const Header = ({
  back,
  backPress,
  rightIcon,
  style,
  title,
  titleStyle,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        {
          ...style,
          justifyContent:  'space-between',
        },
      ]}
    >
      <View style={{ width:  '20%' }}>
        {back && (
          <TouchableOpacity
            style={styles.backIcon}
            onPress={backPress ? backPress : () => navigation.goBack()}
          >
            <Icon
              name="arrow-back-sharp"
              size={20}
              color={colors.SECONDARY}
              type={IconTypes.Ionicons}
            />
          </TouchableOpacity>
        )}
      </View>

    
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <TextComponent
            text={title}
            numberOfLines={2}
            style={[
              styles.heading,
              {
                ...titleStyle,
              },
            ]}
          />
        </View>

      <View style={styles.view_b}>
        {rightIcon && rightIcon}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    // zIndex: 199,
    backgroundColor: colors?.WHITE,
    paddingHorizontal: 15,
  },
  logo: {
    width: 140,
    height: 20,
  },
  view_b: {
    width: '20%',
    alignItems: 'flex-end',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  backIcon: {
    // borderWidth: 1,
    // borderColor: colors?.BORDER,
    // borderRadius: 10,
    // width: 30,
    // height: 30,
    // paddingLeft: 5,
  },
  callImg: {
    height: 17,
    width: 17,
    resizeMode: 'contain',
  },
  videoImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 14,
    fontFamily: fonts.SEMI_BOLD,
  },
  icon_image: {
    width: 20,
    height: 20,
    color: colors.PRIMARY,
  },
  profile_image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
});
