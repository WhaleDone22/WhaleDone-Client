import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState, useRef } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Avatar } from 'react-native-elements';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-easy-toast';
import { useIsFocused } from '@react-navigation/native';
import { privateAPI } from '../../../infrastructures/api/remote/base';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import COLORS from '../../styles/colors';
import { commonStyles } from '../../styles/common';

type MyPageScreenProp =
  | NativeStackScreenProps<NavigationStackParams, 'MyPage'> & {
      resetUserState: () => void;
    };

const mypageLine = require('../../../assets/mypage-line.png');
const icCloseTerms = require('../../../assets/ic-close-terms.png');
const IcArrowRight = require('../../../assets/ic-arrow-right.png');

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    marginStart: 8,
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
  },
  editText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  uploadTextDisabled: {
    color: COLORS.TEXT_DISABLED_GREY,
  },
  uploadTextEnabled: {
    color: COLORS.BLUE_500,
  },
  profileWrapper: {
    flexDirection: 'row',
    paddingVertical: 36,
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  userName: {
    paddingLeft: 16,
    fontFamily: 'Pretendard-Bold',
    fontSize: 22,
  },
  contentsWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  settingsWrapper: {
    paddingHorizontal: 16,
  },
  eachSettings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16, // figma: 20
  },
  settingTxt: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
  },
  settingValueTxt: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
  },
  lineImage: {
    width: 353,
    height: 2,
    marginVertical: 10,
  },
  alarmWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alarmTxt: {
    paddingHorizontal: 12,
  },
  alarmSwitch: {
    paddingHorizontal: 4,
  },
  logout: {
    color: COLORS.THEME_NEGATIVE,
  },

  //
  membershipBtn: {
    backgroundColor: '#446CFF',
    paddingVertical: 18,
    paddingHorizontal: 24,
    color: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  membershipTxt: {
    color: 'white',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  membershipArrowIcon: {
    width: 7,
    height: 14,
  },
  toastPopup: {
    backgroundColor: '#161D24',
    width: windowWidth - 30,
    opacity: 0.6,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  toastTxt: {
    color: 'white',
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
  },
  withdrawTxt: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 17,
    color: COLORS.TEXT_SECONDARY,
  },
});

