import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import ButtonBack from '../../components/ButtonBack';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import COLORS from '../../styles/colors';
import ButtonNext from '../../components/ButtonNext';
import { validatePassword } from '../../../infrastructures/utils/strings';
import { commonStyles } from '../../styles/common';

const icPasswordVisibleTrue = require('../../../assets/ic-password-visible-true.png');
const icPasswordVisibleFalse = require('../../../assets/ic-password-visible-false.png');

type PasswordInputScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'PasswordInput'
>;

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: COLORS.GREY_030,
    marginBottom: 12,
    fontSize: 16,
    borderColor: 'transparent',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
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
  eyeIcon: {
    height: 24,
    width: 24,
  },
});

function PasswordInputScreen({ navigation, route }: PasswordInputScreenProp) {
  const { phoneNumber, countryCode, email, alarmStatus } = route.params;
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isPasswordValidate, setIsPasswordValidate] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isPassword2Visible, setIsPassword2Visible] = useState(true);

  useEffect(() => {
    setIsPasswordValidate(validatePassword(password));
  }, [password]);

  useEffect(() => {
    setIsPasswordSame(password === password2 && password !== '');
  }, [password2, password]);

  return (
    <SafeAreaView style={commonStyles.container}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <View style={commonStyles.titleWrapper}>
        <Text style={commonStyles.title}>비밀번호 설정하세요</Text>
      </View>
      <View>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.textInput}
          placeholder="비밀번호 설정"
          secureTextEntry={isPasswordVisible}
          placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
          keyboardType="default"
          autoFocus
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible((prev) => !prev)}
          style={styles.eyeIconContainer}
        >
          <Image
            source={
              isPasswordVisible ? icPasswordVisibleFalse : icPasswordVisibleTrue
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          value={password2}
          onChangeText={(text) => setPassword2(text)}
          style={styles.textInput}
          placeholder="비밀번호 다시 입력"
          secureTextEntry={isPassword2Visible}
          placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
          keyboardType="default"
        />
        <TouchableOpacity
          onPress={() => setIsPassword2Visible((prev) => !prev)}
          style={styles.eyeIconContainer}
        >
          <Image
            source={
              isPassword2Visible
                ? icPasswordVisibleFalse
                : icPasswordVisibleTrue
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {isPasswordSame || password2.length === 0 ? (
        <Text style={styles.hintText}>
          영문 대문자/소문자/숫자 3가지를 포함하여 입력하세요.
        </Text>
      ) : (
        <Text style={styles.errorText}>두 비밀번호가 달라요.</Text>
      )}
      <View style={{ marginTop: 22 }}>
        <ButtonNext
          onPress={() =>
            navigation.navigate('NicknameInput', {
              phoneNumber,
              countryCode,
              email,
              password,
              alarmStatus,
            })
          }
          isActivated={isPasswordValidate && isPasswordSame}
        />
      </View>
    </SafeAreaView>
  );
}

export default PasswordInputScreen;
