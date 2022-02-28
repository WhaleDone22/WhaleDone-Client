import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBack from '../../components/ButtonBack';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';

type PhoneAuthScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'PhoneAuth'
>;

function PhoneAuthScreen({ navigation }: PhoneAuthScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>PhoneAuth</Text>
      <Button onPress={() => navigation.navigate('EmailInput')} title="다음" />
    </SafeAreaView>
  );
}

export default PhoneAuthScreen;
