import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Notice } from '../../infrastructures/types/notice';
import COLORS from '../styles/colors';
import NoticeItem from './NoticeItem';

type NoticesPerDayProps = {
  date: string;
  notices: Notice[];
  goFeed: () => void;
};

const IcMoveUp = require('../../assets/ic-move-up.png');
const IcMoveDown = require('../../assets/ic-move-down.png');

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: COLORS.TEXT_PRIMARY,
  },
  icon: {
    height: 24,
    width: 24,
  },
});

function NoticesPerDay(props: NoticesPerDayProps) {
  const { date, notices, goFeed } = props;
  const [isWrapped, setIsWrapped] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{date}</Text>
        <TouchableOpacity onPress={() => setIsWrapped((prev) => !prev)}>
          <Image
            source={isWrapped ? IcMoveDown : IcMoveUp}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {!isWrapped &&
        notices.map((notice) => (
          <NoticeItem key={notice.id} {...notice} goFeed={goFeed} />
        ))}
    </View>
  );
}

export default NoticesPerDay;
