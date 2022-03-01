import React, { useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonBack from '../../components/ButtonBack';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import COLORS from '../../styles/colors';
import ButtonNext from '../../components/ButtonNext';

type PhoneAuthScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'PhoneAuth'
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
  },
  titleWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
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
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 17,
  },
});
function PhoneAuthScreen({ navigation }: PhoneAuthScreenProp) {
  const inputRef1 = useRef<TextInput | null>(null);
  const inputRef2 = useRef<TextInput | null>(null);
  const inputRef3 = useRef<TextInput | null>(null);
  const inputRef4 = useRef<TextInput | null>(null);
  const inputRef5 = useRef<TextInput | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>인증 번호를 입력하세요</Text>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
          style={styles.textInput}
          maxLength={1}
          autoFocus
          ref={inputRef1}
          onChangeText={(text) => {
            if (text === '') inputRef1.current?.blur();
            else inputRef2.current?.focus();
          }}
        />
        <TextInput
          style={styles.textInput}
          maxLength={1}
          ref={inputRef2}
          onChangeText={(text) => {
            if (text === '') inputRef1.current?.focus();
            else inputRef3.current?.focus();
          }}
        />
        <TextInput
          style={styles.textInput}
          maxLength={1}
          ref={inputRef3}
          onChangeText={(text) => {
            if (text === '') inputRef2.current?.focus();
            else inputRef4.current?.focus();
          }}
        />
        <TextInput
          style={styles.textInput}
          maxLength={1}
          ref={inputRef4}
          onChangeText={(text) => {
            if (text === '') inputRef3.current?.focus();
            else inputRef5.current?.focus();
          }}
        />
        <TextInput
          style={styles.textInput}
          maxLength={1}
          ref={inputRef5}
          onChangeText={(text) => {
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
          isActivated
        />
      </View>
      <View style={styles.resendContainer}>
        <Text>{}</Text>
        <Text>재전송</Text>
      </View>
    </SafeAreaView>
  );
}

export default PhoneAuthScreen;
