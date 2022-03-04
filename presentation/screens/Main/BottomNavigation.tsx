/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import FeedScreen from './Feed';
import MapScreen from './Map';
import HomeScreen from './Home';

const IcHomeSelectedTrue = require(`../../../assets/ic-home-selected-true.png`);
const IcHomeSelectedFalse = require(`../../../assets/ic-home-selected-false.png`);
const IcMapSelectedTrue = require(`../../../assets/ic-map-selected-true.png`);
const IcMapSelectedFalse = require(`../../../assets/ic-map-selected-false.png`);
const IcFeedSelectedTrue = require(`../../../assets/ic-feed-selected-true.png`);
const IcFeedSelectedFalse = require(`../../../assets/ic-feed-selected-false.png`);

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  icon: { height: 24, width: 24, marginTop: 6 },
  label: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Pretendard',
    color: '#ACB3BC',
  },
  labelFocused: {
    color: '#000000',
  },
});

function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case 'Home':
              return (
                <Image
                  source={focused ? IcHomeSelectedTrue : IcHomeSelectedFalse}
                  style={styles.icon}
                />
              );
            case 'Map':
              return (
                <Image
                  source={focused ? IcMapSelectedTrue : IcMapSelectedFalse}
                  style={styles.icon}
                />
              );
            case 'Feed':
              return (
                <Image
                  source={focused ? IcFeedSelectedTrue : IcFeedSelectedFalse}
                  style={styles.icon}
                />
              );
            default:
              return <Text />;
          }
        },
        tabBarLabel: ({ focused }) => {
          switch (route.name) {
            case 'Home':
              return (
                <Text style={[styles.label, focused && styles.labelFocused]}>
                  일상공유
                </Text>
              );
            case 'Map':
              return (
                <Text style={[styles.label, focused && styles.labelFocused]}>
                  마음거리
                </Text>
              );
            case 'Feed':
              return (
                <Text style={[styles.label, focused && styles.labelFocused]}>
                  소통함
                </Text>
              );
            default:
              return '';
          }
        },
        tabBarLabelStyle: {
          borderTopColor: '#ACB3BC',
          marginTop: 9,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
