import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';

type GreetScreenProp = NativeStackScreenProps<NavigationStackParams, 'Greet'>;

function GreetScreen({ navigation }: GreetScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>Greet</Text>
      <Button
        title="다음"
        onPress={() => navigation.navigate('GroupCodeInput')}
      />
    </SafeAreaView>
  );
}

export default GreetScreen;
