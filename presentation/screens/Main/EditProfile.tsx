import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBack from '../../components/ButtonBack';

type EditProfileScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'EditProfile'
>;

function EditProfileScreen({ navigation }: EditProfileScreenProp) {
  return (
    <SafeAreaView>
      <Text>EditProfile</Text>
      <ButtonBack onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

export default EditProfileScreen;
