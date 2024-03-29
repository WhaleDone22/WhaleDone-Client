import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Share, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Analytics from 'expo-firebase-analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import COLORS from '../../styles/colors';
import { privateAPI } from '../../../infrastructures/api/remote/base';

type GroupCodeShareScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'GroupCodeShare'
>;

function GroupCodeShareScreen({ navigation, route }: GroupCodeShareScreenProp) {
  const [hours, setHours] = useState(48);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [code, setCode] = useState(route.params.code);

  const resetTime = async () => {
    const familyID = await AsyncStorage.getItem('familyID');
    privateAPI
      .post({ url: `api/v1/families/${familyID}/new-code` })
      .then((response) => {
        if (response.code === 'SUCCESS') {
          setCode(response.singleData.invitationCode);
          setHours(48);
          setSeconds(0);
          setMinutes(0);
        }
      });
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(countdown);
          } else {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [hours, minutes, seconds]);

  const onSharePressed = () => {
    try {
      Share.share({
        message: `초대 코드는 ${code}입니다.`,
      });
      Analytics.logEvent('send_invite_code', {
        screen: 'group_code_share',
      });
    } catch (error) {
      // alert(error);
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ButtonBack
        onPress={() => {
          navigation.goBack();
        }}
      />
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
          <View style={styles.resendContainer}>
            <Text style={styles.resendTimerText}>
              {hours}:{minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </Text>
            <View style={styles.resendButton}>
              <Text onPress={resetTime} style={styles.resendButtonText}>
                재발급
              </Text>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.btnShare} onPress={onSharePressed}>
            <Text style={styles.btnShareTxt}>초대 코드 공유하기</Text>
          </TouchableOpacity>
          <Text
            style={styles.shareCompleteTxt}
            onPress={() => {
              navigation.push('Main', { screen: 'Home' });
            }}
          >
            초대 코드 공유 완료
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
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
  },

  shareCompleteTxt: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 20,
    color: COLORS.TEXT_SECONDARY,
  },

  // resend
  resendContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  resendTimerText: {
    fontFamily: 'Inter_700Bold',
    color: COLORS.TEXT_SECONDARY,
    marginRight: 5,
  },
  resendButton: {
    borderBottomColor: COLORS.TEXT_SECONDARY,
    borderBottomWidth: 1,
    paddingBottom: 2,
  },
  resendButtonText: {
    color: COLORS.TEXT_SECONDARY,
  },
});

export default GroupCodeShareScreen;
