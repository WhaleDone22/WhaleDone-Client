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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import { Avatar, Switch } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonBack from '../../components/ButtonBack';
import PhotoSelectorModal from '../../components/PhotoSelectorModal';
import COLORS from '../../styles/colors';
import { commonStyles } from '../../styles/common';
import MyPage from './Mypage';

type EditProfileScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'EditProfile'
>;

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
  saveText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: COLORS.BLUE_500,
  },

  // content
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

  // Photo modal
  icon: {
    width: 26,
    height: 26,
    marginRight: 5,
  },
  iconLabel: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
  },
  iconLabelInactive: {
    color: COLORS.TEXT_DISABLED_GREY,
  },
});

const IcProfileImageEdit = require('../../../assets/ic-profile-image-edit.png');
const ProfileImageDefault = require('../../../assets/profile-image-default.png');
const mypageLine = require('../../../assets/mypage-line.png');

function EditProfileScreen({ navigation, route }: EditProfileScreenProp) {
  const [newChannelName, setNewChannelName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedImagePath, setPickedImagePath] = useState('');

  const [isSetAlarm, setIsSetAlarm] = useState(true);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onChange = (event, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  // const showMode = (currentMode: any) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  const showTimepicker = () => {
    setShow(true);
  };

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
        <Text style={styles.headerTitle}>마이페이지 수정</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyPage', { newChannelName: newChannelName })}
        >
          <Text style={styles.saveText}>저장</Text>
        </TouchableOpacity>
      </View>

      {/* content */}
      {/* Profile Wrapper */}
      <View style={styles.profileWrapper}>
        <TouchableOpacity onPress={() => openModal()}>
          <Avatar size={60} source={ProfileImageDefault}>
            <Avatar.Accessory size={20} source={IcProfileImageEdit} />
          </Avatar>
        </TouchableOpacity>
        <Text style={styles.userName}>user1 님</Text>
      </View>

      {/* 각각 설정 항목 */}
      <View style={styles.settingsWrapper}>
        {/* 국가 */}
        <View style={styles.eachSettings}>
          <Text style={styles.settingTxt}>국가</Text>
          <Text
            style={styles.settingValueTxt}
            onPress={() => navigation.navigate('PhoneInputFromMypage')}
          >
            +82 010-7979-8282
          </Text>
        </View>
        <Image source={mypageLine} style={styles.lineImage} />

        {/* 가족 채널 */}
        <View style={styles.eachSettings}>
          <Text style={styles.settingTxt}>가족 채널</Text>
          <TextInput
            value={newChannelName}
            style={styles.settingValueTxt}
            placeholder="가족어쩌구"
            onChangeText={setNewChannelName}
          />
        </View>
        <Image source={mypageLine} style={styles.lineImage} />

        {/* 알림 받기 */}
        <View style={[styles.eachSettings, { height: 64 }]}>
          <Text style={styles.settingTxt}>알림 받기</Text>
          <View style={styles.alarmWrapper}>
            <Text
              style={[styles.settingValueTxt, styles.alarmTxt]}
              onPress={showTimepicker}
            >
              {Platform.OS === 'ios' ? date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}) : date.toLocaleTimeString()}
              {/* {date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})} */}
            </Text>
            <Switch
              value={isSetAlarm}
              onValueChange={(value) => setIsSetAlarm(value)}
              style={styles.alarmSwitch}
            />
          </View>
        </View>

        <View>
          {show && (
            <DateTimePicker
              display="spinner"
              value={date}
              mode={mode}
              onChange={onChange}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default EditProfileScreen;
