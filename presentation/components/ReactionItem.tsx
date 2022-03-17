import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ReactionItem as ReactionItemType } from '../../infrastructures/types/feed';
import COLORS from '../styles/colors';
import AudioPlayer from './AudioPlayer';

type ReactionItemProps = ReactionItemType;

const styles = StyleSheet.create({
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  wrapper: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubbleWrapper: {
    flex: 1,
    marginLeft: 13,
    backgroundColor: COLORS.BLUE_100,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Pretendard',
  },
});
const ImageEmptyProfile = require('../../assets/image-profile-empty.png');

function ReactionItem(props: ReactionItemProps) {
  const { writerThumbnail, writerID, reactionID, reactionType, content } =
    props;
  return (
    <View style={styles.wrapper}>
      <Image
        source={writerThumbnail ? { uri: writerThumbnail } : ImageEmptyProfile}
        style={styles.profileImage}
      />
      <View style={styles.bubbleWrapper}>
        {reactionType === 'RECORD' && <AudioPlayer src={content} />}
        {reactionType === 'TEXT' && <Text style={styles.text}>{content}</Text>}
        {reactionType === 'EMOJI' && (
          <Image
            source={{ uri: content }}
            style={{ width: 120, height: 120, alignSelf: 'center' }}
          />
        )}
      </View>
    </View>
  );
}

export default ReactionItem;
