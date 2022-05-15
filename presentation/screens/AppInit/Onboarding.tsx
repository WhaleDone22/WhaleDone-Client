import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pages } from 'react-native-pages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import ButtonNext from '../../components/ButtonNext';
import COLORS from '../../styles/colors';

type OnboardingScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'Onboarding'
> & { setOnboardingSeen: () => void };

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    color: COLORS.TEXT_DISABLED_GREY,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  deActivatedskipButton: {
    color: '#fff',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  item: {
    alignItems: 'center',
  },
  icon: {
    width: 260,
    height: 260,
    marginTop: 52,
    marginBottom: 9,
  },
  titleButton: {
    borderRadius: 10,
    backgroundColor: COLORS.BLUE_200,
    width: 175,
    marginTop: 41,
  },
  titleText: {
    color: COLORS.BLUE_500,
    fontFamily: 'Pretendard-Bold',
    paddingVertical: 12,
    textAlign: 'center',
    fontSize: 18,
  },
  subText: {
    padding: 10,
    marginTop: 19,
    lineHeight: 24,
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },
});

const image1 = require('../../../assets/image-onboarding-1.png');
const image2 = require('../../../assets/image-onboarding-2.png');
const image3 = require('../../../assets/image-onboarding-3.png');

function OnboardingScreen({
  navigation,
  setOnboardingSeen,
}: OnboardingScreenProp) {
  const carouselData = [
    {
      icon: image3,
      title: '일상 공유 주제제시',
      sub: '웨일던 질문에 답하며\n매일 일상을 쉽게 공유하세요!',
    },
    {
      icon: image1,
      title: '소통함',
      sub: '소중한 우리 가족 일상 글에\n생동감있고 간편하게 반응해 보세요!',
    },
    {
      icon: image2,
      title: '마음 거리',
      sub: '가족 간 소통이 모여\n변화되는 마음 거리를 확인하세요!',
    },
  ];

  const pageRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const changeActiveIndex = () => {
    const currentIndex = pageRef.current?.activeIndex;
    if (currentIndex) setActiveIndex(currentIndex);
  };

  const navigatePage = () => {
    AsyncStorage.setItem('isOnboardingUnseen', 'false');
    setOnboardingSeen();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={navigatePage} />
        {activeIndex !== 2 ? (
          <Text onPress={navigatePage} style={styles.skipButton}>
            건너뛰기
          </Text>
        ) : (
          <Text onPress={navigatePage} style={styles.deActivatedskipButton}>
            건너뛰기
          </Text>
        )}
      </View>
      <Pages
        indicatorColor={COLORS.BLUE_500}
        ref={pageRef}
        onScrollEnd={changeActiveIndex}
      >
        {carouselData.map((data) => (
          <View style={styles.item} key={data.title}>
            <Image source={data.icon} style={styles.icon} />
            <View style={styles.titleButton}>
              <Text style={styles.titleText}>{data.title}</Text>
            </View>
            <Text style={styles.subText}>{data.sub}</Text>
          </View>
        ))}
      </Pages>

      <View style={{ marginBottom: 46, marginTop: 76, marginHorizontal: 16 }}>
        {activeIndex === 2 ? (
          <ButtonNext isActivated onPress={navigatePage} />
        ) : (
          <View style={{ height: 54 }} />
        )}
      </View>
    </SafeAreaView>
  );
}

export default OnboardingScreen;
