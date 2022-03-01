import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import ButtonBack from '../../components/ButtonBack';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import COLORS from '../../styles/colors';
import { validateNickName } from '../../../infrastructures/utils/strings';
import ButtonNext from '../../components/ButtonNext';

type NicknameInputScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'NicknameInput'
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

function NicknameInputScreen({ navigation }: NicknameInputScreenProp) {
  const [nickName, setNickName] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  useEffect(() => {
    setIsValidate(validateNickName(nickName));
  });
  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>닉네임을 입력하세요</Text>
      </View>
      <TextInput
        value={nickName}
        onChangeText={(text) => text.length < 6 && setNickName(text)}
        style={styles.textInput}
        placeholder="닉네임(최대 5자)"
        placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
        keyboardType="default"
        autoFocus
      />
      <Text style={styles.hintText}>
        한글/영문/숫자/특수문자(*,._-+!?)까지 입력 가능해요
      </Text>
      <View style={{ marginTop: 22 }}>
        <ButtonNext
          onPress={() => navigation.navigate('Greet')}
          isActivated={isValidate && nickName.length < 6}
        />
      </View>
    </SafeAreaView>
  );
}

export default NicknameInputScreen;
