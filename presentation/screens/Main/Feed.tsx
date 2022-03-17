import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { api } from '../../../infrastructures/api';
import {
  ClockTime,
  Feed,
  ReactionItem as ReactionItemType,
} from '../../../infrastructures/types/feed';
import ClockItem from '../../components/ClockItem';
import FeedsPerDay from '../../components/FeedsPerDay';
import COLORS from '../../styles/colors';
import { commonStyles } from '../../styles/common';
import ReactionItem from '../../components/ReactionItem';
import AudioRecorder from '../../components/AudioRecorder';

const { width } = Dimensions.get('window');
const reactionEmojis: string[] = require('../../../infrastructures/data/reactionEmoji.json');

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
  textInput: {
    flex: 1,
  },
  sendButton: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: COLORS.THEME_PRIMARY,
  },
  inputWrapper: {
    marginTop: 52,
    backgroundColor: COLORS.GREY_020,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.GREY_030,
  },
});

const IcSwiperNext = require('../../../assets/ic-swiper-next.png');
const IcSwiperPrev = require('../../../assets/ic-swiper-prev.png');
const IcEmojiSelectedFalse = require('../../../assets/ic-emoji-selected-false.png');
const IcEmojiSelectedTrue = require('../../../assets/ic-emoji-selected-true.png');
const IcMikeSelectedFalse = require('../../../assets/ic-mike-selected-false.png');
const IcMikeSelectedTrue = require('../../../assets/ic-mike-selected-true.png');

function FeedScreen() {
  const [feeds, setFeeds] = useState<{ date: string; feeds: Feed[] }[]>([]);
  const [times, setTimes] = useState<{
    my: ClockTime;
    families: ClockTime[];
  }>({ my: { countryCode: 'KR', timeDelta: 0 }, families: [] });
  const [selectedFeedID, setSelectedFeedID] = useState<number | undefined>(
    undefined,
  );
  const [selectedFeedY, setSelectedFeedY] = useState<number | undefined>(
    undefined,
  );
  const [isAll, setIsAll] = useState(true);
  const [bottomSheetMode, setBottomSheetMode] = useState<
    'reaction' | 'text' | 'emoji' | 'record'
  >('reaction');
  const bottomSheetRef = useRef<any>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [typedText, setTypedText] = useState('');
  const [viewPaddingBottom, setViewPaddingBottom] = useState(40);
  const [reactions, setReactions] = useState<ReactionItemType[]>([]);

  useEffect(() => {
    api.feedService.getAllFeed().then((response) => setFeeds(response));
  }, []);

  useEffect(() => {
    api.feedService.getTime().then((response) => setTimes(response));
  }, []);

  useEffect(() => {
    if (selectedFeedID !== undefined) {
      bottomSheetRef.current?.show();
      api.feedService.getReactions(selectedFeedID).then((r) => setReactions(r));
    }
  }, [selectedFeedID]);

  useEffect(() => {
    if (selectedFeedY !== undefined) {
      setViewPaddingBottom(400);
      setTimeout(
        () =>
          scrollViewRef.current?.scrollTo({
            x: 0,
            y: selectedFeedY - 40,
            animated: true,
          }),
        0,
      );
    }
  }, [selectedFeedY]);

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: 'white', flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        height={430}
        backgroundColor="#00000000"
        sheetBackgroundColor="#FFFFFF"
        hasDraggableIcon={true}
        onClose={() => {
          setSelectedFeedID(undefined);
          setBottomSheetMode('reaction');
          setViewPaddingBottom(40);
          bottomSheetRef.current?.close();
          Keyboard.dismiss();
        }}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            setBottomSheetMode('reaction');
            setTypedText('');
            Keyboard.dismiss();
          }}
        >
          <Pressable
            style={styles.inputWrapper}
            onPress={() => setBottomSheetMode('text')}
          >
            <TextInput
              style={styles.textInput}
              keyboardType="default"
              onPressIn={() => setBottomSheetMode('text')}
              placeholder={bottomSheetMode === 'text' ? '텍스트 입력' : ''}
              onChangeText={(text) => setTypedText(text)}
              value={typedText}
              maxLength={40}
            />
            {bottomSheetMode !== 'text' ? (
              <>
                <Pressable onPress={() => setBottomSheetMode('record')}>
                  <Image
                    source={
                      bottomSheetMode === 'record'
                        ? IcMikeSelectedTrue
                        : IcMikeSelectedFalse
                    }
                    style={[styles.icon, { marginRight: 16 }]}
                  />
                </Pressable>
                <Pressable onPress={() => setBottomSheetMode('emoji')}>
                  <Image
                    source={
                      bottomSheetMode === 'emoji'
                        ? IcEmojiSelectedTrue
                        : IcEmojiSelectedFalse
                    }
                    style={styles.icon}
                  />
                </Pressable>
              </>
            ) : (
              <Pressable>
                <Text
                  style={[
                    styles.sendButton,
                    typedText === '' && { color: COLORS.TEXT_DISABLED_GREY },
                  ]}
                >
                  보내기
                </Text>
              </Pressable>
            )}
          </Pressable>
          <View
            style={{
              marginTop: 20,
              borderColor: 'white',
              borderTopColor: COLORS.GREY_020,
              borderWidth: 6,
              flex: 1,
            }}
          >
            {bottomSheetMode === 'reaction' ? (
              <ScrollView
                style={{
                  flex: 1,
                  paddingVertical: 24,
                  paddingHorizontal: 16,
                }}
              >
                <View
                  onStartShouldSetResponder={() => true}
                  style={{ paddingBottom: 30 }}
                >
                  {reactions.map((reaction) => (
                    <ReactionItem {...reaction} key={reaction.reactionID} />
                  ))}
                </View>
              </ScrollView>
            ) : bottomSheetMode === 'emoji' ? (
              <View>
                <FlatList
                  data={reactionEmojis}
                  renderItem={({ item }) => (
                    <Image
                      key={item}
                      source={{ uri: item }}
                      style={{ width: width / 3, height: width / 3 }}
                    />
                  )}
                  numColumns={3}
                  keyExtractor={(item) => item}
                />
              </View>
            ) : (
              <AudioRecorder
                setReactionMode={() => setBottomSheetMode('reaction')}
              />
            )}
          </View>
        </Pressable>
      </BottomSheet>
      <ScrollView stickyHeaderIndices={[1]} ref={scrollViewRef}>
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
        <View
          style={[styles.feedsWrapper, { paddingBottom: viewPaddingBottom }]}
        >
          {feeds.map((feed) => (
            <FeedsPerDay
              key={feed.date}
              {...feed}
              isAll={isAll}
              setSelectedFeedID={setSelectedFeedID}
              selectedFeedID={selectedFeedID}
              setSelectedFeedY={setSelectedFeedY}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default FeedScreen;
