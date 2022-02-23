import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBack from '../../components/ButtonBack';

type EmailInputScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'EmailInput'
>;

function EmailInputScreen({ navigation }: EmailInputScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>EmailInput</Text>
      <Button
        title="다음"
        onPress={() => navigation.navigate('PasswordInput')}
      />
    </SafeAreaView>
  );
}

export default EmailInputScreen;
