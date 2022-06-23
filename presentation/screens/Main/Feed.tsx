import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Carousel from 'react-native-snap-carousel';
import BottomSheet from '../../../custom-modules/react-native-getsture-bottom-sheet';
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
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';

const { width, height } = Dimensions.get('window');
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
  previewText: {
    color: COLORS.TEXT_DISABLED_GREY,
    fontSize: 14,
    fontFamily: 'Pretendard',
  },
  headerIconWrapper: {
    flexDirection: 'row',
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerIconFirst: {
    marginRight: 20,
  },
  carouselContainer: {
    flexDirection: 'row',
  },
});

const IcSwiperNext = require('../../../assets/ic-swiper-next.png');
const IcSwiperPrev = require('../../../assets/ic-swiper-prev.png');
const IcSwiperLast = require('../../../assets/ic-swiper-last.png');
const IcSwiperFirst = require('../../../assets/ic-swiper-first.png');
const IcEmojiSelectedFalse = require('../../../assets/ic-emoji-selected-false.png');
const IcEmojiSelectedTrue = require('../../../assets/ic-emoji-selected-true.png');
const IcMikeSelectedFalse = require('../../../assets/ic-mike-selected-false.png');
const IcMikeSelectedTrue = require('../../../assets/ic-mike-selected-true.png');
const IcNotice = require('../../../assets/ic-bell.png');
const IcMyPage = require('../../../assets/ic-user-circle.png');
const imgFeedShadow = require('../../../assets/img-feed-shadow.png');

type FeedScreenProp = NativeStackScreenProps<NavigationStackParams, 'Feed'>;

