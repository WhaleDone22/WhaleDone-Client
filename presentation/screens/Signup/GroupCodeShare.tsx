import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, StyleSheet, Share, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationActions, StackActions } from 'react-navigation';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import COLORS from '../../styles/colors';
// import groupCode from './GroupCodeInput'

type GroupCodeShareScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'GroupCodeShare'
>;

interface Codeprops {
  code: String[];
}


function GroupCodeShareScreen({ navigation }: GroupCodeShareScreenProp) {
  const code = '000ABC';
  const onSharePressed = () => {
    try {
      Share.share({
        message: `초대 코드는 ${code}입니다.`,
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <ButtonBack onPress={()=> { navigation.goBack(); console.log("Aa");}} />
        <View style={styles.container}>
          <View>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>초대 코드를</Text>
              <Text style={styles.title}>가족과 공유해볼까요?</Text>
            </View>
            <View style={styles.codeContainer}>
              <Text style={styles.textCode}>{code}</Text>
              <Text style={styles.textCodeDescription}>
                초대 코드는 48시간 뒤 사라져요
              </Text>
            </View>
          </View>

          <View>
            <TouchableOpacity style={styles.btnShare} onPress={onSharePressed}>
              <Text style={styles.btnShareTxt}>초대 코드 공유하기</Text>
            </TouchableOpacity>
            <Text style={styles.shareCompleteTxt} onPress={() => navigation.navigate('Home')}>초대 코드 공유 완료</Text>
          </View>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
  codeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#446CFF',
    paddingVertical: 28,
    borderRadius: 10,
  },
  textCode: {
    color: 'white',
    fontWeight: '600',
    fontSize: 32,
    letterSpacing: 9,
  },
  textCodeDescription: {
    color: 'white',
    fontSize: 14,
    marginTop: 12,
  },
  // shareContainer: { 
  //   backgroundColor: 'red',
  // },
  btnShare: {
    textAlign: 'center',
    backgroundColor: '#446CFF',
    paddingVertical: 17,
    color: 'white',
    borderRadius: 5,
  },
  btnShareTxt: { 
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    fontWeight: '600',
    // backgroundColor: 'red',
  },
  
  shareCompleteTxt: { 
    fontFamily: 'Pretendard',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 20,
    color: COLORS.TEXT_SECONDARY,
  }
});

export default GroupCodeShareScreen;
