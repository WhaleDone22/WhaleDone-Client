import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
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

const ImgEmptyAlarm = require('../../../assets/img-empty-alarm.png');

function NoticeScreen({ navigation }: NoticeScreenProp) {
  const [data, setData] = useState<{ date: string; notices: Notice[] }[]>([]);

  useEffect(() => {
    api.noticeService.getAllNotice().then((response) => setData(response));
  }, []);

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          <View style={styles.headerContainer}>
            <ButtonBack onPress={() => navigation.goBack()} />
            <Text style={styles.headerText}>알림</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {data.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={ImgEmptyAlarm}
                style={{ width: 255, height: 185 }}
              />
              <Pressable
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 17,
                  backgroundColor: COLORS.BLUE_500,
                  borderRadius: 5,
                  position: 'absolute',
                  bottom: 24,
                  width: '90%',
                  right: '5%',
                  left: '5%',
                }}
                onPress={() => navigation.navigate('Home')}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Pretendard-Bold',
                    color: 'white',
                  }}
                >
                  일상 공유하고 리액션 받기
                </Text>
              </Pressable>
            </View>
          ) : (
            data.map((notice) => (
              <NoticesPerDay key={notice.date} {...notice} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default NoticeScreen;
