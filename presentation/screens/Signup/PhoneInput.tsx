import React, { useRef, useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonBack from '../../components/ButtonBack';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonNext from '../../components/ButtonNext';
import COLORS from '../../styles/colors';
import { Country } from '../../../infrastructures/types/country';
import { commonStyles } from '../../styles/common';


type PhoneInputScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'PhoneInput'
>;

const countryCodeWithEmoji = require('../../../infrastructures/data/countryCodeWithEmoji.json');
const countryCodeWithTelNumber: Country[] = require('../../../infrastructures/data/countryCodeWithTelNumber.json');
const countryServiceActive: string[] = require('../../../infrastructures/data/serviceActiveCountries.json');
const icToggleDown = require('../../../assets/ic-toggle-down.png');
const icCheckboxCheckedTrue = require('../../../assets/ic-checkbox-checked-true.png');
const icCheckboxCheckedFalse = require('../../../assets/ic-checkbox-checked-false.png');

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  countryInfoContainer: {
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    width: 99,
    left: 16,
    top: 0,
    zIndex: 100,
  },
  countryCodeText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    marginStart: 5,
  },
  countryCodeSelectorContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 2,
  },
  countryFlagText: {
    fontSize: Platform.OS === 'ios' ? 24 : 18,
  },
  textInput: {
    paddingStart: 116,
    paddingEnd: 16,
    paddingVertical: 18,
    borderRadius: 5,
    backgroundColor: COLORS.GREY_030,
    marginBottom: 12,
    height: 60,
    fontSize: 16,
    borderColor: 'transparent',
  },
  countryCodeSelectorTitleText: {
    marginTop: 66,
    marginStart: 26,
    marginBottom: 40,
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
  countryCodeSelectorWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 26,
    paddingVertical: 20,
    alignItems: 'center',
  },
  countryCodeCountryNameText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  countryCodeCountryCodeText: {
    fontFamily: 'Pretendard',
    marginStart: 5,
  },
});

function PhoneInputScreen({ navigation }: PhoneInputScreenProp) {
  const [selectedCountry, setSelectedCountry] = useState('KR');
  const [phone, setPhone] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [alertChecked, setAlertChecked] = useState(false);
  const bottomSheetRef = useRef<any>(null);
  const [userState, setUserState] = useState<{
    isLoggedIn: boolean;
  }>({
    isLoggedIn: false,
  });

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      setUserState((prev) => ({ ...prev, isLoggedIn: token !== null }));
    });
  }, []);
  return (
    <SafeAreaView style={commonStyles.container}>
      <BottomSheet ref={bottomSheetRef} snapPoints={[700]} height={height - 93}>
        <ScrollView>
          <Text style={styles.countryCodeSelectorTitleText}>국가 코드</Text>
          {countryCodeWithTelNumber.map((country) =>
            countryServiceActive.includes(country.countryCode) ? (
              <TouchableOpacity
                onPress={() => {
                  setSelectedCountry(country.countryCode);
                  bottomSheetRef.current?.close();
                }}
                key={country.countryCode}
                style={styles.countryCodeSelectorWrapper}
              >
                <Text style={styles.countryCodeCountryNameText}>
                  {country.countryNameKR}
                </Text>
                <Text style={styles.countryCodeCountryCodeText}>
                  +{country.countryPhoneNumber}
                </Text>
              </TouchableOpacity>
            ) : undefined,
          )}
        </ScrollView>
      </BottomSheet>
      <ButtonBack onPress={() => navigation.goBack()} />
      <View style={commonStyles.titleWrapper}>
        <Text style={[commonStyles.title, { marginBottom: 12 }]}>
          번호를 입력하세요
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.countryInfoContainer}
          onPress={() => bottomSheetRef.current?.show()}
        >
          <Text style={styles.countryFlagText}>
            {countryCodeWithEmoji[selectedCountry]}
          </Text>
          <Text style={styles.countryCodeText}>
            +
            {countryCodeWithTelNumber.find(
              (country: Country) => country.countryCode === selectedCountry,
            )?.countryPhoneNumber ?? ''}
          </Text>
          <Image source={icToggleDown} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <TextInput
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={styles.textInput}
          placeholder="010-0000-0000"
          placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
          keyboardType="number-pad"
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <TouchableOpacity onPress={() => setTermsChecked((prev) => !prev)}>
            <Image
              source={
                termsChecked ? icCheckboxCheckedTrue : icCheckboxCheckedFalse
              }
              style={{ width: 16, height: 16, marginRight: 16 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderBottomColor: COLORS.BLUE_500, borderBottomWidth: 1 }}
          >
            <Text
              style={{
                fontFamily: 'Pretendard',
                color: COLORS.BLUE_500,
                fontSize: 12,
              }}
            >
              개인정보처리방침
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Pretendard',
              color: COLORS.TEXT_SECONDARY,
              fontSize: 12,
            }}
          >
            {' '}
            및{' '}
          </Text>
          <TouchableOpacity
            style={{ borderBottomColor: COLORS.BLUE_500, borderBottomWidth: 1 }}
          >
            <Text
              style={{
                fontFamily: 'Pretendard',
                color: COLORS.BLUE_500,
                fontSize: 12,
              }}
            >
              서비스 이용약관
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Pretendard',
              color: COLORS.TEXT_SECONDARY,
              fontSize: 12,
            }}
          >
            에 동의합니다.
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setAlertChecked((prev) => !prev)}>
            <Image
              source={
                alertChecked ? icCheckboxCheckedTrue : icCheckboxCheckedFalse
              }
              style={{ width: 16, height: 16, marginRight: 16 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Pretendard',
              color: COLORS.TEXT_SECONDARY,
              fontSize: 12,
            }}
          >
            서비스 알람 수신에 동의합니다.(선택)
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 22 }}>
        <ButtonNext
          onPress={() => navigation.navigate('PhoneAuth')}
          isActivated={phone !== '' && selectedCountry !== null && termsChecked}
        />
      </View>
    </SafeAreaView>
  );
}

export default PhoneInputScreen;
