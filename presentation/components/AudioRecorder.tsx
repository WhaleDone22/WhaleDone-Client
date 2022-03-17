import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import COLORS from '../styles/colors';

type AudioRecorderProps = {
  setReactionMode: () => void;
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: 'center', paddingTop: 20 },
  upperText: {
    color: COLORS.THEME_PRIMARY,
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    marginEnd: 10,
  },
  imageClose: { width: 24, height: 24 },
  imageButton: { width: 36, height: 36 },
  pressableButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.THEME_PRIMARY,
    justifyContent: 'center',
    marginBottom: 12,
    alignItems: 'center',
  },
  timerWrapper: {
    flex: 1,
    backgroundColor: COLORS.BLUE_100,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 22,
    marginBottom: 20,
  },
  timerText: {
    fontFamily: 'Inter_200ExtraLight',
    color: COLORS.THEME_PRIMARY,
    fontSize: 66,
  },
});

const IcClose = require('../../assets/ic-close.png');
const IcRecordPause = require('../../assets/ic-record-pause.png');
const IcRecordSend = require('../../assets/ic-record-send.png');
const IcRecordStart = require('../../assets/ic-record-start.png');

function AudioRecorder(props: AudioRecorderProps) {
  const { setReactionMode } = props;
  const [recordStatus, setRecordStatus] = useState<
    'idle' | 'recording' | 'finished'
  >('idle');
  const messageByRecordStatus = {
    idle: '음성메시지 보내기',
    recording: '음성 메시지 입력 중',
    finished: '음성 메시지 저장 완료',
  };
  const iconByRecordStatus = {
    idle: IcRecordStart,
    recording: IcRecordPause,
    finished: IcRecordSend,
  };
  const [seconds, setSeconds] = useState(0);

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Text style={styles.upperText}>
          {messageByRecordStatus[recordStatus]}
        </Text>
        {recordStatus === 'recording' && (
          <View
            style={{
              backgroundColor: COLORS.THEME_NEGATIVE,
              width: 8,
              height: 8,
              borderRadius: 4,
            }}
          />
        )}
      </View>
      <Pressable
        style={{ position: 'absolute', top: 16, right: 16 }}
        onPress={setReactionMode}
      >
        <Image source={IcClose} style={styles.imageClose} />
      </Pressable>
      <View style={styles.timerWrapper}>
        <Text style={styles.timerText}>{`${(seconds / 60)
          .toString()
          .padStart(2, '0')}:${(seconds % 60)
          .toString()
          .padStart(2, '0')}`}</Text>
      </View>
      <Pressable
        style={styles.pressableButton}
        onPress={() =>
          setRecordStatus((prev) => {
            switch (prev) {
              case 'idle':
                return 'recording';
              case 'recording':
              case 'finished':
              default:
                return 'finished';
            }
          })
        }
      >
        <Image
          source={iconByRecordStatus[recordStatus]}
          style={styles.imageButton}
        />
      </Pressable>
    </View>
  );
}

export default AudioRecorder;
