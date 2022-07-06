import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ImageBackground,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { privateAPI } from '../../../infrastructures/api/remote/base';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import { commonStyles } from '../../styles/common';
import COLORS from '../../styles/colors';
import Header from '../../components/Header';

interface ImageItemProps {
  icon: any;
  backgroundColor: string;
  width: number;
  height: number;
}

interface ItemProps {
  title: string;
  content: string;
  category: string;
  image: ImageItemProps;
}

interface RenderItemProps {
  // eslint-disable-next-line react/no-unused-prop-types
  item: ItemProps;
}

type HomeScreenProp = NativeStackScreenProps<NavigationStackParams, 'Home'>;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 30, // 22
  },
  titleWrapper: {
    paddingHorizontal: 10,
  },

  // carousel
  carouselWrapper: {
    alignItems: 'center',
    paddingVertical: 15,
    width: 240,
  },
  card: {
    borderRadius: 10,
    height: 413,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 8,
      width: 8,
    },
  },
  questionText: {
    color: '#fff',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 20,
  },
  answerBtn: {
    width: 260,
    height: 45,
    backgroundColor: COLORS.BLUE_500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 25,
    marginHorizontal: 23,
  },
  answerTxt: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
  },
  paginationWrapper: {
    justifyContent: 'center',
  },

  //
  subTxt: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.BLUE_300,
    bottom: Platform.OS === 'ios' ? 0 : 16,
  },
  myQBtn: {
    backgroundColor: COLORS.BLUE_100,
    height: 58,
    justifyContent: 'center',
    borderRadius: 5,
    top: Platform.OS === 'ios' ? 13 : 0,
  },
  myQText: {
    color: COLORS.THEME_PRIMARY,
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
});

const IcWork = require('../../../assets/ic-work.png');
const IcRelationship = require('../../../assets/ic-relationship.png');
const IcDaily = require('../../../assets/ic-daily.png');
const IcHealth = require('../../../assets/ic-health.png');
const IcTmi = require('../../../assets/ic-tmi.png');

const weekTxt2 = [
  '가족의 일상은 어떤지 확인해 보세요',
  '오늘을 활기차게 기록해 보세요',
  '가족과 소통을 주고받아 보세요',
  '가족과 대화로 충전해 보세요',
  '가족에게 안부를 전해 보세요',
  '마음 편히 가족과 연락해 보세요',
  '소중한 시간을 가족과 나눠 보세요',
];

const imageItem: ImageItemProps[] = [
  {
    icon: IcWork,
    backgroundColor: COLORS.BLUE_400,
    width: 308,
    height: 413,
  },
  {
    icon: IcRelationship,
    backgroundColor: COLORS.BLUE_300,
    width: 308,
    height: 413,
  },
  {
    icon: IcDaily,
    backgroundColor: COLORS.BLUE_400,
    width: 308,
    height: 413,
  },
  {
    icon: IcHealth,
    backgroundColor: COLORS.BLUE_300,
    width: 308,
    height: 413,
  },
  {
    icon: IcTmi,
    backgroundColor: COLORS.BLUE_400,
    width: 308,
    height: 413,
  },
];

function HomeScreen({ navigation }: HomeScreenProp) {
  const carouselRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const [week1, setWeek1] = useState('');
  const [week2, setWeek2] = useState('');

  const renderItem = useCallback(({ item }: RenderItemProps) => {
    return (
      <View style={styles.carouselWrapper} key={item.category}>
        <View
          style={[styles.card, { backgroundColor: item.image.backgroundColor }]}
        >
          <ImageBackground
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
            source={item.image.icon}
            resizeMode="contain"
          >
            <Text style={styles.questionText}>{item.content}</Text>
            <TouchableOpacity
              style={styles.answerBtn}
              onPress={() =>
                navigation.navigate('Record', {
                  category: item.category,
                  question: item.content,
                })
              }
            >
              <Text style={styles.answerTxt}>답변하기</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }, []);

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

  useEffect(() => {
    privateAPI
      .get({ url: 'api/v1/questions' })
      .then((response) => {
        if (response.responseSuccess) {
          setCarouselItems(
            response.multipleData.map((item: any, index: number) => {
              return { ...item, image: imageItem[index] };
            }),
          );
        } else {
          // 여기서 에러 띄우기
        }
      })
      .catch((/* error */) => {
        // 여기서도 에러 띄우기
      });
  }, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={{ marginTop: 2 }}>
        <Header isTitleLogo title="" />
      </View>
      {/* Title */}
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{week1}</Text>
        <Text style={styles.title}>{week2}</Text>
      </View>

      <Carousel
        layout="default"
        ref={carouselRef}
        data={carouselItems}
        sliderWidth={400}
        itemWidth={310}
        renderItem={renderItem}
        onSnapToItem={(index: number) => setActiveIndex(index)}
        layoutCardOffset={5}
      />
      <View style={styles.paginationWrapper}>
        <Pagination
          dotsLength={5}
          activeDotIndex={activeIndex}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 10,
            backgroundColor: COLORS.THEME_PRIMARY,
          }}
          inactiveDotStyle={{
            backgroundColor: COLORS.TEXT_DISABLED_GREY,
            width: 12,
            height: 12,
          }}
        />
      </View>

      {/* Button */}
      <Text style={styles.subTxt}>잠깐, 답변할 질문이 없으신가요?</Text>

      <TouchableOpacity
        style={styles.myQBtn}
        onPress={() => navigation.navigate('Record')}
      >
        <Text style={styles.myQText}>내 질문으로 작성하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;
