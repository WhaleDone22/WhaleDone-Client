import React, { useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  Modal,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import * as Analytics from 'expo-firebase-analytics';
import Toast from 'react-native-easy-toast';
import BottomSheet from '../../../custom-modules/react-native-getsture-bottom-sheet';
import ButtonBack from '../../components/ButtonBack';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonNext from '../../components/ButtonNext';
import COLORS from '../../styles/colors';
import { Country } from '../../../infrastructures/types/country';
import { commonStyles } from '../../styles/common';
import { publicAPI } from '../../../infrastructures/api/remote/base';

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
const icCloseTerms = require('../../../assets/ic-close-terms.png');

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
    marginHorizontal: 18,
    paddingHorizontal: 8,
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomColor: COLORS.GREY_020,
    borderBottomWidth: 1,
  },
  countryCodeSelectorWrapperSelecting: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 18,
    paddingHorizontal: 8,
    paddingVertical: 20,
    alignItems: 'center',
  },
  countryCodeCountryNameText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  countryCodeCountryNameTextSelecting: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    color: 'white',
  },
  countryCodeCountryCodeText: {
    fontFamily: 'Pretendard',
    marginStart: 5,
  },
  countryCodeCountryCodeTextSelecting: {
    fontFamily: 'Pretendard',
    marginStart: 5,
    color: 'white',
  },
});

