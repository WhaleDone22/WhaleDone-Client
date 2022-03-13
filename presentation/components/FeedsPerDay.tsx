import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feed } from '../../infrastructures/types/feed';
import COLORS from '../styles/colors';
import FeedItem from './FeedItem';

const styles = StyleSheet.create({
  feedContainer: {
    paddingHorizontal: 17,
    marginTop: 24,
  },
  dateText: {
    backgroundColor: COLORS.BLUE_100,
    width: 100,
    textAlign: 'center',
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
    paddingVertical: 5,
    borderRadius: 3,
    fontFamily: 'Pretendard',
  },
});

function FeedsPerDay({
  date,
  feeds,
  isAll,
}: {
  date: string;
  feeds: Feed[];
  isAll: boolean;
}) {
  const myID = 4;
  return (
    <View style={styles.feedContainer}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      {isAll
        ? feeds.map((feed) => (
            <FeedItem
              key={feed.id}
              feed={feed}
              isMine={feed.writerID === myID}
            />
          ))
        : feeds
            .filter((feed) => feed.writerID === myID)
            .map((feed) => (
              <FeedItem
                key={feed.id}
                feed={feed}
                isMine={feed.writerID === myID}
              />
            ))}
    </View>
  );
}

export default FeedsPerDay;
