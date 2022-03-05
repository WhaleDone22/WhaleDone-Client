import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pages } from 'react-native-pages';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import ButtonNext from '../../components/ButtonNext';
import COLORS from '../../styles/colors';
import { commonStyles } from '../../styles/common';

type OnboardingScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'Onboarding'
>;

const styles = StyleSheet.create({
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
  item: {
    alignItems: 'center',
  },
  icon: {
    width: 260,
    height: 260,
    marginTop: 52,
  },
  titleText: {
    borderRadius: 10,
    backgroundColor: COLORS.BLUE_200,
    color: COLORS.BLUE_500,
    fontFamily: 'Pretendard-Bold',
    paddingVertical: 12,
    width: 145,
    textAlign: 'center',
  },
  subText: {
    padding: 10,
    marginTop: 11,
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

function OnboardingScreen({ navigation }: OnboardingScreenProp) {
  const carouselData = [
    {
      icon: image1,
      title: '일상 공유 주제제시',
      sub: '웨일던 질문에 답하며\n매일 일상을 쉽게 공유하세요!',
    },
    {
      icon: image2,
      title: '소통함',
      sub: '소중한 우리 가족 일상 글에\n생동감있고 간편하게 반응해 보세요!',
    },
    {
      icon: image3,
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

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <ButtonBack onPress={() => navigation.navigate('SignUpMain')} />
        <Text
          onPress={() => navigation.navigate('SignUpMain')}
          style={styles.skipButton}
        >
          건너뛰기
        </Text>
      </View>
      <Pages
        indicatorColor={COLORS.BLUE_500}
        ref={pageRef}
        onScrollEnd={changeActiveIndex}
      >
        {carouselData.map((data) => (
          <View style={styles.item} key={data.title}>
            <Image source={data.icon} style={styles.icon} />
            <Text style={styles.titleText}>{data.title}</Text>
            <Text style={styles.subText}>{data.sub}</Text>
          </View>
        ))}
      </Pages>

      <View style={{ marginBottom: 46, marginTop: 76 }}>
        {activeIndex === 2 ? (
          <ButtonNext
            isActivated
            onPress={() => navigation.navigate('SignUpMain')}
          />
        ) : (
          <View style={{ height: 54 }} />
        )}
      </View>
    </SafeAreaView>
  );
}

export default OnboardingScreen;
