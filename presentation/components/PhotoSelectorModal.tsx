import React, { useCallback } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import COLORS from '../styles/colors';
import {
  dataURItoBLOB,
  fileURItoBLOB,
} from '../../infrastructures/utils/images';
import { privateAPI } from '../../infrastructures/api/remote/base';

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
      const fileName = `${new Date()
        .toLocaleString()
        .replaceAll(' ', '')
        .replaceAll('.', '')
        .replaceAll(':', '')}.png`;
      const presignedURLResponse = await privateAPI.post({
        url: 'api/v1/content/presigned-url',
        data: { fileName },
      });
      if (typeof presignedURLResponse.singleData?.presignedUrl === 'string') {
        const imageBLOB = await fileURItoBLOB(imagePath);
        const imageFile = new File([imageBLOB], fileName);
        console.warn({ imageFile });
        console.warn(presignedURLResponse.singleData.presignedUrl);
        const s3UploadResponse = await fetch(
          new Request(presignedURLResponse.singleData.presignedUrl, {
            credentials: 'omit',
            method: 'PUT',
            body: imageFile,
            headers: new Headers({
              'Content-Type': 'image/*',
            }),
          }),
        );
        console.warn(s3UploadResponse);
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
      setPickedImagePath(result.uri);
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
      setPickedImagePath(result.uri);
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
