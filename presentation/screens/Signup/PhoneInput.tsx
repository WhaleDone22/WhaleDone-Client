import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBack from '../../components/ButtonBack';

type PhoneInputScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'PhoneInput'
>;

function PhoneInputScreen({ navigation }: PhoneInputScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>PhoneInput</Text>
      <Button title="다음" onPress={() => navigation.navigate('PhoneAuth')} />
    </SafeAreaView>
  );
}

export default PhoneInputScreen;
