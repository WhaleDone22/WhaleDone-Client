import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import COLORS from '../../styles/colors';
import { commonStyles } from '../../styles/common';

type EditProfileScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'EditProfile'
>;

const styles = StyleSheet.create({
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
  saveText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  saveTextDisabled: {
    color: COLORS.TEXT_DISABLED_GREY,
  },
  saveTextEnabled: {
    color: COLORS.BLUE_500,
  },
});

function EditProfileScreen({ navigation }: EditProfileScreenProp) {
  const [isSaveable, setIsSaveable] = useState(false);
  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <ButtonBack onPress={() => navigation.goBack()} />
      <View style={styles.headerContainer}>
        <ButtonBack onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>마이페이지 수정</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          disabled={!isSaveable}
        >
          <Text
            style={[
              styles.saveText,
              isSaveable ? styles.saveTextEnabled : styles.saveTextDisabled,
            ]}
          >
            저장
          </Text>
        </TouchableOpacity>
      </View>
      {/* content */}
      <Text>TAT</Text>
    </SafeAreaView>
  );
}

export default EditProfileScreen;
