import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBack from '../../components/ButtonBack';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';

type PasswordInputScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'PasswordInput'
>;

function PasswordInputScreen({ navigation }: PasswordInputScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>PasswordInput</Text>
      <Button
        title="다음"
        onPress={() => navigation.navigate('NicknameInput')}
      />
    </SafeAreaView>
  );
}

export default PasswordInputScreen;
