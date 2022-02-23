import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBack from '../../components/ButtonBack';

type NoticeScreenProp = NativeStackScreenProps<NavigationStackParams, 'Notice'>;

function NoticeScreen({ navigation }: NoticeScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>Notice</Text>
    </SafeAreaView>
  );
}

export default NoticeScreen;
