import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import { privateAPI } from '../../../infrastructures/api/remote/base';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import { validatePassword } from '../../../infrastructures/utils/strings';
import ButtonBack from '../../components/ButtonBack';
import ButtonNext from '../../components/ButtonNext';
import COLORS from '../../styles/colors';

const icPasswordVisibleTrue = require('../../../assets/ic-password-visible-true.png');
const icPasswordVisibleFalse = require('../../../assets/ic-password-visible-false.png');

type PasswordChangeScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'PasswordChange'
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
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  eyeIcon: {
    height: 24,
    width: 24,
  },
  hintText: {
    color: COLORS.TEXT_SECONDARY,
    fontFamily: 'Pretendard',
    fontSize: 12,
    paddingLeft: 12,
    marginBottom: 22,
  },
  errorText: {
    color: COLORS.THEME_NEGATIVE,
    fontFamily: 'Pretendard',
    fontSize: 12,
    paddingLeft: 12,
    marginBottom: 22,
  },
});

function PasswordChangeScreen({ navigation }: PasswordChangeScreenProp) {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isPasswordValidate, setIsPasswordValidate] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const [isPassword1Visible, setIsPassword1Visible] = useState(false);
  const [isPassword2Visible, setIsPassword2Visible] = useState(false);
  const toastRef = useRef<Toast>(null);
  const postChangePassword = async () => {
    privateAPI
      .post({
        url: 'api/v1/user/reset-password',
        data: { password: password1 },
      })
      .then((response) => {
        if (response.code === 'SUCCESS') {
          toastRef.current?.show('비밀번호 변경에 성공했습니다.');
          setTimeout(() => {
            navigation.navigate('Home');
          }, 3000);
        } else {
          toastRef.current?.show(response.message ?? '다시 시도해주세요');
        }
      });
  };

  useEffect(() => {
    setIsPasswordValidate(validatePassword(password1));
  }, [password1]);

  useEffect(() => {
    setIsPasswordSame(password1 === password2 && password1 !== '');
  }, [password2, password1]);

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text style={styles.title}>이메일과 비밀번호를 입력하세요</Text>
      <View style={{ marginBottom: 8 }}>
        <TextInput
          value={password1}
          onChangeText={(text) => setPassword1(text)}
          style={styles.textInput}
          placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
          placeholder="비밀번호 설정 (최소 8자)"
          secureTextEntry={isPassword1Visible}
        />
        <TouchableOpacity
          onPress={() => setIsPassword1Visible((prev) => !prev)}
          style={styles.eyeIconContainer}
        >
          <Image
            source={
              isPassword1Visible
                ? icPasswordVisibleFalse
                : icPasswordVisibleTrue
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 8 }}>
        <TextInput
          value={password2}
          onChangeText={(text) => setPassword2(text)}
          style={styles.textInput}
          placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
          placeholder="비밀번호 다시 입력"
          secureTextEntry={isPassword2Visible}
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
      <ButtonNext
        onPress={postChangePassword}
        isActivated={isPasswordValidate && isPasswordSame}
      />
      <Toast
        ref={toastRef}
        position="bottom"
        fadeInDuration={200}
        fadeOutDuration={1000}
      />
    </SafeAreaView>
  );
}

export default PasswordChangeScreen;
