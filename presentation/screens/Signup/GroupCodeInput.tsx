import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Analytics from 'expo-firebase-analytics';
import { privateAPI } from '../../../infrastructures/api/remote/base';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import COLORS from '../../styles/colors';

type GroupCodeInputScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'GroupCodeInput'
> & { setJoinFamily: () => void };

function GroupCodeInputScreen({
  navigation,
  setJoinFamily,
}: GroupCodeInputScreenProp) {
  const inputRef1 = useRef<TextInput | null>(null);
  const inputRef2 = useRef<TextInput | null>(null);
  const inputRef3 = useRef<TextInput | null>(null);
  const inputRef4 = useRef<TextInput | null>(null);
  const inputRef5 = useRef<TextInput | null>(null);
  const inputRef6 = useRef<TextInput | null>(null);
  const [filledTexts, setFilledTexts] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [isFilled, setIsFilled] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    if (filledTexts.filter((text) => text === '').length === 0) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [filledTexts]);

  const insertText = (text: string, index: number) => {
    setFilledTexts((prev) => {
      const newFilledTexts = [...prev];
      newFilledTexts[index] = text;
      return newFilledTexts;
    });
  };

  const onCreateCodePressed = () => {
    privateAPI.post({ url: 'api/v1/family' }).then((response) => {
      Analytics.logEvent('create_group_code', {
        screen: 'group_code_input',
      });
      if (response.code === 'SUCCESS') {
        privateAPI
          .get({ url: 'api/v1/users/auth' })
          .then((userResponse) =>
            AsyncStorage.setItem(
              'familyID',
              userResponse.singleData.familyId.toString(),
            ),
          );
        setJoinFamily();
        navigation.navigate('GroupCodeShare', {
          code: response.singleData.invitationCode,
        });
      }
    });
  };

  const onEnterFamilyPressed = () => {
    Analytics.logEvent('input_group_code', {
      screen: 'group_code_input',
    });
    privateAPI
      .patch({
        url: 'api/v1/family/validation/invitationCode',
        data: { invitationCode: filledTexts.join('').toUpperCase() },
      })
      .then((response) => {
        if (response.code === 'SUCCESS') {
          AsyncStorage.setItem(
            'familyID',
            response.singleData.familyId.toString(),
          );
          setJoinFamily();
          navigation.push('Main', { screen: 'Home' });
          Analytics.logEvent('input_group_code', {
            screen: 'group_code_input',
            label: 'success',
          });
        } else {
          Analytics.logEvent('input_group_code', {
            screen: 'group_code_input',
            label: 'not_success',
          });
        }
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>웨일던에 입장해 볼까요?</Text>
          <Text style={styles.title}>초대 코드를 입력하세요</Text>
        </View>

        <View style={styles.contentsContainer}>
          <View
            style={
              isFilled ? styles.inactivatedCodeContainer : styles.codeContainer
            }
          >
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                maxLength={1}
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
                  else inputRef6.current?.focus();
                }}
              />
              <TextInput
                style={styles.textInput}
                maxLength={1}
                ref={inputRef6}
                onChangeText={(text) => {
                  insertText(text, 5);
                  if (text === '') inputRef5.current?.focus();
                  else inputRef6.current?.blur();
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={
              isFilled
                ? styles.inactivatedEntranceBtnWrapper
                : styles.entranceBtnWrapper
            }
            onPress={onEnterFamilyPressed}
          >
            <Text style={styles.entranceBtnText}>입장하기</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.createTxt}>아직 초대 코드가 없으신가요?</Text>
            {!isCreated ? (
              <TouchableOpacity
                style={
                  !isFilled
                    ? styles.createCodeBtn
                    : styles.inactivatedCreateCodeBtn
                }
                onPress={onCreateCodePressed}
              >
                <Text style={styles.createCodeBtnTxt}>
                  새로운 초대 코드 만들기
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.createCodeBtn}
                onPress={onCreateCodePressed}
              >
                <Text style={styles.createCodeBtnTxt}>초대 코드 공유하기</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 34,
  },
  titleWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  contentsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  textInput: {
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    width: '14%',
    height: 50,
    textAlign: 'center',
    marginHorizontal: 2,
  },
  textInputWrapper: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  inactivatedCodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLUE_500,
    paddingVertical: 35,
    borderRadius: 10,
  },
  codeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.TEXT_DISABLED_GREY,
    paddingVertical: 35,
    borderRadius: 10,
  },

  //
  inactivatedEntranceBtnWrapper: {
    borderRadius: 5,
    paddingVertical: 17,
    backgroundColor: COLORS.BLUE_500,
    marginBottom: 280,
    marginTop: 30,
  },
  entranceBtnWrapper: {
    borderRadius: 5,
    paddingVertical: 17,
    backgroundColor: COLORS.TEXT_DISABLED_GREY,
    marginBottom: 280,
    marginTop: 30,
  },
  entranceBtnText: {
    color: '#fff',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    textAlign: 'center',
  },

  //
  inactive: {
    backgroundColor: COLORS.TEXT_DISABLED_GREY,
    color: 'white',
  },

  inactivatedCreateCodeBtn: {
    textAlign: 'center',
    backgroundColor: COLORS.TEXT_DISABLED_GREY,
    paddingVertical: 17,
    color: 'white',
    borderRadius: 5,
    marginBottom: 60,
  },
  createCodeBtn: {
    textAlign: 'center',
    backgroundColor: COLORS.BLUE_500,
    paddingVertical: 17,
    color: 'white',
    borderRadius: 5,
    marginBottom: 60,
  },
  createCodeBtnTxt: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    fontWeight: '600',
  },

  createTxt: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 10,
  },
});

export default GroupCodeInputScreen;
