import React, { useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { api } from '../../infrastructures/api';
import { Feed, reactionToIcon } from '../../infrastructures/types/feed';
import COLORS from '../styles/colors';

const ImageEmptyProfile = require('../../assets/image-profile-empty.png');
const IcEditBlack = require('../../assets/ic-edit-black.png');
const IcDeleteRed = require('../../assets/ic-delete-red.png');

const styles = StyleSheet.create({
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  feed: {
    display: 'flex',
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 17,
    position: 'relative',
  },
  myFeed: {
    flexDirection: 'row-reverse',
  },
  familyFeed: {
    flexDirection: 'row',
  },
  feedBox: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  selectedMyFeedBubble: {
    borderWidth: 1,
    borderColor: COLORS.BLUE_400,
  },
  selectedFamilyFeedBubble: {
    borderWidth: 1,
    borderColor: COLORS.GREY_050,
  },
  writerText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
    fontFamily: 'Pretendard',
    marginLeft: 10,
    marginBottom: 8,
  },
  feedBubble: {
    flexDirection: 'column',
    backgroundColor: COLORS.GREY_020,
    borderRadius: 10,
    marginLeft: 10,
    paddingVertical: 20,
  },
  myFeedBubble: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: COLORS.BLUE_200,
    marginLeft: 0,
    marginRight: 10,
  },
  familyFeedBubble: {
    borderWidth: 1,
    borderColor: COLORS.GREY_030,
  },
  feedReactions: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  reactionBox: {
    flexDirection: 'row',
    marginRight: 10,
    height: 30,
    alignItems: 'center',
  },
  reactionIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  reactionCount: { color: COLORS.TEXT_SECONDARY, fontSize: 12 },
  titleText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: COLORS.TEXT_PRIMARY,
    paddingHorizontal: 20,
  },
  bodyText: {
    marginTop: 14,
    fontSize: 14,
    fontFamily: 'Pretendard',
    color: 'black',
    paddingHorizontal: 20,
  },
});

function FeedItem({
  feed,
  isMine,
  setSelectedFeedID,
  selectedFeedID,
  setSelectedFeedY,
  editFeed,
  fetchFeeds,
}: {
  feed: Feed;
  isMine: boolean;
  setSelectedFeedID: () => void;
  selectedFeedID: number | undefined;
  setSelectedFeedY: (y: number) => void;
  editFeed: (
    category: string,
    question: string,
    feedID: number,
    content: string,
    type: string,
  ) => void;
  fetchFeeds: () => void;
}) {
  const [positionY, setPositionY] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [editVisible, setEditVisible] = useState(false);
  const feedViewRef = useRef<View>(null);
  const onBubbleClicked = () => {
    setSelectedFeedID();
    setEditVisible(false);
    if (positionY && height) setSelectedFeedY(positionY + height);
  };

  const onBubbleLongPressed = () => {
    setEditVisible(true);
  };

  const onEditPressed = () => {
    editFeed('수정하기', feed.title, feed.id, feed.body, feed.type);
    setEditVisible(false);
  };

  const onDeletePressed = () => {
    api.feedService.deleteFeed(feed.id).then((response) => {
      if (response.isSuccess) {
        setEditVisible(false);
        fetchFeeds();
      }
    });
  };

  return (
    <View
      style={[styles.feed, isMine ? styles.myFeed : styles.familyFeed]}
      onLayout={(event) => {
        const { layout } = event.nativeEvent;
        setPositionY(layout.y);
        setHeight(layout.height);
      }}
      ref={feedViewRef}
    >
      <Image
        source={
          feed.writerThumbnail
            ? { uri: feed.writerThumbnail }
            : ImageEmptyProfile
        }
        style={styles.profileImage}
      />
      <View style={styles.feedBox}>
        {!isMine && <Text style={styles.writerText}>{feed.writer}</Text>}
        <Pressable
          style={[
            styles.feedBubble,
            isMine ? styles.myFeedBubble : styles.familyFeedBubble,
            selectedFeedID === feed.id &&
              (isMine
                ? styles.selectedMyFeedBubble
                : styles.selectedFamilyFeedBubble),
          ]}
          onPress={onBubbleClicked}
          onLongPress={onBubbleLongPressed}
        >
          <Text style={styles.titleText}>{feed.title}</Text>
          {feed.type === 'TEXT' && (
            <Text style={styles.bodyText}>{feed.body}</Text>
          )}
          {feed.type === 'IMAGE' && (
            <View style={{ paddingHorizontal: 24 }}>
              <Image
                source={{ uri: feed.body }}
                style={{
                  width: '100%',
                  height: 332,
                  marginTop: 16,
                  borderRadius: 5,
                  alignSelf: 'center',
                }}
              />
            </View>
          )}
          <View style={styles.feedReactions}>
            {feed.reactions.map((reaction) => (
              <Pressable key={reaction.type} style={styles.reactionBox}>
                <Image
                  source={reactionToIcon[reaction.type]}
                  style={styles.reactionIcon}
                />
                <Text style={styles.reactionCount}>{reaction.count}</Text>
              </Pressable>
            ))}
          </View>
          {isMine && editVisible && (
            <View
              style={{
                position: 'absolute',
                backgroundColor: COLORS.GREY_010,
                bottom: 0,
                marginBottom: -20,
                left: 0,
                width: '100%',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 4,
              }}
            >
              <Pressable
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 52,
                  borderBottomColor: COLORS.GREY_030,
                  borderBottomWidth: 1,
                }}
                onPress={onEditPressed}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Pretendard',
                    color: COLORS.TEXT_PRIMARY,
                    paddingLeft: 16,
                  }}
                >
                  수정하기
                </Text>
                <Image
                  source={IcEditBlack}
                  style={{ width: 24, height: 24, marginRight: 16 }}
                />
              </Pressable>
              <Pressable
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 52,
                }}
                onPress={onDeletePressed}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Pretendard',
                    color: COLORS.THEME_NEGATIVE,
                    paddingLeft: 16,
                  }}
                >
                  삭제하기
                </Text>
                <Image
                  source={IcDeleteRed}
                  style={{ width: 24, height: 24, marginRight: 16 }}
                />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

export default FeedItem;
