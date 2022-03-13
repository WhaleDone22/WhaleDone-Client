import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { api } from '../../../infrastructures/api';
import { ClockTime, Feed } from '../../../infrastructures/types/feed';
import ClockItem from '../../components/ClockItem';
import FeedsPerDay from '../../components/FeedsPerDay';
import COLORS from '../../styles/colors';
import { commonStyles } from '../../styles/common';

const styles = StyleSheet.create({
  timeContainer: {
    backgroundColor: COLORS.BLUE_100,
    paddingBottom: 16,
  },
  timeWrapper: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.BLUE_200,
    backgroundColor: 'white',
    marginHorizontal: 16,
    flexDirection: 'row',
    paddingVertical: 11,
  },
  rightBorder: {
    borderRightColor: COLORS.BLUE_200,
    borderRightWidth: 1,
  },
  timeChild: { flex: 1 },
  timeTitle: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: 14,
  },
  timeSwiperButtonWrapper: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'flex-start',
  },
  icon: { width: 24, height: 24 },
  feedHeader: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    paddingStart: 26,
    paddingEnd: 22,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feedHeaderTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: COLORS.TEXT_PRIMARY,
  },
  feedFilter: {
    fontSize: 14,
    fontFamily: 'Pretendard',
    color: COLORS.TEXT_DISABLED_GREY,
  },
  feedFilterSelected: {
    color: COLORS.TEXT_PRIMARY,
  },
  feedModeSelector: {
    flexDirection: 'row',
  },
  feedsWrapper: {
    backgroundColor: 'white',
  },
});

const IcSwiperNext = require('../../../assets/ic-swiper-next.png');
const IcSwiperPrev = require('../../../assets/ic-swiper-prev.png');

function FeedScreen() {
  const [feeds, setFeeds] = useState<{ date: string; feeds: Feed[] }[]>([]);
  const [times, setTimes] = useState<{
    my: ClockTime;
    families: ClockTime[];
  }>({ my: { countryCode: 'KR', timeDelta: 0 }, families: [] });
  const [isAll, setIsAll] = useState(true);

  useEffect(() => {
    api.feedService.getAllFeed().then((response) => setFeeds(response));
  }, []);

  useEffect(() => {
    api.feedService.getTime().then((response) => setTimes(response));
  }, []);

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView stickyHeaderIndices={[1]}>
        <View style={styles.timeContainer}>
          <View style={commonStyles.titleWrapper}>
            <Text style={commonStyles.title}>소통함</Text>
          </View>
          <View style={styles.timeWrapper}>
            <View style={[styles.timeChild, styles.rightBorder]}>
              <Text style={styles.timeTitle}>지금 내 시간</Text>
              <ClockItem clock={times.my} />
            </View>
            <View style={styles.timeChild}>
              <Text style={styles.timeTitle}>지금 가족 시간</Text>
              <Swiper
                showsButtons={times.families.length > 1}
                nextButton={<Image source={IcSwiperNext} style={styles.icon} />}
                prevButton={<Image source={IcSwiperPrev} style={styles.icon} />}
                showsPagination={false}
                buttonWrapperStyle={styles.timeSwiperButtonWrapper}
                height={60}
              >
                {times.families.map((time) => (
                  <ClockItem key={time.countryCode} clock={time} />
                ))}
              </Swiper>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.feedHeader}>
            <Text style={styles.feedHeaderTitle}>일상 피드</Text>
            <View style={styles.feedModeSelector}>
              <Text
                style={[
                  styles.feedFilter,
                  isAll && styles.feedFilterSelected,
                  { paddingRight: 12 },
                ]}
                onPress={() => setIsAll(true)}
              >
                전체
              </Text>
              <Text
                style={[styles.feedFilter, !isAll && styles.feedFilterSelected]}
                onPress={() => setIsAll(false)}
              >
                나의 일상
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.feedsWrapper}>
          {feeds.map((feed) => (
            <FeedsPerDay key={feed.date} {...feed} isAll={isAll} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default FeedScreen;
