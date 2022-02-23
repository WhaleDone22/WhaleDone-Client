import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';

type GroupCodeCreateScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'GroupCodeCreate'
>;

function GroupCodeCreateScreen({ navigation }: GroupCodeCreateScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>GroupCodeCreate</Text>
      <Button
        title="초대 코드 공유하기"
        onPress={() => navigation.navigate('GroupCodeShare')}
      />
    </SafeAreaView>
  );
}

export default GroupCodeCreateScreen;
