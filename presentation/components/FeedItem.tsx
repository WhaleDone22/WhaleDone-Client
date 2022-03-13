import React from 'react';
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
});

function FeedItem({ feed, isMine }: { feed: Feed; isMine: boolean }) {
  return (
    <View style={[styles.feed, isMine ? styles.myFeed : styles.familyFeed]}>
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
        <View style={[styles.feedBubble, isMine && styles.myFeedBubble]}>
          <Text>{feed.title}</Text>
          <Text>{feed.body}</Text>
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
        </View>
      </View>
    </View>
  );
}

export default FeedItem;
