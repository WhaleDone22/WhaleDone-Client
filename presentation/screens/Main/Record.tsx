import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
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
import { NavigationActions, StackActions } from 'react-navigation';
import { NavigationStackParams } from '../../../infrastructures/types/NavigationStackParams';
import ButtonBack from '../../components/ButtonBack';
import PhotoSelectorModal from '../../components/PhotoSelectorModal';

type RecordScreenProp = NativeStackScreenProps<NavigationStackParams, 'Record'>;

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    width: width * 0.79,
    height: height * 0.58,
  },
});

function RecordScreen({ navigation }: RecordScreenProp) {
  const [mode, setMode] = useState<'TEXT' | 'IMAGE' | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [text, setText] = useState('');

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <SafeAreaView>
      <PhotoSelectorModal
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        setPickedImagePath={(path: string) => setPickedImagePath(path)}
      />
      <ButtonBack onPress={() => navigation.goBack()} />
      <Text>일상 공유 제목</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'Main',
                  action: NavigationActions.navigate({ routeName: 'Feed' }),
                }),
              ],
            }),
          )
        }
      >
        <Text>업로드</Text>
      </TouchableOpacity>
      <View>
        <Text>질문질문?</Text>
        {mode && mode === 'TEXT' ? (
          <View>
            <Text>({text.length}/180자)</Text>
            <TextInput
              value={text}
              placeholder="답변을 입력하세요"
              onChangeText={(input) => setText(input)}
              maxLength={180}
              multiline
              textAlignVertical="top"
            />
          </View>
        ) : (
          pickedImagePath !== '' && (
            <Image source={{ uri: pickedImagePath }} style={styles.image} />
          )
        )}
      </View>
      <View>
        <Text
          onPress={() => {
            openModal();
            setMode('IMAGE');
          }}
        >
          사진
        </Text>
        <Text onPress={() => setMode('TEXT')}>글</Text>
      </View>
    </SafeAreaView>
  );
}

export default RecordScreen;
