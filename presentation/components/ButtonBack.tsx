import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

type ButtonBackProp = {
  onPress: () => void;
  theme?: 'white' | 'black';
};

const IconMoveBackWhite = require(`../../assets/ic-move-back-white.png`);
const IconMoveBackBlack = require(`../../assets/ic-move-back-black.png`);

function ButtonBack(props: ButtonBackProp) {
  const { onPress, theme } = props;
  const iconSrc = theme === 'white' ? IconMoveBackWhite : IconMoveBackBlack;

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={iconSrc} style={{ width: 24, height: 24 }} />
    </TouchableOpacity>
  );
}

ButtonBack.defaultProps = {
  theme: 'black',
};

export default ButtonBack;
