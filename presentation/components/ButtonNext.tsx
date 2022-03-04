import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../styles/colors';

type ButtonNextProp = {
  onPress: () => void;
  isActivated: boolean;
  content?: string;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingVertical: 16,
  },
  containerActivated: {
    backgroundColor: COLORS.BLUE_500,
  },
  containerDeactivated: {
    backgroundColor: COLORS.TEXT_DISABLED_GREY,
  },
  text: {
    color: 'white',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

function ButtonNext(props: ButtonNextProp) {
  const { onPress, isActivated, content } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        isActivated ? styles.containerActivated : styles.containerDeactivated,
      ]}
      disabled={!isActivated}
    >
      <Text style={styles.text}>{content}</Text>
    </TouchableOpacity>
  );
}

ButtonNext.defaultProps = {
  content: '다음',
};

export default ButtonNext;
