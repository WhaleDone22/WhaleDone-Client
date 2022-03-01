import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationActions, StackActions } from 'react-navigation';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import ButtonNext from '../../components/ButtonNext';
import COLORS from '../../styles/colors';

const icPasswordVisibleTrue = require('../../../assets/ic-password-visible-true.png');
const icPasswordVisibleFalse = require('../../../assets/ic-password-visible-false.png');

type LoginScreenProp = NativeStackScreenProps<NavigationStackParams, 'Login'>;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    marginTop: 20,
    marginBottom: 32,
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 5,
    backgroundColor: COLORS.GREY_030,
    marginBottom: 12,
    fontSize: 16,
    borderColor: 'transparent',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  eyeIcon: {
    height: 24,
    width: 24,
  },
});

function LoginScreen({ navigation }: LoginScreenProp) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text style={styles.title}>이메일과 비밀번호를 입력하세요</Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.textInput}
        placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
        placeholder="이메일을 입력하세요"
        autoFocus
      />
      <View style={{ marginBottom: 48 }}>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.textInput}
          placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry={isPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible((prev) => !prev)}
          style={styles.eyeIconContainer}
        >
          <Image
            source={
              isPasswordVisible ? icPasswordVisibleFalse : icPasswordVisibleTrue
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <ButtonNext
        onPress={() =>
          navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Main' })],
            }),
          )
        }
        isActivated
      />
    </SafeAreaView>
  );
}

export default LoginScreen;