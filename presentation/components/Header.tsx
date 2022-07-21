import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationStackParams } from '../../infrastructures/types/NavigationStackParams';
import { commonStyles } from '../styles/common';

interface HeaderProps {
  isTitleLogo: boolean;
  title: string;
  navigate: (screen: keyof NavigationStackParams) => void;
}

const Logo = require('../../assets/logo-whaledone.png');
const IcNotice = require('../../assets/ic-bell.png');
const IcMyPage = require('../../assets/ic-user-circle.png');

const styles = StyleSheet.create({
  headerIconWrapper: {
    flexDirection: 'row',
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerIconFirst: {
    marginRight: 20,
  },
  headerLogo: {
    width: 118,
    height: 27,
    marginBottom: 14,
    marginRight: 14,
  },
  headerWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function Header(props: HeaderProps) {
  const { title, isTitleLogo, navigate } = props;

  return (
    <View style={styles.headerWrapper}>
      {isTitleLogo ? (
        <Image source={Logo} style={styles.headerLogo} />
      ) : (
        <Text style={commonStyles.title}>{title}</Text>
      )}

      <View style={styles.headerIconWrapper}>
        <TouchableOpacity onPress={() => navigate('Notice')}>
          <Image
            source={IcNotice}
            style={[styles.headerIcon, styles.headerIconFirst]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('MyPage')}>
          <Image source={IcMyPage} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;
