import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBack from '../../components/ButtonBack';

type MyPageScreenProp = NativeStackScreenProps<NavigationStackParams, 'MyPage'>;

function MyPageScreen({ navigation }: MyPageScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>MyPage</Text>
      <Text onPress={() => navigation.navigate('EditProfile')}>
        프로필 수정
      </Text>
    </SafeAreaView>
  );
}

export default MyPageScreen;
