import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

function ButtonBack(props: { onPress: () => void; theme?: 'white' | 'black' }) {
  const { onPress, theme = 'black' } = props;
  const iconSrc =
    theme === 'white'
      ? require(`../../assets/ic-move-back-white.png`)
      : require(`../../assets/ic-move-back-black.png`);

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={iconSrc} style={{ width: 24, height: 24 }} />
    </TouchableOpacity>
  );
}

export default ButtonBack;
