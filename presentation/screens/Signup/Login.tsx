import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { publicAPI } from '../../../infrastructures/api/remote/base';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import ButtonNext from '../../components/ButtonNext';
import COLORS from '../../styles/colors';

const icPasswordVisibleTrue = require('../../../assets/ic-password-visible-true.png');
const icPasswordVisibleFalse = require('../../../assets/ic-password-visible-false.png');

type LoginScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'Login'
> & { setLogin: (hasFamily: boolean) => void };

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
});

function LoginScreen({ navigation, setLogin }: LoginScreenProp) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const handleLogin = async () => {
    publicAPI
      .post({ url: 'api/v1/user/sign-in', data: { email, password } })
      .then(async (response) => {
        if (response.responseSuccess) {
          if (typeof response.singleData.jwtToken === 'string') {
            await AsyncStorage.setItem(
              'token',
              response.singleData.jwtToken.split(' ')[1],
            );
            await AsyncStorage.setItem(
              'userID',
              response.singleData.userId.toString(),
            );
            if (typeof response.singleData.familyId === 'number') {
              if (parseFloat(response.singleData.familyId) !== -1) {
                await AsyncStorage.setItem(
                  'familyID',
                  response.singleData.familyId.toString(),
                );
                setLogin(true);
                navigation.push('Main', { screen: 'Home' });
              } else {
                setLogin(false);
                navigation.push('Greet', {
                  nickname: response.singleData.nickName,
                });
              }
            }
          } else {
            // 에러 띄우기
          }
        } else {
          // 여기서 에러 띄우기
        }
      })
      .catch((/* error */) => {
        // 여기서도 에러 띄우기
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text style={styles.title}>이메일과 비밀번호를 입력하세요</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
        placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
        placeholder="이메일을 입력하세요"
        keyboardType="email-address"
        autoFocus
      />
      <View style={{ marginBottom: 48 }}>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.textInput}
          placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry={isPasswordVisible}
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
      <ButtonNext
        onPress={handleLogin}
        isActivated={email !== '' && password !== ''}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 17,
        }}
      >
        <Text
          style={{
            fontFamily: 'Pretendard',
            fontSize: 14,
            color: COLORS.TEXT_SECONDARY,
            marginRight: 8,
          }}
        >
          비밀번호를 잊으셨나요?
        </Text>
        <TouchableOpacity
          style={{
            borderBottomColor: COLORS.BLUE_500,
            borderBottomWidth: 2,
            paddingBottom: 2,
          }}
          onPress={() => navigation.navigate('PasswordFind')}
        >
          <Text
            style={{
              fontFamily: 'Pretendard-Bold',
              fontSize: 14,
              color: COLORS.BLUE_500,
            }}
          >
            비밀번호 찾기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
