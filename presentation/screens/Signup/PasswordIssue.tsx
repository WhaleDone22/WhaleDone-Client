import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonNext from '../../components/ButtonNext';
import COLORS from '../../styles/colors';
import { commonStyles } from '../../styles/common';

type PasswordIssueScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'PasswordIssue'
>;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: COLORS.GREY_060,
    marginBottom: 48,
  },
});

function PasswordIssueScreen({ navigation, route }: PasswordIssueScreenProp) {
  const { phoneNumber } = route.params;

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.titleWrapper}>
        <Text style={commonStyles.title}>비밀번호 재설정 완료</Text>
      </View>
      <View>
        <Text style={styles.text}>
          {phoneNumber}으로 새 비밀번호가 전송되었습니다.{'\n'}
          &apos;다음&apos; 버튼을 눌러 로그인을 진행해 주세요.
        </Text>
      </View>
      <ButtonNext
        onPress={() => navigation.navigate('Login')}
        content="다음"
        isActivated
      />
    </SafeAreaView>
  );
}

export default PasswordIssueScreen;
