import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';

type GroupCodeShareScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'GroupCodeShare'
>;

function GroupCodeShareScreen({ navigation }: GroupCodeShareScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>GroupCodeShare</Text>
      <Text onPress={() => navigation.push('Main')}>초대 코드 공유 완료</Text>
    </SafeAreaView>
  );
}

export default GroupCodeShareScreen;
