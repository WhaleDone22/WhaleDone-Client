import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState, useRef } from 'react';
import { Text, Image, StyleSheet, View, Platform, Dimensions } from 'react-native';
import { TouchableOpacity, ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import { commonStyles } from '../../styles/common';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import COLORS from '../../styles/colors';

type MapScreenProp = NativeStackScreenProps<NavigationStackParams, 'Map'>;

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 59,
    left: 26,
  },
  headerTitle: {
    position: 'absolute',
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    // marginStart: 8,   
    // marginRight: 190,
  },
  headerNotice: {
    position: 'absolute',
    width: 24,
    height: 24,
    left: 295,
  },
  headerMyPage: {
    position: 'absolute',
    width: 24,
    height: 24,
    left: 335,
  },

  //
  countryCodeSelectorTitleText: {
    position: 'absolute',
    marginTop: 66,
    marginStart: 26,
    marginBottom: 40,
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
  // countryCodeSelectorWrapper: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   paddingHorizontal: 26,
  //   paddingVertical: 20,
  //   alignItems: 'center',
  // },
  button: {
    position: 'absolute',
    height: 50,
    width: 150,
    backgroundColor: "red",
    color: 'blue',
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 20,
    left: 0,
    top: 500,
    right: 0,
  },
  



  // Bottom sheet
  bottomSheet:{
    shadowColor: "#000",
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
    // justifyContent: 'center',
    paddingLeft: 14,
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
    paddingRight: 110, //49.5
    paddingLeft: 12,
  },
  distnaceValue: {
    fontFamily: 'Pretendard-Bold',
    color: COLORS.BLUE_500,
  },
})

// Image
const defaultProfile = require('../../../assets/image-profile-default.png')
const ex1Profile = require('../../../assets/image-profile-ex1.png')
const ex2Profile = require('../../../assets/image-profile-ex2.png')
const addFamily = require('../../../assets/ic-add-family.png')


const IcNotice = require('../../../assets/ic-bell.png');
const IcMyPage = require('../../../assets/ic-user-circle.png'); 

function MapScreen({ navigation }: MapScreenProp) {
  const [isBottomSheetOpened, setIsBottomSheetOpened] = useState(false)
  const bottomSheetRef = useRef<any>(null);

  useEffect(() => {
    // bottomSheetRef.current?.show()
    if(isBottomSheetOpened){
      bottomSheetRef.current?.show()
    }
  }, [isBottomSheetOpened])
  

  return (
    <View>
      {/* Bottom Sheet */}
      <BottomSheet ref={bottomSheetRef} hasDraggableIcon snapPoints={[200]} height={400} radius={25} style={styles.bottomSheet}>
        <ScrollView style={styles.bsWrapper}>

          {/* Text */}
          <View style={styles.textWrapper1}>
            <Text style={styles.mainText}>가족 간 마음거리</Text>
            <Text style={styles.subText}>소통을 많이 할수록 원의 거리가 가까워져요</Text>
          </View>

          <View style={[styles.textWrapper1, styles.textWrapper2]}>
            <Text style={styles.subText}>가족 채널명</Text>
            <TouchableOpacity>
              <Text style={styles.editText}>수정 > </Text>
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
              <TouchableOpacity onPress={() => navigation.navigate('MapDetail')}>
                <Image source={addFamily} style={styles.imgWrapper} />
                <Text style={[styles.subText, { color: COLORS.BLUE_500}]}> 가족 추가 </Text>
              </TouchableOpacity>
            </View>
          </View>


          {/* 마음 거리 */}
          <View style={styles.distanceWrapper}>
            <Image source={defaultProfile} style={styles.distanceProfile} />
            <Text style={styles.distanceText}>user님과의 마음거리</Text>
            <Text style={styles.distnaceValue} onPress={() => navigation.navigate('MapDetail')}>9999km > </Text>
          </View>

          <View style={styles.distanceWrapper}>
            <Image source={defaultProfile} style={styles.distanceProfile} />
            <Text style={styles.distanceText}>user님과의 마음거리</Text>
            <Text style={styles.distnaceValue}>9999km > </Text>
          </View>
        </ScrollView>
      </BottomSheet>


        {/* onPress 왜안돼요ㅠㅠㅠㅠㅠㅠㅠㅠㅠ */}
        <TouchableOpacity style={styles.button} onPress={() => {bottomSheetRef.current?.show(); console.log('press'); setIsBottomSheetOpened(true)}}>
          <Text>버튼버튼버튼버튼버튼버튼버튼버튼</Text> 
        </TouchableOpacity>




      <View style={{ width: '100%', height: '100%'}}>
        {/* Google Map */}
        <MapView 
          style={{ width: '100%', height: '100%'}} 
          provider={PROVIDER_GOOGLE}
          initialRegion={{ latitude: 35.91395373474155, longitude: 127.73829440215488, latitudeDelta: 80, longitudeDelta: 80,}} 
        />
        

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>마음거리</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
            <Image source={IcNotice} style={styles.headerNotice}></Image>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
            <Image source={IcMyPage} style={styles.headerMyPage} ></Image>
          </TouchableOpacity>
        </View>


        
      </View>


      {/* <Text onPress={() => navigation.navigate('MapDetail')}>상세 보기</Text> */}
    </View>
  );
}
// 2B:72:F1:EE:17:E6:4A:45:F3:9E:F3:30:25:A6:12:5A:BF:79:A6:40
export default MapScreen;
