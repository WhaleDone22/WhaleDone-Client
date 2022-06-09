import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import ButtonNext from '../../components/ButtonNext';
import COLORS from '../../styles/colors';

type PasswordFindScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'PasswordFind'
>;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    marginTop: 20,
    marginBottom: 32,
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 5,
    backgroundColor: COLORS.GREY_030,
    marginBottom: 12,
    fontSize: 16,
    borderColor: 'transparent',
  },
});

function PasswordFindScreen({ navigation }: PasswordFindScreenProp) {
  const [email, setEmail] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text style={styles.title}>가입하신 이메일을 입력하세요</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
        placeholder="이메일을 입력하세요"
        placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
        keyboardType="email-address"
        autoFocus
      />
      <View style={{ marginTop: 22 }}>
        <ButtonNext
          onPress={() => navigation.navigate('PasswordInput', {})}
          isActivated={email !== ''}
        />
      </View>
    </SafeAreaView>
  );
}

export default PasswordFindScreen;