function PhoneInputScreen({ navigation, route }: PhoneInputScreenProp) {
  const [selectedCountry, setSelectedCountry] = useState('KR');
  const [phone, setPhone] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [alertChecked, setAlertChecked] = useState(false);
  const [termsOpened, setTermsOpened] = useState(false);
  const [policyOpened, setPolicyOpened] = useState(false);
  const bottomSheetRef = useRef<any>(null);
  const toastRef = useRef<Toast>(null);
  const [selectingCountry, setSelectingCountry] = useState<string | null>(null);
  const routeParams = route.params;

  const postPhoneAuthForPwChange = () => {
    if (phone === '') return;
    Analytics.logEvent('send_phone_info', {
      screen: 'phone_input',
    });
    publicAPI
      .post({
        url: 'api/v1/sms/code',
        data: {
          countryCode:
            countryCodeWithTelNumber.find(
              (country: Country) => country.countryCode === selectedCountry,
            )?.countryPhoneNumber ?? '',
          recipientPhoneNumber: phone.replaceAll('-', ''),
          smsType: 'PW',
        },
      })
      .then((response) => {
        if (response.responseSuccess && response.code === 'SUCCESS') {
          navigation.navigate('PhoneAuth', {
            phoneNumber: phone,
            countryCode: selectedCountry,
            forPassword: true,
          });
        } else {
          toastRef.current?.show(response.message ?? '다시 시도해주세요');
        }
      });
  };

  const postPhoneAuth = () => {
    if (phone === '') return;
    Analytics.logEvent('send_phone_info', {
      screen: 'phone_input',
    });
    publicAPI
      .post({
        url: 'api/v1/sms/code',
        data: {
          countryCode:
            countryCodeWithTelNumber.find(
              (country: Country) => country.countryCode === selectedCountry,
            )?.countryPhoneNumber ?? '',
          recipientPhoneNumber: phone.replaceAll('-', ''),
          smsType: 'SIGNUP',
        },
      })
      .then((response) => {
        if (response.responseSuccess && response.code === 'SUCCESS') {
          navigation.navigate('PhoneAuth', {
            phoneNumber: phone,
            countryCode: selectedCountry,
            alarmStatus: alertChecked,
          });
        } else {
          toastRef.current?.show(response.message ?? '다시 시도해주세요');
        }
      });
  };

  const sendSms = () => {
    if (routeParams?.forPassword) {
      postPhoneAuthForPwChange();
    } else {
      postPhoneAuth();
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <BottomSheet
        sheetBackgroundColor="#FFFFFF"
        ref={bottomSheetRef}
        height={height - 93}
        draggable
        hasDraggableIcon
        dragIconStyle={{ width: 76 }}
      >
        <ScrollView style={{}}>
          <Text style={styles.countryCodeSelectorTitleText}>국가 코드</Text>
          {countryCodeWithTelNumber.map((country) =>
            countryServiceActive.includes(country.countryCode) ? (
              <TouchableHighlight
                onPress={() => {
                  setSelectedCountry(country.countryCode);
                  bottomSheetRef.current?.close();
                  Analytics.logEvent('close_country_sheet', {
                    screen: 'phone_input',
                    label: 'select_country',
                  });
                }}
                key={country.countryCode}
                underlayColor={COLORS.BLUE_500}
                onPressIn={() => setSelectingCountry(country.countryCode)}
                onPressOut={() => setSelectingCountry(null)}
              >
                <View
                  style={
                    selectingCountry === country.countryCode
                      ? styles.countryCodeSelectorWrapperSelecting
                      : styles.countryCodeSelectorWrapper
                  }
                >
                  <Text
                    style={
                      selectingCountry === country.countryCode
                        ? styles.countryCodeCountryNameTextSelecting
                        : styles.countryCodeCountryNameText
                    }
                  >
                    {country.countryNameKR}
                  </Text>
                  <Text
                    style={
                      selectingCountry === country.countryCode
                        ? styles.countryCodeCountryCodeTextSelecting
                        : styles.countryCodeCountryCodeText
                    }
                  >
                    +{country.countryPhoneNumber}
                  </Text>
                </View>
              </TouchableHighlight>
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
          onPress={() => {
            bottomSheetRef.current?.show();
            Analytics.logEvent('open_country_sheet', { screen: 'phone_input' });
          }}
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
          maxLength={15}
        />
      </View>
      {routeParams?.forPassword !== true && (
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
              style={{
                borderBottomColor: COLORS.BLUE_500,
                borderBottomWidth: 1,
              }}
              onPress={() => setTermsOpened(true)}
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
              style={{
                borderBottomColor: COLORS.BLUE_500,
                borderBottomWidth: 1,
              }}
              onPress={() => setPolicyOpened(true)}
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
              서비스 알람 수신에 동의합니다. (선택)
            </Text>
          </View>
        </View>
      )}
      <View style={{ marginTop: 22 }}>
        <ButtonNext
          onPress={sendSms}
          isActivated={
            phone !== '' &&
            selectedCountry !== null &&
            (termsChecked || routeParams?.forPassword === true)
          }
        />
      </View>
      <Modal
        transparent
        visible={termsOpened}
        onRequestClose={() => {
          setTermsOpened(false);
        }}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={() => {
            setTermsOpened(false);
          }}
        >
          <Pressable
            style={{ width: '96%', height: 500, borderRadius: 20 }}
            onPress={() => {}}
          >
            <WebView
              automaticallyAdjustContentInsets={false}
              source={{
                uri: 'https://whaledone.notion.site/a2748049efa04450a091964ea2e5985b',
              }}
              style={{ borderRadius: 12 }}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setTermsOpened(false);
            }}
            style={{ position: 'absolute', bottom: 40 }}
          >
            <Image source={icCloseTerms} style={{ width: 24, height: 24 }} />
          </Pressable>
        </Pressable>
      </Modal>
      <Modal
        transparent
        visible={policyOpened}
        onRequestClose={() => {
          setPolicyOpened(false);
        }}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={() => {
            setPolicyOpened(false);
          }}
        >
          <Pressable
            style={{ width: '96%', height: 500, borderRadius: 20 }}
            onPress={() => {}}
          >
            <WebView
              automaticallyAdjustContentInsets={false}
              source={{
                uri: 'https://whaledone.notion.site/3cbfb15005f345d6ab924dd22935e5d3',
              }}
              style={{ borderRadius: 12 }}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setPolicyOpened(false);
            }}
            style={{ position: 'absolute', bottom: 70 }}
          >
            <Image source={icCloseTerms} style={{ width: 24, height: 24 }} />
          </Pressable>
        </Pressable>
      </Modal>
      <Toast
        ref={toastRef}
        position="bottom"
        fadeInDuration={200}
        fadeOutDuration={1000}
      />
    </SafeAreaView>
  );
}

export default PhoneInputScreen;
