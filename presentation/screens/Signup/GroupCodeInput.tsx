import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationActions, StackActions } from 'react-navigation';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';

type GroupCodeInputScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'GroupCodeInput'
>;

function GroupCodeInputScreen({ navigation }: GroupCodeInputScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>GroupCodeInput</Text>
      <Button
        title="입장하기"
        onPress={() =>
          navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Main' })],
            }),
          )
        }
      />
      <Button
        title="새로운 초대 코드 만들기"
        onPress={() => navigation.navigate('GroupCodeCreate')}
      />
    </SafeAreaView>
  );
}

export default GroupCodeInputScreen;
