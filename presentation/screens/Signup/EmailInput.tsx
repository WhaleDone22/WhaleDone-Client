import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
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
  errorText: {
    color: COLORS.THEME_NEGATIVE,
    fontFamily: 'Pretendard',
    fontSize: 12,
    paddingLeft: 12,
  },
});

function EmailInputScreen({ navigation }: EmailInputScreenProp) {
  const [email, setEmail] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  useEffect(() => {
    setIsValidate(validateEmail(email));
  }, [email]);
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
      {!isValidate && email !== '' && (
        <Text style={styles.errorText}>
          올바른 이메일 형태가 아니에요. 다시 입력하세요
        </Text>
      )}
      <View style={{ marginTop: 22 }}>
        <ButtonNext
          onPress={() => navigation.navigate('PasswordInput')}
          isActivated={isValidate}
        />
      </View>
    </SafeAreaView>
  );
}

export default EmailInputScreen;
