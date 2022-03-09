import React from 'react';
import { Text, View } from 'react-native';
import { Feed } from '../../infrastructures/types/feed';
import FeedItem from './FeedItem';

function FeedsPerDay({ date, feeds }: { date: string; feeds: Feed[] }) {
  return (
    <View>
      <Text>{date}</Text>
      {feeds.map((feed) => (
        <FeedItem key={feed.id} feed={feed} />
      ))}
    </View>
  );
}

export default FeedsPerDay;
