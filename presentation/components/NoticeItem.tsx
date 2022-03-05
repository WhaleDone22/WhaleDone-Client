import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Notice, noticeToIcon } from '../../infrastructures/types/notice';
import COLORS from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 8,
    height: 88,
  },
  containerSeen: {
    backgroundColor: COLORS.GREY_020,
    borderColor: COLORS.GREY_030,
  },
  containerUnseen: {
    backgroundColor: COLORS.BLUE_200,
    borderColor: COLORS.BLUE_300,
  },
  icon: { width: 24, height: 24 },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  textWrapper: { flex: 1 },
  text: {
    fontSize: 14,
    fontFamily: 'Pretendard',
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 21,
  },
  subText: {
    fontFamily: 'Pretendard-Bold',
  },
  textSeen: {
    color: COLORS.TEXT_DISABLED_GREY,
  },
});

function NoticeItem(prop: Notice) {
  const { type, isSeen, body, sub } = prop;
  return (
    <Pressable
      style={[
        styles.container,
        isSeen ? styles.containerSeen : styles.containerUnseen,
      ]}
    >
      <View style={styles.iconWrapper}>
        <Image source={noticeToIcon[type]} style={styles.icon} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={[styles.text, isSeen && styles.textSeen]}>{body}</Text>
        {sub && (
          <Text
            numberOfLines={1}
            style={[styles.text, styles.subText, isSeen && styles.textSeen]}
          >
            {sub}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

export default NoticeItem;
