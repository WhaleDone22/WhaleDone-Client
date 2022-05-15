import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import { validateEmail } from '../../../infrastructures/utils/strings';
import ButtonBack from '../../components/ButtonBack';
import ButtonNext from '../../components/ButtonNext';
import COLORS from '../../styles/colors';
import { commonStyles } from '../../styles/common';

type EmailInputScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'EmailInput'
>;

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: COLORS.GREY_030,
    marginVertical: 12,
    fontSize: 16,
    borderColor: 'transparent',
  },
  hintText: {
    color: COLORS.TEXT_SECONDARY,
    fontFamily: 'Pretendard',
    fontSize: 12,
    paddingLeft: 12,
  },
  errorText: {
    color: COLORS.THEME_NEGATIVE,
    fontFamily: 'Pretendard',
    fontSize: 12,
    paddingLeft: 12,
  },
});

function EmailInputScreen({ navigation, route }: EmailInputScreenProp) {
  const { phoneNumber, countryCode, alarmStatus } = route.params;
  const [email, setEmail] = useState('');
  const [isValidate, setIsValidate] = useState(true);
  const handleEmailInput = () => {
    if (validateEmail(email))
      navigation.navigate('PasswordInput', {
        userInformation: { phoneNumber, countryCode, email, alarmStatus },
      });
    else setIsValidate(false);
  };
  return (
    <SafeAreaView style={commonStyles.container}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <View style={commonStyles.titleWrapper}>
        <Text style={commonStyles.title}>이메일을 입력하세요</Text>
      </View>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
        placeholder="이메일을 입력하세요"
        placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
        keyboardType="email-address"
        autoFocus
      />

      {isValidate ? (
        <Text style={styles.hintText}>@.com 형식으로 입력하세요.</Text>
      ) : (
        <Text style={styles.errorText}>올바른 이메일 형태가 아니에요.</Text>
      )}
      <View style={{ marginTop: 22 }}>
        <ButtonNext onPress={handleEmailInput} isActivated={email !== ''} />
      </View>
    </SafeAreaView>
  );
}

export default EmailInputScreen;
