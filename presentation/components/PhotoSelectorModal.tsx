import React, { useCallback } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
  const takePhoto = useCallback(async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) return;
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) setPickedImagePath(result.uri);
  }, []);

  const selectPhoto = useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) setPickedImagePath(result.uri);
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
          <TouchableOpacity
            onPress={takePhoto}
            style={[styles.actionButton, styles.bottomLiner]}
          >
            <Text style={styles.actionText}>카메라로 촬영</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={selectPhoto} style={styles.actionButton}>
            <Text style={styles.actionText}>앨범에서 선택</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={closeModal}
          style={[styles.actionContainer, styles.actionButton]}
        >
          <Text style={[styles.actionText, styles.cancelText]}>취소하기</Text>
        </TouchableOpacity>
      </Pressable>
    </Modal>
  );
}

export default PhotoSelectorModal;
