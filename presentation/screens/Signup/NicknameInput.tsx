import React, { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Analytics from 'expo-firebase-analytics';
import Toast from 'react-native-easy-toast';
import ButtonBack from '../../components/ButtonBack';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import COLORS from '../../styles/colors';
import { validateNickName } from '../../../infrastructures/utils/strings';
import ButtonNext from '../../components/ButtonNext';
import { commonStyles } from '../../styles/common';
import { publicAPI } from '../../../infrastructures/api/remote/base';

type NicknameInputScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'NicknameInput'
> & { setLogin: () => void };

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
    color: COLORS.THEME_PRIMARY,
    fontFamily: 'Pretendard',
    fontSize: 12,
    paddingLeft: 12,
  },
});

function NicknameInputScreen({
  navigation,
  route,
  setLogin,
}: NicknameInputScreenProp) {
  const { phoneNumber, countryCode, email, password, alarmStatus } =
    route.params;
  const [nickName, setNickName] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  const toastRef = useRef<Toast>(null);
  useEffect(() => {
    setIsValidate(validateNickName(nickName));
  });
  const postSignUp = () => {
    Analytics.logEvent('send_signup_request', {
      screen: 'nickname_input',
    });
    publicAPI
      .post({
        url: 'api/v1/user/sign-up',
        data: {
          email,
          nickName,
          countryCode,
          password,
          phoneNumber,
          profileImgUrl: 'https://avatars.githubusercontent.com/u/48249505?v=4',
          alarmStatus,
        },
      })
      .then(async (response) => {
        if (response.responseSuccess) {
          if (
            typeof response.code === 'string' &&
            response.code === 'SUCCESS'
          ) {
            Analytics.logEvent('get_signup_response', {
              screen: 'nickname_input',
              label: 'success',
            });
            await AsyncStorage.setItem(
              'token',
              response.singleData.jwtToken.split(' ')[1],
            );
            await AsyncStorage.setItem(
              'userID',
              response.singleData.userId.toString(),
            );
            setLogin();
            navigation.navigate('Greet', { nickname: nickName });
          }
        } else {
          Analytics.logEvent('get_signup_response', {
            screen: 'nickname_input',
            label: 'failure',
          });
          toastRef.current?.show(response.message ?? '다시 시도해주세요');
        }
      });
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <View style={commonStyles.titleWrapper}>
        <Text style={commonStyles.title}>닉네임을 입력하세요</Text>
      </View>
      <TextInput
        value={nickName}
        onChangeText={(text) => text.length < 6 && setNickName(text)}
        style={styles.textInput}
        placeholder="닉네임 (최대 5자)"
        placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
        keyboardType="default"
        autoFocus
      />
      <Text
        style={[
          styles.hintText,
          {
            color: isValidate
              ? COLORS.TEXT_DISABLED_GREY
              : COLORS.THEME_NEGATIVE,
          },
        ]}
      >
        한글/영문/숫자/특수문자(*,._-+!?)까지 입력 가능해요
      </Text>
      <View style={{ marginTop: 22 }}>
        <ButtonNext
          onPress={postSignUp}
          isActivated={isValidate && nickName.length < 6}
        />
      </View>
      <Toast
        ref={toastRef}
        position="bottom"
        fadeInDuration={200}
        fadeOutDuration={1000}
      />
    </SafeAreaView>
  );
}

export default NicknameInputScreen;
