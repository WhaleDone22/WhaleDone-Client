import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import COLORS from '../../styles/colors';
import GP from './GroupCodeShare';

type GroupCodeInputScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'GroupCodeInput'
>;

function GroupCodeInputScreen({ navigation }: GroupCodeInputScreenProp) {
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
  const [isBtnActivated, setIsBtnActivated] = useState(true);
  const [isFilled, setIsFilled] = useState(false)
  const [groupCode, setGroupCode] = useState<string[]>([]);

  useEffect(()=> {
    if(filledTexts.filter(text=>text==='').length === 0){
      setIsFilled(true)
    }else {
      setIsFilled(false)
    }
  },[filledTexts])

  const insertText = (text: string, index: number) => {
    setFilledTexts((prev) => {
      const newFilledTexts = [...prev];
      newFilledTexts[index] = text;
      return newFilledTexts;
    });
  };

  //코드 생성
  const createCode = () => {
    const rawCode = Math.random().toString(36).substr(2, 6);
    const code: string[] = [];
    for (var i = 0; i < rawCode.length; i++) {
      code[i] = rawCode.charAt(i);
    }
    return code;
  };

  const onCreateCodePressed = () => {
    const code: any = createCode();
    setGroupCode(code);
    setIsBtnActivated(false);
    setIsFilled(true);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>웨일던에 입장해 볼까요?</Text>
          <Text style={styles.title}>초대 코드를 입력하세요</Text>
        </View>

        <View >
          <View
            style={
              isFilled
                ? styles.inactivatedCodeContainer
                : styles.codeContainer
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
                value={groupCode && groupCode[0]}
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
                value={groupCode && groupCode[1]}
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
                value={groupCode && groupCode[2]}
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
                value={groupCode && groupCode[3]}
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
                value={groupCode && groupCode[4]}
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
                value={groupCode && groupCode[5]}
              />
            </View>
          </View>
          

          <TouchableOpacity
            style={
              isFilled
                ? styles.inactivatedEntranceBtnWrapper
                : styles.entranceBtnWrapper
            }
            onPress={() =>
              navigation.navigate('GroupCodeShare', {
                code: groupCode.join(''),
              })
            }
          >
            <Text style={styles.entranceBtnText}>입장하기</Text>
          </TouchableOpacity>
          
        </View>

        <View>
          <Text style={styles.createTxt}>아직 초대 코드가 없으신가요?</Text>
          <TouchableOpacity
            style={
              !isFilled
                ? styles.createCodeBtn
                : styles.inactivatedCreateCodeBtn
            }
            onPress={onCreateCodePressed}
          >
            <Text style={styles.createCodeBtnTxt}>
              {' '}
              새로운 초대 코드 만들기
            </Text>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    
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
    // flex: 1,

  },

  //
  inactivatedEntranceBtnWrapper: {
    borderRadius: 5,
    paddingVertical: 17,
    backgroundColor: COLORS.BLUE_500,
    marginBottom: 300,
    marginTop: 30,
  },
  entranceBtnWrapper: {
    borderRadius: 5,
    paddingVertical: 17,
    backgroundColor: COLORS.TEXT_DISABLED_GREY,
    marginBottom: 300,
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
    bottom: 16,
  },
  createCodeBtn: {
    textAlign: 'center',
    backgroundColor: COLORS.BLUE_500,
    paddingVertical: 17,
    color: 'white',
    borderRadius: 5,
    marginBottom: 60,
    bottom: 16,
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
    paddingVertical: 20,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 10,
    bottom: 5,
  },
});

export default GroupCodeInputScreen;
