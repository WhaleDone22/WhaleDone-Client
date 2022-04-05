import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { ReactionItem as ReactionItemType } from '../../infrastructures/types/feed';
import COLORS from '../styles/colors';
import AudioPlayer from './AudioPlayer';

type ReactionItemProps = ReactionItemType & {
  deleteReaction: (reactionID: number) => void;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: 13,
  },
  containerDelete: {
    backgroundColor: COLORS.THEME_NEGATIVE,
    borderWidth: 0,
    flex: 1,
    justifyContent: 'flex-end',
    paddingEnd: 20,
  },
  icon: { width: 24, height: 24 },
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
const IcTrash = require('../../assets/ic-trash.png');

function ReactionItem(props: ReactionItemProps) {
  const {
    writerThumbnail,
    reactionID,
    reactionType,
    content,
    isMine,
    deleteReaction,
  } = props;

  return (
    <View style={styles.wrapper}>
      <Image
        source={writerThumbnail ? { uri: writerThumbnail } : ImageEmptyProfile}
        style={styles.profileImage}
      />
      {isMine ? (
        <Swipeable
          containerStyle={{ flex: 1 }}
          renderRightActions={() => (
            <RectButton style={[styles.container, styles.containerDelete]}>
              <Image source={IcTrash} style={styles.icon} />
            </RectButton>
          )}
          onSwipeableOpen={() => deleteReaction(reactionID)}
        >
          <RectButton>
            <View style={styles.bubbleWrapper}>
              {reactionType === 'RECORD' && <AudioPlayer src={content} />}
              {reactionType === 'TEXT' && (
                <Text style={styles.text}>{content}</Text>
              )}
              {reactionType === 'EMOJI' && (
                <Image
                  source={{ uri: content }}
                  style={{ width: 120, height: 120, alignSelf: 'center' }}
                />
              )}
            </View>
          </RectButton>
        </Swipeable>
      ) : (
        <View style={styles.bubbleWrapper}>
          {reactionType === 'RECORD' && <AudioPlayer src={content} />}
          {reactionType === 'TEXT' && (
            <Text style={styles.text}>{content}</Text>
          )}
          {reactionType === 'EMOJI' && (
            <Image
              source={{ uri: content }}
              style={{ width: 120, height: 120, alignSelf: 'center' }}
            />
          )}
        </View>
      )}
    </View>
  );
}

export default ReactionItem;
