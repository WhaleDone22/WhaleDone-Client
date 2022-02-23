import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenProp = NativeStackScreenProps<NavigationStackParams, 'Home'>;

function HomeScreen({ navigation }: HomeScreenProp) {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Text onPress={() => navigation.navigate('Notice')}>알림</Text>
      <Text onPress={() => navigation.navigate('Record')}>일상 공유</Text>
      <Text onPress={() => navigation.navigate('MyPage')}>마이페이지</Text>
    </SafeAreaView>
  );
}

export default HomeScreen;
