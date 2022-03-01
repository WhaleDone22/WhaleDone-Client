import React, { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBack from '../../components/ButtonBack';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import COLORS from '../../styles/colors';
import ButtonNext from '../../components/ButtonNext';
import { commonStyles } from '../../styles/common';

type PhoneAuthScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'PhoneAuth'
>;

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 5,
    backgroundColor: COLORS.GREY_030,
    fontSize: 16,
    height: 54,
    width: '16%',
    textAlign: 'center',
  },
  hintText: {
    color: COLORS.THEME_PRIMARY,
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
    color: COLORS.TEXT_SECONDARY,
    borderBottomColor: COLORS.TEXT_SECONDARY,
    borderBottomWidth: 1,
  },
});

function PhoneAuthScreen({ navigation }: PhoneAuthScreenProp) {
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
  const [isValidate, setIsValidate] = useState(false);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const resetTime = () => {
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

  useEffect(() => {
    const answerText = 'ABCDE';
    setIsValidate(answerText === filledTexts.join(''));
  }, [filledTexts]);

  const insertText = (text: string, index: number) => {
    setFilledTexts((prev) => {
      const newFilledTexts = [...prev];
      newFilledTexts[index] = text;
      return newFilledTexts;
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
            if (text === '') inputRef1.current?.blur();
            else inputRef2.current?.focus();
          }}
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
        />
        <TextInput
          style={styles.textInput}
          maxLength={1}
          ref={inputRef5}
          onChangeText={(text) => {
            insertText(text, 4);
            if (text === '') inputRef4.current?.focus();
            else inputRef5.current?.blur();
          }}
        />
      </View>
      <Text style={styles.hintText}>
        전송된 인증번호는 3분 안에 인증이 만료됩니다.
      </Text>
      <View style={{ marginTop: 22 }}>
        <ButtonNext
          onPress={() => navigation.navigate('EmailInput')}
          isActivated={isValidate}
        />
      </View>
      <View style={styles.resendContainer}>
        <Text style={styles.resendTimerText}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </Text>
        <Text onPress={resetTime} style={styles.resendButton}>
          재전송
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default PhoneAuthScreen;
