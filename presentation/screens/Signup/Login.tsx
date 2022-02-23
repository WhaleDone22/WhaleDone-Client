import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationActions, StackActions } from 'react-navigation';
import ButtonBack from '../../components/ButtonBack';

type LoginScreenProp = NativeStackScreenProps<NavigationStackParams, 'Login'>;

function LoginScreen({ navigation }: LoginScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>Login</Text>
      <Button
        title="로그인"
        onPress={() =>
          navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Main' })],
            }),
          )
        }
      />
    </SafeAreaView>
  );
}

export default LoginScreen;
