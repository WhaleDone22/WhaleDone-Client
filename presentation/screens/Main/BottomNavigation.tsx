import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import FeedScreen from './Feed';
import MapScreen from './Map';
import HomeScreen from './Home';
import COLORS from '../../styles/colors';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case 'Home':
              return (
                <Image
                  source={require(`../../../assets/ic-home-selected-${focused.toString()}.png`)}
                  style={{ height: 20, width: 20 }}
                />
              );
            case 'Map':
              return (
                <Image
                  source={require(`../../../assets/ic-map-selected-${focused.toString()}.png`)}
                  style={{ height: 20, width: 20 }}
                />
              );
            case 'Feed':
              return (
                <Image
                  source={require(`../../../assets/ic-feed-selected-${focused.toString()}.png`)}
                  style={{ height: 20, width: 20 }}
                />
              );
          }
        },
        headerShown: false,
        tabBarActiveTintColor: '#000000',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
