import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Switch } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import PhotoSelectorModal from '../../components/PhotoSelectorModal';
import COLORS from '../../styles/colors';
import { commonStyles } from '../../styles/common';

type MyPageScreenProp = NativeStackScreenProps<NavigationStackParams, 'MyPage'>;

const ProfileImageDefault = require('../../../assets/profile-image-default.png');
const mypageLine = require('../../../assets/mypage-line.png');
const IcArrowRight = require('../../../assets/ic-arrow-right.png');

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
    marginTop: 180,
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

  withdrawTxt: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 17,
    color: COLORS.TEXT_SECONDARY,
  },
});

function MyPageScreen({ navigation }: MyPageScreenProp) {
  // AsyncStorage.getItem('token')
  const [isEditable, setIsEditable] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [isSetAlarm, setIsSetAlarm] = useState(true);

  const [countryCode, setCountryCode] = useState('KR');
  const [phoneNumber, setPhoneNumber] = useState('01012345656');
  const [familyName, setFamilyName] = useState('');
  const [alarmStatus, setAlarmStatus] = useState(false);
  const [alarmTime, setAlarmTime] = useState('tt');
  const [familyId, setFamilyId] = useState('');

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  // const onMembershipPressed = () => {
  //   console.log('onMembershipPressed');
  // };

  return (
    <SafeAreaView style={commonStyles.container}>
      <PhotoSelectorModal
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        setPickedImagePath={(path: string) => setPickedImagePath(path)}
      />

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
        <Avatar size={60} rounded source={ProfileImageDefault} />
        <Text style={styles.userName}>nickname 님</Text>
      </View>

      {/* 각각 설정 항목 */}
      <View style={styles.settingsWrapper}>
        {/* 국가 */}
        <View style={styles.eachSettings}>
          <Text style={styles.settingTxt}>국가</Text>
          <Text style={styles.settingValueTxt}>+82 010-7979-8282</Text>
        </View>
        <Image source={mypageLine} style={styles.lineImage} />

        {/* 가족 채널 */}
        <View style={styles.eachSettings}>
          <Text style={styles.settingTxt}>가족 채널</Text>
          <TextInput
            editable={false}
            maxLength={15}
            style={styles.settingValueTxt}
          >
            웨일던, 칭찬하는 가족
          </TextInput>
        </View>
        <Image source={mypageLine} style={styles.lineImage} />

        {/* 알림 받기 */}
        <View style={[styles.eachSettings, { height: 64 }]}>
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
        <Image source={mypageLine} style={styles.lineImage} />

        {/* 약관동의/정책 */}
        <View style={styles.eachSettings}>
          <Text style={styles.settingTxt}>약관동의/정책</Text>
        </View>
        <Image source={mypageLine} style={styles.lineImage} />

        {/* 로그아웃 */}
        <View style={styles.eachSettings}>
          <TouchableOpacity>
            <Text style={[styles.settingTxt, styles.logout]}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {/* <TouchableOpacity
          style={styles.membershipBtn}
          // onPress={onMembershipPressed}
        >
          <Text style={styles.membershipTxt}>
            웨일던 프라이빗 지금 시작하세요!
          </Text>
          <Image source={IcArrowRight} style={styles.membershipArrowIcon} />
        </TouchableOpacity> */}
        <Text
          style={styles.withdrawTxt}
          onPress={() => navigation.navigate('Home')}
        >
          탈퇴하기
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default MyPageScreen;
