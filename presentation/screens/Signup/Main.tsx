import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SignUpMainScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'SignUpMain'
>;

function SignUpMainScreen({ navigation }: SignUpMainScreenProp) {
  return (
    <SafeAreaView>
      <Text>SignUpMain</Text>
      <Text onPress={() => navigation.navigate('PhoneInput')}>
        시작하기 버튼
      </Text>
      <Text onPress={() => navigation.navigate('Login')}>
        이미 계정이 있으신가요? 로그인
      </Text>
    </SafeAreaView>
  );
}

export default SignUpMainScreen;
