import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feed, reactionToIcon } from '../../infrastructures/types/feed';
import COLORS from '../styles/colors';

const ImageEmptyProfile = require('../../assets/image-profile-empty.png');

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
  selectedFeedBox: {
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
    padding: 20,
    backgroundColor: COLORS.GREY_020,
    borderRadius: 10,
    marginLeft: 10,
  },
  myFeedBubble: {
    backgroundColor: COLORS.BLUE_200,
    marginLeft: 0,
    marginRight: 10,
  },
  feedReactions: {
    flexDirection: 'row',
    marginTop: 10,
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
  },
  bodyText: {
    marginTop: 14,
    fontSize: 14,
    fontFamily: 'Pretendard',
    color: 'black',
  },
});

function FeedItem({
  feed,
  isMine,
  setSelectedFeedID,
  selectedFeedID,
  setSelectedFeedY,
}: {
  feed: Feed;
  isMine: boolean;
  setSelectedFeedID: () => void;
  selectedFeedID: number | undefined;
  setSelectedFeedY: (y: number) => void;
}) {
  const [positionY, setPositionY] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const feedViewRef = useRef<View>(null);
  const onBubbleClicked = () => {
    setSelectedFeedID();
    if (positionY && height) setSelectedFeedY(positionY + height);
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
        <TouchableOpacity
          style={[
            styles.feedBubble,
            isMine && styles.myFeedBubble,
            selectedFeedID === feed.id && styles.selectedFeedBox,
          ]}
          onPress={onBubbleClicked}
        >
          <Text style={styles.titleText}>{feed.title}</Text>
          <Text style={styles.bodyText}>{feed.body}</Text>
          <View style={styles.feedReactions}>
            {feed.reactions.map((reaction) => (
              <TouchableOpacity key={reaction.type} style={styles.reactionBox}>
                <Image
                  source={reactionToIcon[reaction.type]}
                  style={styles.reactionIcon}
                />
                <Text style={styles.reactionCount}>{reaction.count}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FeedItem;
