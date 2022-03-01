import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';

type RecordScreenProp = NativeStackScreenProps<NavigationStackParams, 'Record'>;

function RecordScreen({ navigation }: RecordScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>Record</Text>
      <Text onPress={() => navigation.push('Feed')}>작성 완료</Text>
    </SafeAreaView>
  );
}

export default RecordScreen;
