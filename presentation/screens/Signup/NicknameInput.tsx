import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBack from '../../components/ButtonBack';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';

type NicknameInputScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'NicknameInput'
>;

function NicknameInputScreen({ navigation }: NicknameInputScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>NicknameInput</Text>
      <Button title="다음" onPress={() => navigation.navigate('EmailInput')} />
    </SafeAreaView>
  );
}

export default NicknameInputScreen;
