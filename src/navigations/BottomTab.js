import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import Home from '../screens/Home/Home';
import { colors } from '../utilities/colors';
import TextComponent from '../components/TextComponent';
import Icon, { IconTypes } from '../components/Icon';
import Location from '../screens/Location/Location';
import Bookmark from '../screens/Bookmark/Bookmark';
import Profile from '../screens/Profile/Profile';
import Contracts from '../screens/Contracts/Contracts';
import AI from '../screens/AI/AI';

const BottomTab = () => {
  const headerShown = { headerShown: false };
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      labeled={true}
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;
          let itemColor = colors?.L_GRAY;
          if (route?.name == 'Home') {
            icon = <Icon type={IconTypes.AntDesign} name="home" size={20} color={focused ? colors?.PRIMARY : itemColor} />;
          } else if (route?.name == 'Location') {
            icon = <Icon type={IconTypes.SimpleLineIcons} name="location-pin" size={20} color={focused ? colors?.PRIMARY : itemColor} />;
          } else if (route?.name == 'Bookmark') {
            icon = <Icon type={IconTypes.FontAwesome} name="bookmark-o" size={20} color={focused ? colors?.PRIMARY : itemColor} />;
          }
          else if (route?.name == 'Profile') {
            icon = <Icon type={IconTypes.AntDesign} name="user" size={20} color={focused ? colors?.PRIMARY : itemColor} />;
          }
          else if (route?.name == 'Contracts') {
            icon = <Icon type={IconTypes.MaterialCommunityIcons} name="clipboard-file-outline" size={20} color={focused ? colors?.PRIMARY : itemColor} />;
          }
          else if (route?.name == 'AI') {
            icon = <Icon type={IconTypes.MaterialCommunityIcons} name="robot-outline" size={20} color={focused ? colors?.PRIMARY : itemColor} />;
          }

          return (
            <View>
              {icon}
            </View>
          );
        },
        tabBarStyle: styles.tabBarStyle,
        tabBarLabel: ({ focused, color }) => {
          return (
            <TextComponent
              style={{
                fontSize: 10,
                color: focused ? colors.PRIMARY : colors.L_GRAY,
                paddingBottom: 5,
              }}
              text={route?.name}
            />
          );
        },
      })}>
      <Tab.Screen name={"Home"} component={Home} options={headerShown} />
      <Tab.Screen name={"Location"} component={Location} options={headerShown} />
      <Tab.Screen name={"Bookmark"} component={Bookmark} options={headerShown} />
      <Tab.Screen name={"Profile"} component={Profile} options={headerShown} />

       {/* <Tab.Screen name={"Contracts"} component={Contracts} options={headerShown} />
       <Tab.Screen name={"AI"} component={AI} options={headerShown} /> */}





    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
  },
  tabBarStyle: {
    padding: 10,
    height: 50,
    paddingBottom: 10,
    shadowOpacity: 5,
    borderWidth: 0,
    shadowOffset: {
      width: 100,
      height: 5,
    },
    shadowColor: colors.PRIMARY,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: colors.WHITE,
  },
});