function MyPageScreen({ navigation, resetUserState }: MyPageScreenProp) {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const [isEditable, setIsEditable] = useState(true);
  const [isSetAlarm, setIsSetAlarm] = useState(true);

  const [nickName, setNickName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [familyName, setFamilyName] = useState('웨일던, 칭찬하는 가족');
  // const [alarmStatus, setAlarmStatus] = useState(false);
  // const [alarmTime, setAlarmTime] = useState('');
  const [termsOpened, setTermsOpened] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const toastRef = useRef<any>(null);

  useEffect(() => {
    privateAPI
      .get({ url: 'api/v1/users/auth' })
      .then((response) => {
        if (response.responseSuccess) {
          setNickName(response.singleData.nickName);
          setCountryCode(response.singleData.countryCode);
          setPhoneNumber(response.singleData.phoneNumber);
          // setAlarmStatus(response.singleData.alarmStatus);
          // setAlarmTime(response.singleData.alarmTime);
          setFamilyName(response.singleData.groupName);
          setProfileImage(response.singleData.profileImgUrl);
        } else {
          // 여기서 에러 띄우기
        }
      })
      .catch((/* error */) => {
        // 여기서도 에러 띄우기
      });
  }, [isFocused]);

  const logOut = () => {
    AsyncStorage.clear();
    resetUserState();
    navigation.navigate('SignUpMain');
  };

  const withdrawal = () => {
    Alert.alert('경고', '회원 정보가 삭제됩니다. 탈퇴하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '탈퇴하기',
        onPress: () => {
          privateAPI
            .patch({ url: 'api/v1/users/auth/status' })
            .then((response) => {
              if (response.code === 'SUCCESS') {
                AsyncStorage.clear();
                resetUserState();
                navigation.navigate('SignUpMain');
              }
            });
        },
      },
    ]);
  };

  const onMembershipPressed = () => {
    toastRef.current?.show('멤버십은 아직 준비 중이에요!');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <ButtonBack onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>마이페이지</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          disabled={!isEditable}
        >
          <Text
            style={[
              styles.editText,
              isEditable ? styles.uploadTextEnabled : styles.uploadTextDisabled,
            ]}
          >
            수정
          </Text>
        </TouchableOpacity>
      </View>
      {/* Profile Wrapper */}
      <View style={styles.profileWrapper}>
        <Avatar
          size={60}
          rounded
          source={{
            uri: profileImage,
          }}
        />
        <Text style={styles.userName}>{nickName} 님</Text>
      </View>

      <View style={styles.contentsWrapper}>
        {/* 각각 설정 항목 */}
        <View style={styles.settingsWrapper}>
          {/* 국가 */}
          <View style={styles.eachSettings}>
            <Text style={styles.settingTxt}>국가</Text>
            <Text style={styles.settingValueTxt}>+82 {phoneNumber}</Text>
          </View>
          <Image source={mypageLine} style={styles.lineImage} />

          {/* 가족 채널 */}
          <View style={styles.eachSettings}>
            <Text style={styles.settingTxt}>가족 채널</Text>
            <TextInput
              value={familyName}
              editable={false}
              maxLength={15}
              style={styles.settingValueTxt}
              placeholder={familyName}
            />
          </View>
          <Image source={mypageLine} style={styles.lineImage} />

          {/* 알림 받기 */}
          {/* <View style={[styles.eachSettings, { height: 64 }]}>
            <Text style={styles.settingTxt}>알림 받기</Text>
            <View style={styles.alarmWrapper}>
              <Text style={[styles.settingValueTxt, styles.alarmTxt]}>
                10:00 PM
              </Text>
              <Switch
                value={isSetAlarm}
                onValueChange={(value) => setIsSetAlarm(value)}
                style={styles.alarmSwitch}
              />
            </View>
          </View>
          <Image source={mypageLine} style={styles.lineImage} /> */}

          {/* 약관동의/정책 */}
          <View style={styles.eachSettings}>
            <Pressable onPress={() => setTermsOpened(true)}>
              <Text style={styles.settingTxt}>약관동의/정책</Text>
            </Pressable>
          </View>
          <Image source={mypageLine} style={styles.lineImage} />
          <View style={styles.eachSettings}>
            <Pressable onPress={() => navigation.navigate('PasswordChange')}>
              <Text style={styles.settingTxt}>비밀번호 변경</Text>
            </Pressable>
          </View>
          <Image source={mypageLine} style={styles.lineImage} />

          {/* 로그아웃 */}
          <View style={styles.eachSettings}>
            <TouchableOpacity onPress={logOut}>
              <Text style={[styles.settingTxt, styles.logout]}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.membershipBtn}
            onPress={onMembershipPressed}
          >
            <Text style={styles.membershipTxt}>
              웨일던 프라이빗 지금 시작하세요!
            </Text>
            <Image source={IcArrowRight} style={styles.membershipArrowIcon} />
          </TouchableOpacity>
          <Text style={styles.withdrawTxt} onPress={withdrawal}>
            탈퇴하기
          </Text>
        </View>
      </View>

      <Toast
        ref={toastRef}
        style={styles.toastPopup}
        position="bottom"
        positionValue={insets.bottom + 168}
        fadeInDuration={200}
        fadeOutDuration={1000}
        textStyle={styles.toastTxt}
      />
      <Modal
        transparent
        visible={termsOpened}
        onRequestClose={() => {
          setTermsOpened(false);
        }}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={() => {
            setTermsOpened(false);
          }}
        >
          <Pressable
            style={{ width: '96%', height: 500, borderRadius: 20 }}
            onPress={() => {}}
          >
            <WebView
              automaticallyAdjustContentInsets={false}
              source={{
                uri: 'https://whaledone.notion.site/a2748049efa04450a091964ea2e5985b',
              }}
              style={{ borderRadius: 12 }}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setTermsOpened(false);
            }}
            style={{ position: 'absolute', bottom: 40 }}
          >
            <Image source={icCloseTerms} style={{ width: 24, height: 24 }} />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

export default MyPageScreen;
