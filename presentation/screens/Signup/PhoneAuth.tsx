import React, { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Analytics from 'expo-firebase-analytics';
import ButtonBack from '../../components/ButtonBack';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import COLORS from '../../styles/colors';
import ButtonNext from '../../components/ButtonNext';
import { commonStyles } from '../../styles/common';
import { publicAPI } from '../../../infrastructures/api/remote/base';
import { Country } from '../../../infrastructures/types/country';

const countryCodeWithTelNumber: Country[] = require('../../../infrastructures/data/countryCodeWithTelNumber.json');

type PhoneAuthScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'PhoneAuth'
>;

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 5,
    backgroundColor: COLORS.GREY_030,
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    height: 54,
    width: '16%',
    textAlign: 'center',
  },
  hintText: {
    color: COLORS.TEXT_SECONDARY,
    fontFamily: 'Pretendard',
    fontSize: 12,
    paddingLeft: 12,
  },
  textInputWrapper: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 17,
  },
  resendTimerText: {
    fontFamily: 'Inter_700Bold',
    color: COLORS.TEXT_SECONDARY,
    marginRight: 5,
  },
  resendButton: {
    borderBottomColor: COLORS.TEXT_SECONDARY,
    borderBottomWidth: 1,
  },
  resendButtonText: {
    color: COLORS.TEXT_SECONDARY,
    paddingBottom: 2,
  },
});

function PhoneAuthScreen({ navigation, route }: PhoneAuthScreenProp) {
  const { phoneNumber, countryCode, alarmStatus } = route.params;
  const inputRef1 = useRef<TextInput | null>(null);
  const inputRef2 = useRef<TextInput | null>(null);
  const inputRef3 = useRef<TextInput | null>(null);
  const inputRef4 = useRef<TextInput | null>(null);
  const inputRef5 = useRef<TextInput | null>(null);
  const [filledTexts, setFilledTexts] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
  ]);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const resetTime = () => {
    if (minutes * 60 + seconds < 179) return;
    Analytics.logEvent('reset_phone_info', {
      screen: 'phone_auth',
    });
    publicAPI.post({
      url: 'api/v1/sms/code',
      data: {
        countryCode:
          countryCodeWithTelNumber.find(
            (country: Country) => country.countryCode === countryCode,
          )?.countryPhoneNumber ?? '',
        recipientPhoneNumber: phoneNumber,
        smsType: 'SIGNUP', // 비밀번호 변경 시에는 PW여야 함
      },
    });
    setSeconds(0);
    setMinutes(3);
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const insertText = (text: string, index: number) => {
    setFilledTexts((prev) => {
      const newFilledTexts = [...prev];
      newFilledTexts[index] = text;
      return newFilledTexts;
    });
  };

  const postPhoneAuth = () => {
    Analytics.logEvent('send_phone_auth', {
      screen: 'phone_auth',
    });
    publicAPI
      .post({
        url: 'api/v1/sms/validation/code',
        data: {
          smsCode: filledTexts.join('').toUpperCase(),
          phoneNumber,
        },
      })
      .then((response) => {
        if (typeof response.code === 'string') {
          if (response.code === 'SUCCESS') {
            Analytics.logEvent('get_phone_auth_response', {
              screen: 'phone_auth',
              label: 'success',
            });
            navigation.navigate('EmailInput', {
              phoneNumber,
              countryCode,
              alarmStatus,
            });
          } else {
            Analytics.logEvent('get_phone_auth_response', {
              screen: 'phone_auth',
              label: 'not_success',
            });
          }
        }
      });
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <View style={commonStyles.titleWrapper}>
        <Text style={commonStyles.title}>인증 번호를 입력하세요</Text>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          maxLength={1}
          autoFocus
          ref={inputRef1}
          onChangeText={(text) => {
            insertText(text, 0);
            if (text !== '') inputRef2.current?.focus();
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              inputRef1.current?.focus();
            }
          }}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.textInput}
          maxLength={1}
          ref={inputRef2}
          onChangeText={(text) => {
            insertText(text, 1);
            if (text === '') inputRef1.current?.focus();
            else inputRef3.current?.focus();
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              inputRef1.current?.focus();
            }
          }}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.textInput}
          maxLength={1}
          ref={inputRef3}
          onChangeText={(text) => {
            insertText(text, 2);
            if (text === '') inputRef2.current?.focus();
            else inputRef4.current?.focus();
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              inputRef2.current?.focus();
            }
          }}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.textInput}
          maxLength={1}
          ref={inputRef4}
          onChangeText={(text) => {
            insertText(text, 3);
            if (text === '') inputRef3.current?.focus();
            else inputRef5.current?.focus();
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              inputRef3.current?.focus();
            }
          }}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.textInput}
          maxLength={1}
          ref={inputRef5}
          onChangeText={(text) => {
            insertText(text, 4);
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              inputRef4.current?.focus();
            }
          }}
          keyboardType="number-pad"
        />
      </View>
      <Text style={styles.hintText}>
        전송된 인증번호는 3분 동안만 입력 가능해요.
      </Text>
      <View style={{ marginTop: 22 }}>
        <ButtonNext onPress={postPhoneAuth} isActivated />
      </View>
      <View style={styles.resendContainer}>
        <Text style={styles.resendTimerText}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </Text>
        <View style={styles.resendButton}>
          <Text onPress={resetTime} style={styles.resendButtonText}>
          재전송
        </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PhoneAuthScreen;
