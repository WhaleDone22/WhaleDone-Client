import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { privateAPI } from '../../../infrastructures/api/remote/base';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import COLORS from '../../styles/colors';
import ProgressBar from '../../components/ProgressBar';
import { getDistance } from '../../../infrastructures/utils/distances';
import { getProgressbarWidth } from '../../../infrastructures/utils/progressbar';

type MapDetailScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'MapDetail'
>;

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  topAreaWrapper: {
    backgroundColor: COLORS.BLUE_100,
    height: 274,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
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

  //
  distanceWrapper: {
    flexDirection: 'row',
    paddingTop: 28,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  imgWrapper: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  lineWrapper: {
    width: 126,
    marginHorizontal: 20,
  },
  line: {
    width: 126,
    height: 10,
  },
  distanceValue: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: COLORS.THEME_PRIMARY,
    textAlign: 'center',
    paddingVertical: 4,
  },

  progressBarWrapper: {
    // backgroundColor: 'skyblue',
    alignItems: 'center',
  },

  lockedReportImg: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba( 255, 255, 255, 1.0 )',
  },

  //
  membershipBoxWrapper: {
    alignItems: 'center',
    paddingTop: 70,
  },
  membershipBox: {
    width: 335,
    height: 182,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.BLUE_200,
  },
  lockImgWrapper: {
    alignItems: 'center',
    paddingTop: 30,
  },
  lockImg: {
    width: 44,
    height: 44,
  },
  membershipBoxTxt: {
    textAlign: 'center',
    paddingTop: 24,
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 28,
  },
  //
  membershipBtnWrapper: {
    paddingTop: 220,
    justifyContent: 'flex-end',
    marginBottom: 50,
    marginHorizontal: 16,
  },
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
});

// const defaultProfile = require('../../../assets/image-profile-default.png');
// const ex1Profile = require('../../../assets/image-profile-ex1.png');
// const ex2Profile = require('../../../assets/image-profile-ex2.png');
const distanceLine = require('../../../assets/ic-distance-line2.png');
const lockedReportImage = require('../../../assets/image-report-lock2.png');
const IcArrowRight = require('../../../assets/ic-arrow-right.png');
const IcLock = require('../../../assets/ic-lock.png');

function MapDetailScreen({ navigation, route }: MapDetailScreenProp) {
  const { nickname, profileImgUrl, familyDistance, myDistance } = route.params;
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    privateAPI
      .get({ url: 'api/v1/users/auth' })
      .then((response) => {
        if (response.responseSuccess) {
          setProfileImage(response.singleData.profileImgUrl);
        } else {
          // 여기서 에러 띄우기
        }
      })
      .catch((/* error */) => {
        // 여기서도 에러 띄우기
      });
  }, []);

  const onMembershipPressed = () => {
    console.log('onMembershipPressed');
  };

  return (
    <SafeAreaView style={[styles.safeAreaContainer]} edges={['bottom']}>
      <View style={styles.topAreaWrapper}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <ButtonBack onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>{nickname}님과의 4월 마음거리</Text>
        </View>

        {/* 마음거리 */}
        <View style={styles.distanceWrapper}>
          {/* 내 프로필이미지 */}
          <Image source={{ uri: profileImage }} style={styles.imgWrapper} />

          {/* line */}
          <View style={styles.lineWrapper}>
            <Text style={styles.distanceValue}>
              {familyDistance + myDistance}km
            </Text>
            <Image source={distanceLine} style={styles.line} />
          </View>

          {/* 내가 선택한 가족 프로필이미지 */}
          <Image source={{ uri: profileImgUrl }} style={styles.imgWrapper} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarWrapper}>
          <ProgressBar
            navigation="???"
            distance1={familyDistance}
            distance2={myDistance}
            height={20}
            completedColor1={COLORS.BLUE_300}
            completedColor2={COLORS.BLUE_500}
          />
        </View>
      </View>

      <ImageBackground
        source={lockedReportImage}
        resizeMode="cover"
        style={styles.lockedReportImg}
      >
        <View style={styles.membershipBoxWrapper}>
          <View style={styles.membershipBox}>
            <View style={styles.lockImgWrapper}>
              <Image source={IcLock} style={styles.lockImg} />
            </View>
            <Text style={styles.membershipBoxTxt}>
              웨일던에서 분석한 월간 레포트는{'\n'}웨일던 프라이빗 시작 후
              확인할 수 있어요!
            </Text>
          </View>
        </View>

        <View style={styles.membershipBtnWrapper}>
          <TouchableOpacity
            style={styles.membershipBtn}
            onPress={onMembershipPressed}
          >
            <Text style={styles.membershipTxt}>
              웨일던 프라이빗 지금 시작하세요!
            </Text>
            <Image source={IcArrowRight} style={styles.membershipArrowIcon} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default MapDetailScreen;