function FeedScreen({ navigation }: FeedScreenProp) {
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
  const [userID, setUserID] = useState<number | undefined>(undefined);

  useEffect(() => {
    AsyncStorage.getItem('userID').then((id) => {
      if (!id) return;
      const uid = parseFloat(id);
      setUserID(uid);
    });
  }, []);

  const fetchFeeds = () => {
    api.feedService.getAllFeed().then((response) => {
      setFeeds(response);
    });
  };

  const fetchReactions = () => {
    if (!selectedFeedID) return;
    api.feedService.getReactions(selectedFeedID).then((r) => setReactions(r));
  };

  const deleteReaction = (reactionID: number) => {
    if (!selectedFeedID) return;
    api.feedService
      .deleteReaction(selectedFeedID, reactionID)
      .then((response) => {
        if (response.isSuccess) {
          fetchReactions();
          fetchFeeds();
        }
      });
  };

  const sendTextReaction = () => {
    if (!selectedFeedID) return;
    api.feedService
      .createReaction(selectedFeedID, typedText, 'TEXT')
      .then((response) => {
        if (response.isSuccess) {
          setTypedText('');
          setBottomSheetMode('reaction');
          fetchReactions();
          fetchFeeds();
        }
      });
  };

  const sendEmojiReaction = (emoji: string) => {
    if (!selectedFeedID) return;
    api.feedService
      .createReaction(selectedFeedID, emoji, 'EMOJI')
      .then((response) => {
        if (response.isSuccess) {
          setBottomSheetMode('reaction');
          fetchReactions();
          fetchFeeds();
        }
      });
  };

  const sendRecordReaction = (recordPath: string) => {
    if (!selectedFeedID) return;
    api.feedService
      .createReaction(selectedFeedID, recordPath, 'RECORD')
      .then((response) => {
        if (response.isSuccess) {
          setBottomSheetMode('reaction');
          fetchReactions();
          fetchFeeds();
        }
      });
  };

  const editFeed = (
    category: string,
    question: string,
    feedID: number,
    content: string,
    type: string,
  ) => {
    navigation.navigate('Record', {
      category,
      question,
      feedID,
      content,
      type,
    });
  };

  const familyTimeCarouselRef = useRef<Carousel<ClockTime>>(null);
  const [activeFamilyTimeIndex, setActiveFamilyTimeIndex] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    fetchFeeds();
  }, []);

  useEffect(() => {
    api.feedService.getTime().then((response) => setTimes(response));
  }, []);

  useEffect(() => {
    if (selectedFeedID !== undefined) {
      bottomSheetRef.current?.show();
      fetchReactions();
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
        draggable
        hasDraggableIcon
        dragIconStyle={{ width: 76 }}
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
              <Pressable onPress={sendTextReaction}>
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
            {(bottomSheetMode === 'reaction' ||
              (bottomSheetMode === 'text' && Platform.OS === 'android')) && (
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
                  {reactions.length > 0 ? (
                    reactions.map((reaction) => (
                      <ReactionItem
                        {...reaction}
                        key={reaction.reactionID}
                        deleteReaction={deleteReaction}
                      />
                    ))
                  ) : (
                    <Text
                      style={{
                        color: COLORS.TEXT_DISABLED_GREY,
                        fontSize: 14,
                        fontFamily: 'Pretendard',
                        textAlign: 'center',
                        marginTop: height * 0.15,
                      }}
                    >
                      도착한 리액션이 아직 없어요.
                    </Text>
                  )}
                </View>
              </ScrollView>
            )}
            {bottomSheetMode === 'emoji' && (
              <View>
                <FlatList
                  data={reactionEmojis}
                  renderItem={({ item }) => (
                    <Pressable onPress={() => sendEmojiReaction(item)}>
                      <Image
                        key={item}
                        source={{ uri: item }}
                        style={{ width: width / 3, height: width / 3 }}
                      />
                    </Pressable>
                  )}
                  numColumns={3}
                  keyExtractor={(item) => item}
                />
              </View>
            )}
            {bottomSheetMode === 'record' && (
              <AudioRecorder
                setReactionMode={() => setBottomSheetMode('reaction')}
                sendRecordReaction={sendRecordReaction}
              />
            )}
          </View>
        </Pressable>
      </BottomSheet>
      <ScrollView
        stickyHeaderIndices={[1]}
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          <View style={styles.timeContainer}>
            <View style={commonStyles.titleWrapper}>
              <Text style={commonStyles.title}>소통함</Text>
              <View style={styles.headerIconWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
                  <Image
                    source={IcNotice}
                    style={[styles.headerIcon, styles.headerIconFirst]}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
                  <Image source={IcMyPage} style={styles.headerIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.timeWrapper}>
              <View style={[styles.timeChild, styles.rightBorder]}>
                <Text style={styles.timeTitle}>지금 나의 시간</Text>
                <ClockItem clock={times.my} />
              </View>
              <View style={styles.timeChild}>
                {times.families.length > 0 ? (
                  <>
                    <Text style={styles.timeTitle}>지금 가족 시간</Text>
                    <View style={styles.carouselContainer}>
                      {times.families.length > 1 &&
                        (activeFamilyTimeIndex === 0 ? (
                          <Image source={IcSwiperFirst} style={styles.icon} />
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              familyTimeCarouselRef.current?.snapToPrev();
                            }}
                          >
                            <Image source={IcSwiperPrev} style={styles.icon} />
                          </TouchableOpacity>
                        ))}
                      <Carousel
                        ref={familyTimeCarouselRef}
                        data={times.families}
                        renderItem={({ item, index }) => (
                          <ClockItem
                            key={item.countryCode}
                            clock={item}
                            isCarousel
                            isLastItem={index === times.families.length - 1}
                          />
                        )}
                        onSnapToItem={(index) =>
                          setActiveFamilyTimeIndex(index)
                        }
                        itemWidth={110}
                        itemHeight={54}
                        sliderWidth={130}
                        inactiveSlideOpacity={0}
                        inactiveSlideScale={1}
                        activeSlideAlignment="end"
                      />
                      {times.families.length > 1 &&
                        (activeFamilyTimeIndex === times.families.length - 1 ? (
                          <Image source={IcSwiperLast} style={styles.icon} />
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              familyTimeCarouselRef.current?.snapToNext();
                            }}
                          >
                            <Image source={IcSwiperNext} style={styles.icon} />
                          </TouchableOpacity>
                        ))}
                    </View>
                  </>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={[styles.previewText, { fontSize: 12 }]}>
                      가족을 초대하면
                    </Text>
                    <Text style={[styles.previewText, { fontSize: 12 }]}>
                      시간을 비교할 수 있어요!
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <Image source={imgFeedShadow} width={width} style={{ width }} />
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

        {feeds.length > 0 &&
        !(
          !isAll &&
          feeds.reduce((acc, cur) => {
            if (cur.feeds.filter((feed) => feed.writerID === userID).length > 0)
              return acc + 1;
            return acc;
          }, 0) === 0
        ) ? (
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
                editFeed={editFeed}
                fetchFeeds={fetchFeeds}
              />
            ))}
          </View>
        ) : (
          <>
            <View style={{ marginTop: 100, alignItems: 'center' }}>
              <Text style={styles.previewText}>아직 이곳은 조용하네요.</Text>
              <Text style={styles.previewText}>
                지금 바로 나의 일상을 가족과 공유해 보세요!
              </Text>
            </View>
            <Pressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 17,
                backgroundColor: COLORS.BLUE_500,
                borderRadius: 5,
                position: 'absolute',
                bottom: 24,
                width: '90%',
                right: '5%',
                left: '5%',
              }}
              onPress={() => navigation.navigate('Home')}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Pretendard-Bold',
                  color: 'white',
                }}
              >
                오늘 일상공유 하기
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FeedScreen;
