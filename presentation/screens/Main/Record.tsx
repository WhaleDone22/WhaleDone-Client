import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import PhotoSelectorModal from '../../components/PhotoSelectorModal';
import COLORS from '../../styles/colors';
import { commonStyles } from '../../styles/common';

type RecordScreenProp = NativeStackScreenProps<NavigationStackParams, 'Record'>;

const { height, width } = Dimensions.get('window');

const IcChatActiveFalse = require('../../../assets/ic-chat-active-false.png');
const IcChatActiveTrue = require('../../../assets/ic-chat-active-true.png');
const IcGalleryActiveFalse = require('../../../assets/ic-gallery-active-false.png');
const IcGalleryActiveTrue = require('../../../assets/ic-gallery-active-true.png');

const styles = StyleSheet.create({
  image: {
    width: width * 0.79,
    height: height * 0.58,
  },
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
  uploadText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  uploadTextDisabled: {
    color: COLORS.TEXT_DISABLED_GREY,
  },
  uploadTextEnabled: {
    color: COLORS.BLUE_500,
  },
  bodyContainer: {
    borderRadius: 10,
    borderColor: COLORS.BLUE_200,
    borderWidth: 1,
    flex: 1,
    backgroundColor: COLORS.BLUE_100,
    marginTop: 34,
    paddingHorizontal: 24,
  },
  questionText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 22,
    paddingTop: 30,
    paddingBottom: 20,
  },
  answerTextInput: {
    height: 400,
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 16,
    fontFamily: 'Pretendard',
  },
  answerTextCount: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
    fontFamily: 'Pretendard',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    height: 60,
  },
  bottomButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    width: (width - 32) / 2,
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 5,
  },
  iconLabel: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
  },
  iconLabelInactive: {
    color: COLORS.TEXT_DISABLED_GREY,
  },
});

function RecordScreen({ navigation }: RecordScreenProp) {
  const [mode, setMode] = useState<'TEXT' | 'IMAGE' | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [text, setText] = useState('');
  const [isUploadable, setIsUploadable] = useState(false);

  useEffect(() => {
    setIsUploadable(text.length > 10 || pickedImagePath !== '');
  }, [text, pickedImagePath]);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <SafeAreaView style={commonStyles.container}>
      <PhotoSelectorModal
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        setPickedImagePath={(path: string) => setPickedImagePath(path)}
      />
      <View style={styles.headerContainer}>
        <ButtonBack onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>일상 공유 제목</Text>
        <TouchableOpacity
          onPress={() => navigation.push('Main', { screen: 'Feed' })}
          disabled={!isUploadable}
        >
          <Text
            style={[
              styles.uploadText,
              isUploadable
                ? styles.uploadTextEnabled
                : styles.uploadTextDisabled,
            ]}
          >
            업로드
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.questionText}>질문질문?</Text>
        {mode && mode === 'TEXT' ? (
          <View>
            <Text style={styles.answerTextCount}>({text.length}/180자)</Text>
            <TextInput
              value={text}
              placeholder="답변을 입력하세요"
              onChangeText={(input) => setText(input)}
              maxLength={180}
              multiline
              textAlignVertical="top"
              style={styles.answerTextInput}
              placeholderTextColor={COLORS.TEXT_DISABLED_GREY}
            />
          </View>
        ) : (
          pickedImagePath !== '' && (
            <Image source={{ uri: pickedImagePath }} style={styles.image} />
          )
        )}
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => {
            openModal();
            setMode('IMAGE');
          }}
          style={styles.bottomButton}
        >
          <Image
            source={
              mode === 'IMAGE' ? IcGalleryActiveTrue : IcGalleryActiveFalse
            }
            style={styles.icon}
          />
          <Text
            style={[
              styles.iconLabel,
              mode !== 'IMAGE' && styles.iconLabelInactive,
            ]}
          >
            사진/촬영
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMode('TEXT')}
          style={styles.bottomButton}
        >
          <Image
            source={mode === 'TEXT' ? IcChatActiveTrue : IcChatActiveFalse}
            style={styles.icon}
          />
          <Text
            style={[
              styles.iconLabel,
              mode !== 'TEXT' && styles.iconLabelInactive,
            ]}
          >
            텍스트
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default RecordScreen;
