import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useRef } from 'react';
import { Text, Image, StyleSheet, View, Pressable } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';

import COLORS from '../../styles/colors';

type MapScreenProp = NativeStackScreenProps<NavigationStackParams, 'Map'>;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 54,
    flexDirection: 'row',
    paddingStart: 24,
    paddingEnd: 15,
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
  },
  headerTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
  headerNotice: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  headerMyPage: {
    width: 24,
    height: 24,
  },
  countryCodeSelectorTitleText: {
    position: 'absolute',
    marginTop: 66,
    marginStart: 26,
    marginBottom: 40,
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: '#000',
    borderRadius: 20,
  },

  // Bottom sheet
  bottomSheet: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 8,
      width: 8,
    },
  },
  bsWrapper: {
    paddingHorizontal: 16,
  },
  textWrapper1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 23,
  },
  textWrapper2: {
    paddingTop: 8,
    paddingBottom: 18,
    alignItems: 'center',
  },
  imgWrapper: {
    width: 57.19,
    height: 57.19,
  },
  userWrapper: {
    flexDirection: 'row',
    paddingBottom: 28,
  },
  profileWrapper: {
    alignItems: 'center',
    paddingRight: 12,
  },

  mainText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    paddingRight: 8,
  },
  subText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  editText: {
    color: COLORS.BLUE_500,
    paddingLeft: 10,
  },

  // 마음거리 Component
  distanceWrapper: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 24,
    marginBottom: 12,
    backgroundColor: COLORS.BLUE_100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.BLUE_200,
  },
  distanceProfile: {
    width: 44,
    height: 44,
  },
  distanceText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    paddingLeft: 12,
  },
  distnaceValue: {
    fontFamily: 'Pretendard-Bold',
    color: COLORS.BLUE_500,
  },

  //Marker
  markerImg: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    borderRadius: 48,
  },
  markerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.THEME_PRIMARY,
    backgroundColor: 'rgba(68,107,255,0.25)',
  },
});

// Image
const defaultProfile = require('../../../assets/image-profile-default.png');
const ex1Profile = require('../../../assets/image-profile-ex1.png');
const ex2Profile = require('../../../assets/image-profile-ex2.png');
const addFamily = require('../../../assets/ic-add-family.png');
const ex2marker = require('../../../assets/image-marker-ex2.png');

const IcNotice = require('../../../assets/ic-bell.png');
const IcMyPage = require('../../../assets/ic-user-circle.png');

function MapScreen({ navigation, route }: MapScreenProp) {
  // const { code } = route.params;
  const [selectedCountry, setSelectedCountry] = useState(true);
  const bottomSheetRef = useRef<any>(null);

  return (
    <View style={[{ flex: 1 }]}>
      <BottomSheet
        ref={bottomSheetRef}
        hasDraggableIcon
        height={400}
        radius={25}
        style={styles.bottomSheet}
      >
        <ScrollView style={styles.bsWrapper}>
          <View style={styles.textWrapper1}>
            <Text style={styles.mainText}>가족 간 마음거리</Text>
            <Text style={styles.subText}>
              소통을 많이 할수록 원의 거리가 가까워져요
            </Text>
          </View>
          <View style={[styles.textWrapper1, styles.textWrapper2]}>
            <Text style={styles.subText}>가족 채널명</Text>
            <TouchableOpacity>
              <Text style={styles.editText}>수정 {'>'} </Text>
            </TouchableOpacity>
          </View>

          {/* Profile */}
          <View style={styles.userWrapper}>
            <View style={styles.profileWrapper}>
              <Image source={defaultProfile} style={styles.imgWrapper} />
              <Text style={styles.subText}> user1 </Text>
            </View>

            <View style={styles.profileWrapper}>
              <Image source={ex1Profile} style={styles.imgWrapper} />
              <Text style={styles.subText}> user2 </Text>
            </View>

            <View style={styles.profileWrapper}>
              <Image source={ex2Profile} style={styles.imgWrapper} />
              <Text style={styles.subText}> user3 </Text>
            </View>

            <View style={styles.profileWrapper}>
              <Pressable
                onPress={() => {
                  bottomSheetRef.current?.close();
                  navigation.navigate('GroupCodeShareFromMap');
                }}
              >
                <Image source={addFamily} style={styles.imgWrapper} />
                <Text style={[styles.subText, { color: COLORS.BLUE_500 }]}>
                  가족 추가
                </Text>
              </Pressable>
            </View>
          </View>

          {/* 마음 거리 */}
          <View style={styles.distanceWrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={defaultProfile} style={styles.distanceProfile} />
              <Text style={styles.distanceText}>user님과의 마음거리</Text>
            </View>
            <Text
              style={styles.distnaceValue}
              onPress={() => {
                bottomSheetRef.current?.close();
                navigation.navigate('MapDetail');
              }}
            >
              9999km {'>'}
            </Text>
          </View>

          <View style={styles.distanceWrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={defaultProfile} style={styles.distanceProfile} />
              <Text style={styles.distanceText}>user님과의 마음거리</Text>
            </View>
            <Text
              style={styles.distnaceValue}
              onPress={() => {
                bottomSheetRef.current?.close();
                navigation.navigate('MapDetail');
              }}
            >
              9999km {'>'}
            </Text>
          </View>
        </ScrollView>
      </BottomSheet>

      <View
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <MapView
          style={[{ width: '100%', height: '100%' }]}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 35.91395373474155,
            longitude: 127.73829440215488,
            latitudeDelta: 70,
            longitudeDelta: 70,
          }}
        >
          <Marker coordinate={{ latitude: 37.487935, longitude: 126.857758 }}>
            <View style={styles.markerCircle}>
              <Image
                source={{uri:'https://avatars.githubusercontent.com/u/98895272?s=200&v=4'}}
                style={styles.markerImg}
              />
            </View>
          </Marker>
        </MapView>
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>마음거리</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
            <Image source={IcNotice} style={styles.headerNotice} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
            <Image source={IcMyPage} style={styles.headerMyPage} />
          </TouchableOpacity>
        </View>
      </View>

      <Pressable
        style={{
          height: 68,
          backgroundColor: '#FFFFFFE6',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          alignItems: 'center',
          zIndex: 999,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
        onPress={() => bottomSheetRef.current?.show()}
      >
        <View
          style={{
            backgroundColor: COLORS.TEXT_DISABLED_GREY,
            borderRadius: 100,
            width: 76,
            height: 5,
            marginTop: 14,
          }}
        />
        <View
          style={[
            styles.textWrapper1,
            { paddingHorizontal: 18, paddingTop: 10, width: '100%'},
          ]}
        >
          <Text style={styles.mainText}>가족 간 마음거리</Text>
          <Text style={styles.subText}>
            소통을 많이 할수록 원의 거리가 가까워져요
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default MapScreen;
