import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import COLORS from '../../styles/colors';

const logoWithTitle = require('../../../assets/logo-with-text.png');

type SignUpMainScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'SignUpMain'
>;
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: height * 0.31,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {
    width: 162,
    height: 130,
  },
  infoText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 28,
  },
  signUpButton: {
    backgroundColor: COLORS.BLUE_500,
    paddingVertical: 16,
    borderRadius: 5,
    textAlign: 'center',
    width: '100%',
    marginTop: height * 0.13,
  },
  signUpButtonText: {
    color: 'white',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  signInContainer: {
    marginTop: 17,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  signInText: {
    fontFamily: 'Pretendard',
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
    marginRight: 8,
  },
  signInButton: {
    fontFamily: 'Pretendard-Bold',
    color: COLORS.BLUE_500,
    borderBottomColor: COLORS.BLUE_500,
    borderBottomWidth: 2,
  },
});

function SignUpMainScreen({ navigation }: SignUpMainScreenProp) {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logoWithTitle} style={styles.logoImage} />
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: height * 0.03,
        }}
      >
        <Text style={styles.infoText}>
          가족간 마음거리를 더 가깝게{'\n'}연결하는 소통서비스
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('PhoneInput')}
          style={styles.signUpButton}
        >
          <Text style={styles.signUpButtonText}>시작하기</Text>
        </TouchableOpacity>
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>이미 계정이 있으신가요?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInButton}>로그인 하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignUpMainScreen;
