import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors } from '../utilities/colors';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

const MyTabBar = memo(({ state, descriptors, navigation }) => {

  const USER = useSelector(state => state.AuthReducer?.user)

  const arr = [
    {
      title: 'Home',
      icon: require('../assets/images/Home.png'),
    },
    {
      title: 'Profile',
      icon: require('../assets/images/profile.png'),
    },
    {
      title: 'Cart',
      icon: require('../assets/images/package.png'),
    },
    {
      title: 'Heart',
      icon: require('../assets/images/Heart.png'),
    },
  ];

  const userArr = [
    {
      title: 'Home',
      icon: require('../assets/images/Home.png'),
    },
    {
      title: 'Profile',
      icon: require('../assets/images/profile.png'),
    },
    {
      title: 'Cirqle',
      icon: require('../assets/images/cirqle.png'),
    },
    {
      title: 'Heart',
      icon: require('../assets/images/Heart.png'),
    },
  ];

  
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.WHITE,
        elevation: 29,
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.tab}>
            <Image
              source={USER?.userRole == 'user' ? userArr[index]?.icon : arr[index]?.icon}
              resizeMode="contain"
              style={[styles.icon, { tintColor: colors.BLACK }]}
            />

            {isFocused ? (
              <View
                style={{
                  height: 2,
                  width: 25,
                  backgroundColor: colors.PRIMARY,
                  marginTop: 5,
                }}
              />
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
});
export default MyTabBar;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    backgroundColor: colors.PRIMARY,
    justifyContent: 'space-evenly',
    paddingBottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: 'absolute',
    bottom: 0,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  icon: {
    height: 25,
    width: 25,
    // tintColor: colors.WHITE,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});
