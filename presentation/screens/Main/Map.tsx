import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  Pressable,
  Platform,
} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { privateAPI } from '../../../infrastructures/api/remote/base';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import { getCircleSize } from '../../../infrastructures/utils/circles';
import { getDistance } from '../../../infrastructures/utils/distances';

import COLORS from '../../styles/colors';
import { FamilyProfile } from '../../../infrastructures/types/map';

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
    borderRadius: 30,
  },
  userWrapper: {
    flexDirection: 'row',
    paddingBottom: 28,
    paddingTop: 22,
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
    borderRadius: 22,
  },
  distanceText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    paddingLeft: 12,
  },
  distanceValue: {
    fontFamily: 'Pretendard-Bold',
    color: COLORS.BLUE_500,
  },

  // Marker
  markerImg: {
    width: 48,
    height: 48,
    resizeMode: 'cover',
    borderRadius: 48,
    backgroundColor: COLORS.BLUE_200,
    borderColor: 'white',
    borderWidth: 2,
  },
  markerShadowView: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  markerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerCircleSelected: {
    borderWidth: 1,
    borderColor: COLORS.THEME_PRIMARY,
    backgroundColor: 'rgba(68,107,255,0.25)',
  },
});

const addFamily = require('../../../assets/ic-add-family.png');
const IcNotice = require('../../../assets/ic-bell.png');
const IcMyPage = require('../../../assets/ic-user-circle.png');

function MapScreen({ navigation }: MapScreenProp) {
  const bottomSheetRef = useRef<any>(null);
  const [familyProfile, setFamilyProfile] = useState<FamilyProfile[]>([]);
  const [myNickName, setMyNickName] = useState('');
  const [myCommunicationCnt, setMyCommunicationCnt] = useState(0);
  const [userID, setUserID] = useState<number | undefined>(undefined);
  const [selectedFamilyID, setSelectedFamilyID] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    AsyncStorage.getItem('userID').then((id) => {
      if (!id) return;
      setUserID(+id);
      {familyProfile?.map((family) => 
        {if (userID === family.id) {
          setMyNickName(family.nickName);
          setMyCommunicationCnt(family.communicationCount);
        }}
        )}
    });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('familyID').then((familyID) => {
      if (!familyID) return;
      privateAPI
        .get({ url: `api/v1/families/${familyID}/users` })
        .then((response) => {
          if (response.responseSuccess) {
            setFamilyProfile(response.multipleData);
          } else {
            // 여기서 에러 띄우기
          }
        })
        .catch((/* error */) => {
          // 여기서도 에러 띄우기
        });
    });
  }, []);

  const shouldHightlightMarker = (familyID: number) => {
    if (selectedFamilyID === undefined) return false;
    if (selectedFamilyID === userID) return false;
    if (familyID === userID) return true;
    if (familyID === selectedFamilyID) return true;
    return false;
  };

  return (
    <View style={[{ flex: 1 }]}>
      <BottomSheet
        ref={bottomSheetRef}
        hasDraggableIcon
        height={400}
        radius={25}
        style={styles.bottomSheet}
      >
        <Pressable>
          <View>
            <ScrollView style={styles.bsWrapper}>
              <View style={styles.textWrapper1}>
                <Text style={styles.mainText}>가족 간 마음거리</Text>
                <Text style={styles.subText}>
                  소통을 많이 할수록 원의 거리가 가까워져요
                </Text>
              </View>
              <View style={[styles.textWrapper1, styles.textWrapper2]}>
                <Text style={styles.subText}>가족 채널명</Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate('EditProfile', { nickname: myNickName })
                  }
                >
                  <Text style={styles.editText}>수정 {'>'} </Text>
                </Pressable>
              </View>

              {/* Profile */}
              <View style={styles.userWrapper}>
              {/* 가족 프로필이미지 가로 스크롤뷰 */}
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                {familyProfile
                  ?.filter((family) => family.id !== userID)
                  .map((family) => (
                    <Pressable
                      style={styles.profileWrapper}
                      key={family.id}
                      onPress={() => {
                        bottomSheetRef.current?.close();
                        setSelectedFamilyID(family.id);
                      }}
                    >
                      <Image
                        source={{ uri: family.profileImgUrl }}
                        style={styles.imgWrapper}
                      />
                      <Text style={styles.subText}>{family.nickName}</Text>
                    </Pressable>
                  ))}

                <View style={styles.profileWrapper}>
                  <Pressable
                    onPress={() => {
                      bottomSheetRef.current?.close();
                      navigation.navigate('GroupCodeReissue');
                    }}
                  >
                    <Image source={addFamily} style={styles.imgWrapper} />
                    <Text style={[styles.subText, { color: COLORS.BLUE_500 }]}>
                      가족 추가
                    </Text>
                  </Pressable>
                </View>
              </ScrollView>
              </View>

              {/* 마음 거리 */}
              {familyProfile
                ?.filter((family) => family.id !== userID)
                .map((family) => (
                  <View style={styles.distanceWrapper} key={family.id}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Image
                        source={{ uri: family.profileImgUrl }}
                        style={styles.distanceProfile}
                      />
                      <Text style={styles.distanceText}>
                        {family.nickName}님과의 마음거리
                      </Text>
                    </View>
                    <Text
                      style={styles.distanceValue}
                      onPress={() => {
                        bottomSheetRef.current?.close();
                        navigation.navigate('MapDetail', {
                          nickname: family.nickName,
                          profileImgUrl: family.profileImgUrl,
                          heartDistance: getDistance(family.communicationCount),
                        });
                      }}
                    >
                      {getDistance(family.communicationCount)}km {'>'}
                    </Text>
                  </View>
                  <Text
                    style={styles.distanceValue}
                    onPress={() => {
                      bottomSheetRef.current?.close();
                      navigation.navigate('MapDetail', {
                        nickname: family.nickName,
                        profileImgUrl: family.profileImgUrl,
                        familyDistance: getDistance(family.communicationCount),
                        myDistance: getDistance(myCommunicationCnt),
                      });
                    }}
                  >
                    {getDistance(family.communicationCount) +
                      getDistance(myCommunicationCnt)}
                    km {'>'}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </Pressable>
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
          initialRegion={{
            latitude: 31.487935,
            longitude: 126.857758,
            latitudeDelta: 70,
            longitudeDelta: 70,
          }}
          onPress={() => setSelectedFamilyID(undefined)}
        >
          {familyProfile?.map((family) => (
            <View key={family.id}>
              <Marker
                coordinate={{
                  latitude: family.latitude - family.id * 0.000001,
                  longitude: family.longitude,
                }}
                onPress={(e) => {
                  e.stopPropagation();
                  setSelectedFamilyID(family.id);
                }}
              >
                <View
                  style={[
                    styles.markerCircle,
                    {
                      width: getCircleSize(family.communicationCount),
                      height: getCircleSize(family.communicationCount),
                      borderRadius: getCircleSize(family.communicationCount),
                    },
                    shouldHightlightMarker(family.id) &&
                      styles.markerCircleSelected,
                  ]}
                >
                  <View style={styles.markerShadowView}>
                    <Image
                      source={{
                        uri: family.profileImgUrl,
                      }}
                      style={styles.markerImg}
                    />
                  </View>
                </View>
              </Marker>
            </View>
          ))}
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
            { paddingHorizontal: 18, paddingTop: 10, width: '100%' },
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
