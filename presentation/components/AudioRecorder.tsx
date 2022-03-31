import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import COLORS from '../styles/colors';

type AudioRecorderProps = {
  setReactionMode: () => void;
  sendRecordReaction: (recordPath: string) => void;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
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
    marginBottom: 32,
    alignItems: 'center',
  },
  timerWrapper: {
    flex: 1,
    backgroundColor: COLORS.BLUE_100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 20,
    width: '100%',
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
  const { setReactionMode, sendRecordReaction } = props;
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioURI, setAudioURI] = useState<string | null>(null);

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
  const [displaySeconds, setDisplaySeconds] = useState(0);

  const uploadRecord = async (recordPath: string) => {
    const formData = new FormData();

    formData.append('multipartFile', {
      uri: recordPath, // 에러 표시되지만 잘 작동합니다.
      name: recordPath.split('/').pop(),
      type: `audio/${recordPath.split('.').pop()}`,
    });
    const myToken = await AsyncStorage.getItem('token');
    if (!myToken) return;

    const uploadRequest = await fetch(
      'http://ec2-3-37-42-113.ap-northeast-2.compute.amazonaws.com:8080/api/v1/content',
      {
        method: 'POST',
        body: formData,
        headers: { 'X-AUTH-TOKEN': myToken },
      },
    );

    const uploadResponse = await uploadRequest.json();

    if (typeof uploadResponse.singleData.url === 'string') {
      sendRecordReaction(uploadResponse.singleData.url);
    }
  };

  const startRecord = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording: AudioRecording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      setRecording(AudioRecording);
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecord = async () => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const recordingURI = recording.getURI();
    setAudioURI(recordingURI);
    setRecording(null);
    if (!recordingURI) return;
    uploadRecord(recordingURI);
  };

  useEffect(() => {
    let recordDuration: NodeJS.Timer | undefined;
    if (recordStatus === 'recording') {
      recordDuration = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= 60) {
            setRecordStatus('finished');
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      startRecord();
    }
    if (recordStatus === 'finished') {
      setDisplaySeconds(60);
      stopRecord();
    }
    return () => {
      if (recordDuration) clearInterval(recordDuration);
    };
  }, [recordStatus]);

  useEffect(() => {
    setDisplaySeconds(seconds);
  }, [seconds]);

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
        <Text style={styles.timerText}>{`${Math.floor(seconds / 60)
          .toString()
          .padStart(2, '0')}:${(seconds % 60)
          .toString()
          .padStart(2, '0')}`}</Text>
      </View>
      {recordStatus !== 'idle' && (
        <Svg
          width={62}
          height={62}
          viewBox="0 0 100 100"
          style={{
            position: 'absolute',
            bottom: 25,
            transform: [{ rotate: '270deg' }],
          }}
        >
          <Circle
            cx={50}
            cy={50}
            r={46}
            stroke={COLORS.TEXT_DISABLED_GREY}
            strokeWidth={6}
          />
          <Circle
            cx={50}
            cy={50}
            r={46}
            stroke={COLORS.THEME_PRIMARY}
            strokeWidth={6}
            strokeDasharray={`${(displaySeconds / 60) * Math.PI * 46 * 2} ${
              ((60 - displaySeconds) / 60) * Math.PI * 46 * 2
            }`}
          />
        </Svg>
      )}
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
