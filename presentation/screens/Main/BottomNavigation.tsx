import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import { Image } from 'react-native';
import FeedScreen from './Feed';
import MapScreen from './Map';
import HomeScreen from './Home';
import { createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen,
    Feed: FeedScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        switch (navigation.state.routeName) {
          case 'Home':
            return (
              <Image
                source={
                  focused
                    ? require(`../../../assets/ic-home-selected-true.png`)
                    : require(`../../../assets/ic-home-selected-false.png`)
                }
                style={{ height: 20, width: 20 }}
              />
            );
          case 'Map':
            return (
              <Image
                source={
                  focused
                    ? require(`../../../assets/ic-map-selected-true.png`)
                    : require(`../../../assets/ic-map-selected-false.png`)
                }
                style={{ height: 20, width: 20 }}
              />
            );
          case 'Feed':
            return (
              <Image
                source={
                  focused
                    ? require(`../../../assets/ic-feed-selected-true.png`)
                    : require(`../../../assets/ic-feed-selected-false.png`)
                }
                style={{ height: 20, width: 20 }}
              />
            );
        }
      },
    }),
  },
);

export default createAppContainer(TabNavigator);
