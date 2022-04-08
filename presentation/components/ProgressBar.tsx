import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../styles/colors';
import { getProgressbarWidth } from '../../infrastructures/utils/progressbar';

type ProgressBarProps = {
  navigation: string;
  distance1: number; // familyDistance
  distance2: number; // myDistance
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
  const [getWidth1, setWidth1] = useState(distance1);
  const [getWidth2, setWidth2] = useState(distance2);
  const [getheight, setHeight] = useState(height);
  const [getCompletedColor1, setCompletedColor1] = useState(completedColor1);
  const [getCompletedColor2, setCompletedColor2] = useState(completedColor2);

  useEffect(() => {
    setWidth1(getProgressbarWidth(distance2)); // max 163
    setWidth2(getProgressbarWidth(distance1));
  }, []);

  return (
    <View>
      <View style={{ justifyContent: 'center' }}>
        <View
          style={{
            width: 327,
            height: getheight,
            marginVertical: 5,
            borderRadius: 4,
            borderColor: COLORS.BLUE_200,
            borderWidth: 1,
            backgroundColor: '#fff',
          }}
        />

        {/* Progressbar */}
        {/* 1 */}
        <View
          style={{
            width: getWidth1 || 0,
            height: getheight,
            marginVertical: 5,
            borderRadius: 4,
            backgroundColor: getCompletedColor1,
            position: 'absolute',
            bottom: 40,
          }}
        />
        {/* 2 */}
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: getWidth2 || 0,
              height: getheight,
              marginVertical: 5,
              borderRadius: 4,
              backgroundColor: getCompletedColor2,
              position: 'absolute',
              bottom: 0,
              marginLeft: 163,
            }}
          />
        </View>

        {/* Text (km) */}
        {/* 1 */}
        <View
          style={{
            width: 163,
            height: getheight,
          }}
        >
          <Text
            style={{
              fontFamily: 'Pretendard',
              fontSize: 12,
              lineHeight: 14,
              color: COLORS.BLUE_500,
            }}
          >
            {distance1}km
          </Text>
        </View>

        {/* 2 */}
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: 163,
              height: getheight,
              bottom: 20,
            }}
          >
            <Text
              style={{
                width: 163,
                fontFamily: 'Pretendard',
                fontSize: 12,
                lineHeight: 14,
                color: COLORS.BLUE_400,
                marginLeft: 163,
              }}
            >
              {distance2}km
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
// -----------------------------------------------------------------------//

export default ProgressBar;
