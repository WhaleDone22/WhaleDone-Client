import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState, useRef } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Pages } from 'react-native-pages';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import { commonStyles } from '../../styles/common';

import COLORS from '../../styles/colors';

type HomeScreenProp = NativeStackScreenProps<NavigationStackParams, 'Home'>;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    marginStart: 8,
    marginRight: 190,
    width: 118,
    height: 27,
  },
  headerNotice: {
    width: 24,
    height: 24,
    marginRight: 19,
  },
  headerMyPage: {
    width: 24,
    height: 24,
  },

  title: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 30, // 22
  },
  titleWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  // carousel
  carouselWrapper: {
    // backgroundColor:'yellow',
    flex: 1,
    // width: 200,
    // justifyContent:'center',
  },
  card: {
    backgroundColor: COLORS.BLUE_400,
    borderRadius: 10,
    width: 308,
    height: 413,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 8,
      width: 8,
    },
  },
  item: {
    alignItems: 'center',
  },
  icon: {
    width: 308,
    height: 413,
  },
  questionText: {
    color: '#fff',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    marginBottom: Platform.OS === 'ios' ? 40 : -50,
    textAlign: 'center',
    bottom: 110,
  },
  answerBtn: {
    width: 260,
    height: 45,
    backgroundColor: COLORS.BLUE_500,
    paddingVertical: 12,
    borderRadius: 5,
    bottom: Platform.OS === 'ios' ? 135 : 45, // bug: 안드 깨짐(안보임)
  },
  answerTxt: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    lineHeight: 22,
  },

  //
  subTxt: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.BLUE_300,
    marginBottom: 8,
    top: Platform.OS === 'ios' ? 33 : 0,
  },
  myQBtn: {
    backgroundColor: COLORS.BLUE_100,
    paddingVertical: 17,
    marginBottom: 10,
    borderRadius: 5,
    top: Platform.OS === 'ios' ? 33 : 0,
  },
  myQText: {
    color: COLORS.THEME_PRIMARY,
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    lineHeight: 19,
  },
  temp: {
    backgroundColor: 'red',
  },
});

const Logo = require('../../../assets/logo-whaledone.png');
const IcNotice = require('../../../assets/ic-bell.png');
const IcMyPage = require('../../../assets/ic-user-circle.png');
const IcWork = require('../../../assets/ic-work.png');
const IcRelationship = require('../../../assets/ic-relationship.png');
const IcDaily = require('../../../assets/ic-daily.png');
const IcHealth = require('../../../assets/ic-health.png');
const IcTmi = require('../../../assets/ic-tmi.png');

function HomeScreen({ navigation }: HomeScreenProp) {
  const pageRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [week1, setWeek1] = useState('');
  const [week2, setWeek2] = useState('');

  const weekTxt2 = [
    '가족의 일상은 어떤지 확인해 보세요',
    '오늘을 활기차게 기록해 보세요',
    '가족과 소통을 주고받아 보세요',
    '가족과 대화로 충전해 보세요',
    '가족에게 안부를 전해 보세요',
    '마음 편히 가족과 연락해 보세요',
    '소중한 시간을 가족과 나눠 보세요',
  ];

  const mainCarouselData = [
    {
      icon: IcWork,
      title: '나의 10년의 플랜을 공유하자면?',
      category: 'work',
      backgroundColor: COLORS.BLUE_400,
    },
    {
      icon: IcRelationship,
      title: '오늘 하루 가장 많은 대화를 나눈 사람은?',
      category: 'relationship',
      backgroundColor: COLORS.BLUE_300,
    },
    {
      icon: IcDaily,
      title: '오늘의 OOTD를 소개하자면?\n(OOTD: 오늘의 패션)',
      category: 'daily',
      backgroundColor: COLORS.BLUE_400,
    },
    {
      icon: IcHealth,
      title: '가족에게 소개하고 싶은 운동 한 가지는?',
      category: 'health',
      backgroundColor: COLORS.BLUE_300,
    },
    {
      icon: IcTmi,
      title: '평생 한 나이로 산다면 몇 살로 살고 싶은지?',
      category: 'tmi',
      backgroundColor: COLORS.BLUE_400,
    },
  ];

  useEffect(() => {
    const now = new Date();
    const weekTxt1 = [
      '한 주의 정리와 시작이 있는 일요일',
      '한 주를 시작하는 월요일',
      '동기부여가 필요한 화요일',
      '설마 했지만 오늘은 수요일',
      '드디어 반이나 온 목요일,',
      '주중의 마지막 금요일',
      '기분 좋은 첫 주말인 토요일',
    ];

    const dayOfWeek1 = weekTxt1[now.getDay()];
    const dayOfWeek2 = weekTxt2[now.getDay()];
    setWeek1(dayOfWeek1);
    setWeek2(dayOfWeek2);
  }, []);

  const changeActiveIndex = () => {
    const currentIndex = pageRef.current?.activeIndex;
    if (currentIndex) setActiveIndex(currentIndex);
  };
  //  edges={['top']}

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.headerContainer}>
        <Image source={Logo} style={styles.headerLogo} />

        <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
          <Image source={IcNotice} style={styles.headerNotice} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
          <Image source={IcMyPage} style={styles.headerMyPage} />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{week1}</Text>
        <Text style={styles.title}>{week2}</Text>
      </View>

      {/* Carousel */}
      <View style={styles.carouselWrapper}>
        <Pages
          indicatorColor={COLORS.THEME_PRIMARY}
          ref={pageRef}
          onScrollEnd={changeActiveIndex}
        >
          {mainCarouselData.map((data) => (
            <View style={[styles.item, styles.card]} key={data.category}>
              <Image source={data.icon} style={styles.icon} />
              <Text style={styles.questionText}>{data.title}</Text>
              <TouchableOpacity
                style={styles.answerBtn}
                onPress={() => navigation.navigate('Record')}
              >
                <Text style={styles.answerTxt}>답변하기</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Pages>
      </View>

      {/* Button */}
      <Text style={styles.subTxt}>잠깐, 답변할 질문이 없으신가요?</Text>
      <View>
        <TouchableOpacity
          style={styles.myQBtn}
          onPress={() => navigation.navigate('Record')}
        >
          <Text style={styles.myQText}>내 질문으로 작성하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
