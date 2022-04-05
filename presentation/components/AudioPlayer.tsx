import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import COLORS from '../styles/colors';

type AudioPlayerProps = {
  src: string;
};

const IcAudioStop = require('../../assets/ic-audio-stop.png');
const IcAudioPlay = require('../../assets/ic-audio-play.png');

const styles = StyleSheet.create({
  icon: { height: 36, width: 36 },
  wrapper: { flexDirection: 'row', alignItems: 'center' },
  statusbar: {
    flex: 1,
    height: 6,
    marginStart: 8,
    marginEnd: 6,
    borderRadius: 5,
    backgroundColor: COLORS.TEXT_DISABLED_GREY,
  },
  timeStamp: {
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.THEME_PRIMARY,
  },
});

function AudioPlayer(props: AudioPlayerProps) {
  const { src } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();
  const [status, setStatus] = useState<AVPlaybackStatus>();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    Audio.Sound.createAsync({ uri: src })
      .then(({ sound: exSound, status: exStatus }) => {
        setSound(exSound);
        setStatus(exStatus);
      })
      .catch((e) => {
        console.error(src, e);
      });
    return () => {
      setSound(undefined);
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timer | undefined;
    if (sound && isPlaying) {
      timer = setInterval(() => setSeconds((prev) => prev + 1), 1000);
      sound.playAsync().catch((e) => console.error(e));
    }
    if (sound && !isPlaying) {
      if (timer !== undefined) clearInterval(timer);
      sound.pauseAsync().catch((e) => console.error(e));
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!status?.isLoaded || !status.durationMillis) return;
    if (seconds * 1000 > status.durationMillis) setIsPlaying(false);
  }, [seconds]);

  return (
    <View style={styles.wrapper}>
      {status && status?.isLoaded && status?.durationMillis && (
        <>
          <Pressable
            onPress={() => {
              if (
                status.durationMillis &&
                seconds * 1000 > status.durationMillis
              )
                setSeconds(0);
              setIsPlaying((prev) => !prev);
            }}
          >
            <Image
              source={isPlaying ? IcAudioStop : IcAudioPlay}
              style={styles.icon}
            />
          </Pressable>

          <View style={styles.statusbar}>
            {status.durationMillis && (
              <View
                style={{
                  height: 6,
                  backgroundColor: COLORS.THEME_PRIMARY,
                  width: `${(100 * 1000 * seconds) / status.durationMillis}%`,
                  maxWidth: '100%',
                }}
              />
            )}
          </View>
          <Text style={styles.timeStamp}>
            {status.durationMillis &&
              `${Math.floor(status.durationMillis / 60000)
                .toString()
                .padStart(2, '0')}:${Math.floor(status.durationMillis / 1000)
                .toString()
                .padStart(2, '0')}`}
          </Text>
        </>
      )}
    </View>
  );
}

export default AudioPlayer;
