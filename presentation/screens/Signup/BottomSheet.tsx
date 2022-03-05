import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import COLORS from '../../styles/colors';

import useBottomSheet from '../../../infrastructures/hooks/useBottomSheet';
import { BOTTOM_SHEET_HEIGHT } from './config/constants';
import BottomSheetHeader from './BottomSheetHeader';

type BottomSheetScreenProp = NativeStackScreenProps<
  NavigationStackParams,
  'BottomSheet'
>;

function BottomSheet({ navigation }: BottomSheetScreenProp) {
  const { sheet } = useBottomSheet();

  return (
    <SafeAreaView>
      <ButtonBack onPress={() => navigation.goBack()} />
      <View style={styles.wrapper} ref={sheet}>
        <BottomSheetHeader />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute', //fixed?
    // z-index: 1,
    top: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
    // boxShadow: 0px 0px 10px rgba(0, 0, 0, 0.6)
    height: BOTTOM_SHEET_HEIGHT,
  },
});

export default BottomSheet;
