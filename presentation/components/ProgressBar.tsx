import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import COLORS from '../styles/colors';

type ProgressBarProps = {
  navigation: string;
  distance1: Number;
  distance2: Number;
  height: number;
  completedColor1: string;
  completedColor2: string;
};

function ProgressBar(props: ProgressBarProps) {
  const {
    navigation,
    distance1,
    distance2,
    height,
    completedColor1,
    completedColor2,
  } = props;
  const [getDistance1, setDistance1] = useState(distance1);
  const [getDistance2, setDistance2] = useState(distance2);
  const [getheight, setHeight] = useState(height);
  const [getCompletedColor1, setCompletedColor1] = useState(completedColor1);
  const [getCompletedColor2, setCompletedColor2] = useState(completedColor2);

  return (
    <View>
      <View style={{ justifyContent: 'center' }}>
        <View
          style={{
            width: '100%',
            height: getheight,
            marginVertical: 5,
            borderRadius: 4,
            borderColor: COLORS.BLUE_200,
            borderWidth: 1,
            backgroundColor: '#fff',
          }}
        />

        {/* 1 */}
        <View
          style={{
            width: getDistance1 || 0,
            height: getheight,
            marginVertical: 5,
            borderRadius: 4,
            backgroundColor: getCompletedColor1,
            position: 'absolute',
            bottom: 40,
          }}
        />
        {/* 2 */}
        <View
          style={{
            width: getDistance2 || 0,
            height: getheight,
            marginVertical: 5,
            borderRadius: 4,
            backgroundColor: getCompletedColor2,
            position: 'absolute',
            bottom: 40,
          }}
        />

        {/* 1 */}
        <View
          style={{
            width: getDistance1 || 0,
            height: getheight,
            bottom: 0,
          }}
        >
          <Text
            style={{
              textAlign: 'right',
              fontFamily: 'Pretendard',
              fontSize: 12,
              color: COLORS.BLUE_500,
            }}
          >
            {distance1}km
          </Text>
        </View>
        {/* 2 */}
        <View
          style={{
            width: getDistance2 || 0,
            height: getheight,
            bottom: 20,
          }}
        >
          <Text
            style={{
              textAlign: 'right',
              fontFamily: 'Pretendard',
              fontSize: 12,
              color: COLORS.BLUE_400,
            }}
          >
            {distance2}km
          </Text>
        </View>
      </View>
    </View>
  );
}
// -----------------------------------------------------------------------//

export default ProgressBar;
