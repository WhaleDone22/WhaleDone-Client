import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ClockTime } from '../../infrastructures/types/feed';
import { toTimeFormat } from '../../infrastructures/utils/dates';

const countryCodeWithEmoji = require('../../infrastructures/data/countryCodeWithEmoji.json');

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
    <View>
      <Text>{countryCodeWithEmoji[clock.countryCode]}</Text>
      <Text>{toTimeFormat(time)}</Text>
    </View>
  );
}

export default ClockItem;
