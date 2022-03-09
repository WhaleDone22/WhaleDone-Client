import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Feed, reactionToIcon } from '../../infrastructures/types/feed';

const ImageEmptyProfile = require('../../assets/image-profile-empty.png');

function FeedItem({ feed }: { feed: Feed }) {
  return (
    <View>
      <Image source={feed.writerThumbnail ?? ImageEmptyProfile} />
      <View>
        <Text>{feed.writer}</Text>
        <View>
          <Text>{feed.title}</Text>
          <Text>{feed.body}</Text>
          <View>
            {feed.reactions.map((reaction) => (
              <TouchableOpacity key={reaction.type}>
                <Image source={reactionToIcon[reaction.type]} />
                <Text>{reaction.count}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

export default FeedItem;
