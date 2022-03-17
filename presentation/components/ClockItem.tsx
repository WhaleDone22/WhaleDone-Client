import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ClockTime } from '../../infrastructures/types/feed';
import { toTimeFormat } from '../../infrastructures/utils/dates';
import COLORS from '../styles/colors';

const countryCodeWithEmoji = require('../../infrastructures/data/countryCodeWithEmoji.json');

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: COLORS.TEXT_PRIMARY,
    padding: 5,
  },
});

function ClockItem({ clock }: { clock: ClockTime }) {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const date = new Date();
      date.setHours(date.getHours() + clock.timeDelta);
      setTime(date);
    }, 1000 * 15);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{countryCodeWithEmoji[clock.countryCode]}</Text>
      <Text style={styles.text}>{toTimeFormat(time)}</Text>
    </View>
  );
}

export default ClockItem;
