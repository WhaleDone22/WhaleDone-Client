import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import COLORS from '../../styles/colors';
import { commonStyles } from '../../styles/common';
import ProgressBar from '../../components/ProgressBar';

type MapDetailScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'MapDetail'
>;

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  topAreaWrapper: {
    backgroundColor: COLORS.BLUE_100,
    height: 274,
    paddingHorizontal: 16,
    paddingTop: 59,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    marginStart: 8,
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
  },

  //
  distanceWrapper: {
    flexDirection: 'row',
    paddingVertical: 28,
    justifyContent: 'center',
  },
  imgWrapper: {
    width: 62,
    height: 62,
  },
  lineWrapper: {
    width: 126,
    marginHorizontal: 20,
  },
  line: {
    width: 126,
    height: 10,
  },
  distanceValue: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: COLORS.THEME_PRIMARY,
    textAlign: 'center',
    paddingVertical: 4,
  },

  progressBarWrapper: {
    // backgroundColor: COLORS.BLUE_500,
    paddingHorizontal: 20,
  },
});

const defaultProfile = require('../../../assets/image-profile-default.png');
const ex1Profile = require('../../../assets/image-profile-ex1.png');
const ex2Profile = require('../../../assets/image-profile-ex2.png');
const distanceLine = require('../../../assets/ic-distance-line2.png');

function MapDetailScreen({ navigation }: MapDetailScreenProp) {
  return (
    <SafeAreaView style={[styles.safeAreaContainer]} edges={['bottom']}>
      <View style={styles.topAreaWrapper}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <ButtonBack onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>user2님과의 3월 마음거리</Text>
        </View>

        {/* 마음거리 */}
        <View style={styles.distanceWrapper}>
          <Image source={defaultProfile} style={styles.imgWrapper} />

          {/* line */}
          <View style={styles.lineWrapper}>
            <Text style={styles.distanceValue}>9,000km</Text>
            <Image source={distanceLine} style={styles.line} />
          </View>

          <Image source={ex1Profile} style={styles.imgWrapper} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarWrapper}>
          <ProgressBar
            navigation="???"
            distance1="60%"
            distance2="20%"
            height={20}
            completedColor1={COLORS.BLUE_500}
            completedColor2={COLORS.BLUE_300}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MapDetailScreen;
