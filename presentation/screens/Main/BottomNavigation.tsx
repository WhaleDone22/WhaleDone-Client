import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import { Image, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import FeedScreen from './Feed';
import MapScreen from './Map';
import HomeScreen from './Home';

const IcHomeSelectedTrue = require(`../../../assets/ic-home-selected-true.png`);
const IcHomeSelectedFalse = require(`../../../assets/ic-home-selected-false.png`);
const IcMapSelectedTrue = require(`../../../assets/ic-map-selected-true.png`);
const IcMapSelectedFalse = require(`../../../assets/ic-map-selected-false.png`);
const IcFeedSelectedTrue = require(`../../../assets/ic-feed-selected-true.png`);
const IcFeedSelectedFalse = require(`../../../assets/ic-feed-selected-false.png`);

// https://reactnavigation.org/docs/2.x/bottom-tab-navigator
const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen,
    Feed: FeedScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: '#000000',
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        switch (navigation.state.routeName) {
          case 'Home':
            return (
              <Image
                source={focused ? IcHomeSelectedTrue : IcHomeSelectedFalse}
                style={{ height: 20, width: 20 }}
              />
            );
          case 'Map':
            return (
              <Image
                source={focused ? IcMapSelectedTrue : IcMapSelectedFalse}
                style={{ height: 20, width: 20 }}
              />
            );
          case 'Feed':
            return (
              <Image
                source={focused ? IcFeedSelectedTrue : IcFeedSelectedFalse}
                style={{ height: 20, width: 20 }}
              />
            );
          default:
            return <Text />;
        }
      },
    }),
  },
);

export default createAppContainer(TabNavigator);
