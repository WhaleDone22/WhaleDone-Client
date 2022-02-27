import { BottomTabBar, createBottomTabNavigator } from 'react-navigation-tabs';
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
    Feed: FeedScreen,
    Map: MapScreen,
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
                style={{ height: 24, width: 24, marginTop: 6 }}
              />
            );
          case 'Map':
            return (
              <Image
                source={focused ? IcMapSelectedTrue : IcMapSelectedFalse}
                style={{ height: 24, width: 24, marginTop: 6 }}
              />
            );
          case 'Feed':
            return (
              <Image
                source={focused ? IcFeedSelectedTrue : IcFeedSelectedFalse}
                style={{ height: 24, width: 24, marginTop: 6 }}
              />
            );
          default:
            return <Text />;
        }
      },
    }),
    tabBarComponent: (props) => (
      <BottomTabBar
        {...props}
        getLabelText={({ route }) => {
          switch (route.routeName) {
            case 'Home':
              return '일상공유';
            case 'Map':
              return '마음거리';
            case 'Feed':
              return '소통함';
            default:
              return '';
          }
        }}
        style={{ borderTopColor: '#ACB3BC' }}
        labelStyle={{ fontSize: 12, marginTop: 2, fontFamily: 'Pretendard' }}
      />
    ),
  },
);

export default createAppContainer(TabNavigator);
