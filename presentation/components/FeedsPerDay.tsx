import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feed } from '../../infrastructures/types/feed';
import COLORS from '../styles/colors';
import FeedItem from './FeedItem';

const styles = StyleSheet.create({
  dateText: {
    marginTop: 24,
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
  setSelectedFeedID,
  selectedFeedID,
  setSelectedFeedY,
  editFeed,
  fetchFeeds,
}: {
  date: string;
  feeds: Feed[];
  isAll: boolean;
  setSelectedFeedID: (id: number) => void;
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
  const [myID, setMyID] = useState(0);
  useEffect(() => {
    AsyncStorage.getItem('userID').then((value) => setMyID(+(value ?? 0)));
  }, []);

  return (
    <>
      {feeds.filter((feed) => feed.writerID === myID).length > 0 && (
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      )}
      {isAll
        ? feeds.map((feed) => (
            <FeedItem
              key={feed.id}
              feed={feed}
              isMine={feed.writerID === myID}
              setSelectedFeedID={() => setSelectedFeedID(feed.id)}
              selectedFeedID={selectedFeedID}
              setSelectedFeedY={setSelectedFeedY}
              editFeed={editFeed}
              fetchFeeds={fetchFeeds}
            />
          ))
        : feeds
            .filter((feed) => feed.writerID === myID)
            .map((feed) => (
              <FeedItem
                key={feed.id}
                feed={feed}
                isMine={feed.writerID === myID}
                setSelectedFeedID={() => setSelectedFeedID(feed.id)}
                selectedFeedID={selectedFeedID}
                setSelectedFeedY={setSelectedFeedY}
                editFeed={editFeed}
                fetchFeeds={fetchFeeds}
              />
            ))}
    </>
  );
}

export default FeedsPerDay;
