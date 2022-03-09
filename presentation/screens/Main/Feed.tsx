import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { api } from '../../../infrastructures/api';
import { ClockTime, Feed } from '../../../infrastructures/types/feed';
import ClockItem from '../../components/ClockItem';
import FeedsPerDay from '../../components/FeedsPerDay';

function FeedScreen() {
  const [feeds, setFeeds] = useState<{ date: string; feeds: Feed[] }[]>([]);
  const [times, setTimes] = useState<{
    my: ClockTime;
    families: ClockTime[];
  }>({ my: { countryCode: 'KR', timeDelta: 0 }, families: [] });

  useEffect(() => {
    api.feedService.getAllFeed().then((response) => setFeeds(response));
  }, []);

  useEffect(() => {
    api.feedService.getTime().then((response) => setTimes(response));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView stickyHeaderIndices={[1]}>
        <View>
          <View>
            <Text>소통함</Text>
          </View>
          <View>
            <View>
              <Text>지금 내 시간</Text>
              <ClockItem clock={times.my} />
            </View>
            <View>
              <Text>지금 가족 시간</Text>
              <Swiper
                showsButtons={times.families.length > 1}
                showsPagination={false}
              >
                {times.families.map((time) => (
                  <ClockItem key={time.countryCode} clock={time} />
                ))}
              </Swiper>
            </View>
          </View>
        </View>
        <View>
          <Text>일상 피드</Text>
          <Text>전체</Text>
          <Text>나의 일상</Text>
        </View>
        <View>
          {feeds.map((feed) => (
            <FeedsPerDay key={feed.date} {...feed} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default FeedScreen;
