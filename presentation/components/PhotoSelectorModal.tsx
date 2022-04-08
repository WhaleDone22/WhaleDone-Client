import React, { useCallback } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../styles/colors';

type PhotoSelectorModalProp = {
  isModalVisible: boolean;
  closeModal: () => void;
  setPickedImagePath: (path: string) => void;
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#00000069',
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 11,
    paddingBottom: 20,
  },
  actionContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  actionButton: {
    paddingVertical: 18,
    width: '100%',
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Pretendard',
    textAlign: 'center',
  },
  bottomLiner: {
    borderBottomColor: COLORS.GREY_030,
    borderBottomWidth: 1,
  },
  cancelText: {
    color: COLORS.THEME_NEGATIVE,
  },
});

function PhotoSelectorModal(props: PhotoSelectorModalProp) {
  const { isModalVisible, closeModal, setPickedImagePath } = props;

  const uploadPhoto = async (imagePath: string) => {
    try {
      const formData = new FormData();
      const file = {
        uri:
          Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath,
        name: imagePath.split('/').pop(),
        type: `image/${imagePath.split('.').pop()}`,
      };
      formData.append('multipartFile', file);

      const myToken = await AsyncStorage.getItem('token');
      if (!myToken) return;

      const uploadRequest = await fetch(
        'http://ec2-3-37-42-113.ap-northeast-2.compute.amazonaws.com:8080/api/v1/content',
        {
          method: 'POST',
          body: formData,
          headers: {
            'X-AUTH-TOKEN': myToken,
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        },
      );

      const uploadResponse = await uploadRequest.json();

      if (typeof uploadResponse.singleData?.url === 'string') {
        setPickedImagePath(uploadResponse.singleData.url);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const takePhoto = useCallback(async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) return;
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      uploadPhoto(result.uri);
    }
    closeModal();
  }, []);

  const selectPhoto = useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      uploadPhoto(result.uri);
    }
    closeModal();
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.modalContainer} onPress={closeModal}>
        <View style={styles.actionContainer}>
          <Pressable
            onPress={takePhoto}
            style={[styles.actionButton, styles.bottomLiner]}
          >
            <Text style={styles.actionText}>카메라로 촬영</Text>
          </Pressable>
          <Pressable onPress={selectPhoto} style={styles.actionButton}>
            <Text style={styles.actionText}>앨범에서 선택</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={closeModal}
          style={[styles.actionContainer, styles.actionButton]}
        >
          <Text style={[styles.actionText, styles.cancelText]}>취소하기</Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default PhotoSelectorModal;
