import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MapScreenProp = NativeStackScreenProps<NavigationStackParams, 'Map'>;

function MapScreen({ navigation }: MapScreenProp) {
  return (
    <SafeAreaView>
      <Text>Map</Text>
      <Text onPress={() => navigation.navigate('MapDetail')}>상세 보기</Text>
    </SafeAreaView>
  );
}

export default MapScreen;
