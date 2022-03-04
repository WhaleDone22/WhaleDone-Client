import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
// import greetIcon from '../../../assets/greetIcon.png'

import COLORS from '../../styles/colors'

type GreetScreenProp = NativeStackScreenProps<NavigationStackParams, 'Greet'>;

// interface Btn {
//   style: StyleSheet,
//   title: String,
//   onPress: () => void,
// }

function GreetScreen({ navigation }: GreetScreenProp) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ButtonBack onPress={() => navigation.goBack()} />
        <View style={styles.container}>
          {/* <View style={layout.header}>
            <Text style={styles.mainTxt}>user1님 웨일던에서 {"\n"}가족과 더 가까워져 보세요!</Text>
          </View>

          <View style={layout.content}>
            <Image style={styles.img} source={require('../../../assets/greetIcon.png')}></Image>
            <Text style={styles.subTxt}>쉿-! 웨일던은 가족과만 {"\n"}대화할 수 있는 비밀 공간이에요 :)</Text>
          </View> */}

          
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>user1님 웨일던에서 </Text>
            <Text style={styles.title}>가족과 더 가까워져 보세요!</Text>
          </View>

          <View style={styles.contentsContainer}>
            <Image style={styles.img} source={require('../../../assets/greetIcon.png')}></Image>
            <Text style={styles.subTxt}>쉿-! 웨일던은 가족과만</Text>
            <Text style={styles.subTxt}>공유할 수 있는 비밀 공간이에요 :)</Text>
          </View>
            
          <View>
            <TouchableOpacity
              style={styles.btnNext}
              onPress={() => navigation.navigate('GroupCodeInput')}
            >
              <Text style={styles.btnNextText}>다음</Text> 
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.BLUE_300,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  textTitle: {
    fontFamily: 'Pretendard-Bold',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '600',
    color: '#fff',
  },
  textContainer: {
    marginTop: 49,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 100,
  },
    title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#fff',
    lineHeight: 34,
  },
  titleWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  
  // mainTxt: { 
  //   width: 311,
  //   height: 58,
  //   left: 10,
  //   top: 20,
  //   color: '#fff',
  //   fontFamily: 'Pretendard',
  //   fontStyle: 'normal',
  //   fontWeight: 'bold',
  //   fontSize: 20,
  //   lineHeight: 24,
  //   flexGrow: 0,
  //   margin: 10,
  // },

  contentsContainer: { 
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#446CFF',
    // paddingVertical:100,
    borderRadius: 10,
  },
  img: { 
    width: 297,
    height: 216,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 49,
    marginBottom: 15,
  },
  subTxt: {
    width: 250,
    // height: 48,
    color: '#fff',
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center'
    
  },
  btnNext : {
    backgroundColor: '#446CFF',
    paddingVertical: 17,
    marginTop: 70,
    marginBottom: 60,
    top: 5,
    color: 'white',
    borderRadius: 5,
  },
  btnNextText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    lineHeight: 19,
  },
});

export default GreetScreen;



