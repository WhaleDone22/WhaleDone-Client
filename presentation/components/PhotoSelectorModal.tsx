import React, { useCallback } from 'react';
import { Modal, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

type PhotoSelectorModalProp = {
  isModalVisible: boolean;
  closeModal: () => void;
  setPickedImagePath: (path: string) => void;
};

function PhotoSelectorModal(props: PhotoSelectorModalProp) {
  const { isModalVisible, closeModal, setPickedImagePath } = props;
  const takePhoto = useCallback(async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    console.log(result);
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  }, []);

  const selectPhoto = useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Text onPress={selectPhoto}>사진 보관함</Text>
        <Text onPress={takePhoto}>카메라</Text>
      </SafeAreaView>
    </Modal>
  );
}

export default PhotoSelectorModal;
