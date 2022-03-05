import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import COLORS from '../../styles/colors';

function BottomSheetHeader() {
  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.handle}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative',
    paddingTop: 16,
    paddingBottom: 4,
  },
  handle: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d0d0d0',
    margin: 'auto',
  },
});

export default BottomSheetHeader;
