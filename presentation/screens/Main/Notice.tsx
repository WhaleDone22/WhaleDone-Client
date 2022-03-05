import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../../infrastructures/api';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import { Notice } from '../../../infrastructures/types/notice';
import ButtonBack from '../../components/ButtonBack';
import NoticesPerDay from '../../components/NoticesPerDay';
import COLORS from '../../styles/colors';
import { commonStyles } from '../../styles/common';

type NoticeScreenProp = NativeStackScreenProps<NavigationStackParams, 'Notice'>;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerText: {
    color: COLORS.TEXT_PRIMARY,
    marginStart: 8,
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
  },
});

function NoticeScreen({ navigation }: NoticeScreenProp) {
  const [data, setData] = useState<{ date: string; notices: Notice[] }[]>([]);

  useEffect(() => {
    api.noticeService.getAllNotice().then((response) => setData(response));
  }, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
        <View>
          <View style={styles.headerContainer}>
            <ButtonBack onPress={() => navigation.goBack()} />
            <Text style={styles.headerText}>알림</Text>
          </View>
        </View>
        {data.map((notice) => (
          <NoticesPerDay key={notice.date} {...notice} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default NoticeScreen;
