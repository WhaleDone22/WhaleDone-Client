import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';

type MapDetailScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'MapDetail'
>;

function MapDetailScreen({ navigation }: MapDetailScreenProp) {
  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>MapDetail</Text>
    </SafeAreaView>
  );
}

export default MapDetailScreen;
